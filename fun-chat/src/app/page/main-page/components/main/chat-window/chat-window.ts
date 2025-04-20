import { Message, MessageHistoryResponse } from '../../../../../API/types';
import BaseComponent from '../../../../../shared/base-component/base-component';
import './chat-window.css';
import MessageForm from './components/message-form/message-form';
import MessageTextarea from './components/message-form/message-textarea/message-textarea';
import MessageComponent from './components/message/message';
import SeparateLine from './components/separate-line/separate-line';

export default class ChatWindow extends BaseComponent {
  h2: BaseComponent = new BaseComponent({ tag: 'h2', styles: ['chat_h2'] });
  messageList: BaseComponent = new BaseComponent({
    tag: 'div',
    styles: ['message-list'],
  });
  login: string | undefined;
  messageTextarea: MessageTextarea | undefined;
  separateLine: SeparateLine | undefined;

  constructor() {
    super({ tag: 'div', styles: ['chat-window'] });
    this.addChatWindowChildren();
    this.setListenersToRemoveSeparateLine();
  }

  addChatWindowChildren() {
    this.h2 = new BaseComponent({ tag: 'h2', styles: ['chat_h2'] });
    const messageForm = new MessageForm(this);
    this.addChildren([this.h2, this.messageList, messageForm]);
  }

  openDialogue(data: MessageHistoryResponse, style: 'online' | 'offline') {
    if (!this.messageTextarea)
      throw new Error('Information about message textarea is not received');
    this.separateLine = undefined;
    this.messageTextarea.getNode().disabled = false;
    this.h2.setTextContent(data.id);
    this.login = data.id;
    this.h2.addStyles([style]);
    this.h2.removeStyles([style === 'online' ? 'offline' : 'online']);
    for (const message of data.payload.messages) {
      this.addMessageToChat(message);
    }
  }

  addMessageToChat(messageData: Message) {
    const messageBlock = new MessageComponent(messageData);
    if (
      messageData.from === this.login &&
      !this.separateLine &&
      !messageData.status.isReaded
    ) {
      this.separateLine = new SeparateLine();
      this.messageList.addChildren([this.separateLine, messageBlock]);
      messageBlock.getNode().scrollIntoView(false);
    }
    this.messageList.addChildren([messageBlock]);

    if (!this.separateLine) {
      this.messageList.getNode().scrollTop = this.getNode().scrollHeight;
    }
  }

  processIncomingLetter(messageData: Message) {
    if (this.login === messageData.from) {
      this.addMessageToChat(messageData);
    }
  }

  setListenersToRemoveSeparateLine() {
    this.messageList.addListenerToEvent('click', () => {
      if (this.separateLine) {
        this.separateLine.removeThisNode();
      }
    });

    this.messageList.addListenerToEvent('scroll', () => {
      if (this.separateLine) {
        this.separateLine.removeThisNode();
      }
    });
  }
}
