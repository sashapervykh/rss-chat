import { dataHandler } from '../../../../../../../API/data-handler';
import { Message } from '../../../../../../../API/types';
import BaseComponent from '../../../../../../../shared/base-component/base-component';
import ButtonComponent from '../../../../../../../shared/button-component/button-component';
import MessageInfo from './components/message-info';
import './message.css';

export default class MessageComponent extends BaseComponent {
  messageId: string;
  from: string;
  messageInfo: MessageInfo;
  messageType: 'incoming' | 'outgoing';
  messageData: Message;

  constructor(messageData: Message) {
    super({ tag: 'div', styles: ['message'] });
    this.messageId = messageData.id;

    this.from = messageData.from;
    this.messageType =
      messageData.from === dataHandler.currentUser ? 'outgoing' : 'incoming';
    this.messageData = messageData;
    this.messageInfo = new MessageInfo({
      messageType: this.messageType,
      messageData: messageData,
    });
    this.showMessage(messageData);
  }

  showMessage(messageData: Message) {
    const senderName = new BaseComponent({
      tag: 'p',
      text: `${new Date(messageData.datetime).toLocaleDateString()}, ${new Date(messageData.datetime).toLocaleTimeString()}, ${messageData.from}`,
      styles: ['sender-name'],
    });
    const messageText = new BaseComponent({
      tag: 'p',
      text: messageData.text,
      styles: ['message-text'],
    });
    const messageButtons = new BaseComponent({
      tag: 'div',
      styles: ['message-buttons'],
      children: [
        new ButtonComponent({ text: 'Edit', styles: ['message-button'] }),
        new ButtonComponent({ text: 'Delete', styles: ['message-button'] }),
      ],
    });
    if (dataHandler.currentUser === messageData.from) {
      this.addChildren([
        senderName,
        messageText,
        this.messageInfo,
        messageButtons,
      ]);
      this.addStyles(['outgoing-message']);
    } else {
      this.addChildren([senderName, messageText, this.messageInfo]);
    }
  }
}
