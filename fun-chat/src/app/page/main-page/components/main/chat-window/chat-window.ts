import { Message, MessageHistoryResponse } from '../../../../../API/types';
import BaseComponent from '../../../../../shared/base-component/base-component';
import './chat-window.css';
import MessageForm from './components/message-form';
import MessageTextarea from './components/message-textarea/message-textarea';
import MessageComponent from './components/message/message';

export default class ChatWindow extends BaseComponent {
  h2: BaseComponent | undefined;
  messageList: BaseComponent | undefined;
  login: string | undefined;
  messageTextarea: MessageTextarea | undefined;

  constructor() {
    super({ tag: 'div', styles: ['chat-window'] });
    this.addChatWindowChildren();
  }

  addChatWindowChildren() {
    this.h2 = new BaseComponent({ tag: 'h2', styles: ['chat_h2'] });
    this.messageList = new BaseComponent({
      tag: 'div',
      styles: ['message-list'],
    });
    const messageForm = new MessageForm(this);
    this.addChildren([this.h2, this.messageList, messageForm]);
  }

  openDialogue(data: MessageHistoryResponse, style: 'online' | 'offline') {
    if (!this.h2)
      throw new Error('Information about chat header is not received');
    if (!this.messageTextarea)
      throw new Error('Information about message textarea is not received');
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
    if (!this.messageList) throw new Error('Message list was not found');
    const messageBlock = new MessageComponent(messageData);
    this.messageList.addChildren([messageBlock]);
    this.messageList.getNode().scrollTop = this.getNode().scrollHeight;
  }

  processIncomingLetter(messageData: Message) {
    if (this.login === messageData.from) {
      this.addMessageToChat(messageData);
    }
  }
}
