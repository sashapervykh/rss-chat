import { api } from '../../../../../API/api';
import { Message, MessageHistoryResponse } from '../../../../../API/types';
import BaseComponent from '../../../../../shared/base-component/base-component';
import './chat-window.css';
import MessageForm from './components/message-form/message-form';
import MessageTextarea from './components/message-form/message-input/message-input';
import MessageComponent from './components/message/message';
import SeparateLine from './components/separate-line/separate-line';

export default class ChatWindow extends BaseComponent {
  h2: BaseComponent = new BaseComponent({ tag: 'h2', styles: ['chat_h2'] });
  messageList: BaseComponent = new BaseComponent({
    tag: 'div',
    styles: ['message-list'],
    text: 'Choose a chat to start conversation',
  });
  addressee: string | undefined;
  messageTextarea: MessageTextarea | undefined;
  separateLine: SeparateLine | undefined;
  allMessages: MessageComponent[] = [];
  unreadMessages: MessageComponent[] = [];

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
    this.h2.setTextContent(`${data.id} (${style})`);
    this.addressee = data.id;
    this.h2.addStyles([style]);
    this.h2.removeStyles([style === 'online' ? 'offline' : 'online']);
    if (data.payload.messages.length === 0)
      this.messageList.setTextContent('Send your first letter');
    for (const message of data.payload.messages) {
      this.addMessageToChat(message);
    }
  }

  addMessageToChat(messageData: Message) {
    if (this.messageList.getNode().textContent === 'Send your first letter') {
      this.messageList.setTextContent('');
    }

    const messageBlock = new MessageComponent(messageData);
    if (
      messageData.from === this.addressee &&
      !this.separateLine &&
      !messageData.status.isReaded
    ) {
      this.separateLine = new SeparateLine();
      this.messageList.addChildren([this.separateLine, messageBlock]);
      messageBlock.getNode().scrollIntoView(false);
    }

    if (messageData.from === this.addressee && !messageData.status.isReaded) {
      this.unreadMessages.push(messageBlock);
    }

    this.messageList.addChildren([messageBlock]);
    this.allMessages.push(messageBlock);

    if (!this.separateLine) {
      messageBlock.getNode().scrollIntoView();
    }
  }

  processIncomingLetter(messageData: Message) {
    if (this.addressee === messageData.from) {
      this.addMessageToChat(messageData);
    }
    api.sendRequestForMessageHistory(messageData.from);
  }

  hideSeparateLine() {
    if (this.separateLine) {
      this.separateLine.removeThisNode();
      for (const unreadMessage of this.unreadMessages) {
        api.sendRequestForReadStatusChange(
          unreadMessage.from,
          unreadMessage.messageId,
        );
      }
      this.separateLine = undefined;
    }
  }

  setListenersToRemoveSeparateLine() {
    this.messageList.addListenerToEvent('click', () => {
      this.hideSeparateLine();
    });

    this.messageList.addListenerToEvent('scroll', () => {
      this.hideSeparateLine();
    });
  }

  updateForThirdPartyLogIn(thirdUser: string) {
    if (this.addressee === thirdUser) {
      this.h2.addStyles(['online']);
      this.h2.getNode().classList.remove('offline');
      this.h2.setTextContent(`${this.addressee} (online)`);
    }
  }

  updateForThirdPartyLogOut(thirdUser: string) {
    if (this.addressee === thirdUser) {
      this.h2.addStyles(['offline']);
      this.h2.getNode().classList.remove('online');
      this.h2.setTextContent(`${this.addressee} (offline)`);
    }
  }
}
