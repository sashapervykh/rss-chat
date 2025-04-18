import { ServerMessageResponse } from '../../../../../../../API/types';
import BaseComponent from '../../../../../../../shared/base-component/base-component';
import ButtonComponent from '../../../../../../../shared/button-component/button-component';
import './message.css';

export default class MessageComponent extends BaseComponent {
  constructor(messageData: ServerMessageResponse) {
    super({ tag: 'div', styles: ['message'] });
    this.showMessage(messageData);
  }

  showMessage(messageData: ServerMessageResponse) {
    const senderName = new BaseComponent({
      tag: 'p',
      text: `${new Date(messageData.payload.message.datetime).toLocaleDateString()}, ${messageData.payload.message.from}`,
      styles: ['sender-name'],
    });
    const messageText = new BaseComponent({
      tag: 'p',
      text: messageData.payload.message.text,
      styles: ['message-text'],
    });
    const messageInfo = new BaseComponent({
      tag: 'p',
      text: `${messageData.payload.message.status.isEdited ? 'Edited' : 'Original'}//${messageData.payload.message.status.isDelivered ? 'Delivered' : 'Not delivered'}//${messageData.payload.message.status.isReaded ? 'Read' : 'Not read'}`,
      styles: ['message-info'],
    });
    const messageButtons = new BaseComponent({
      tag: 'div',
      styles: ['message-buttons'],
      children: [
        new ButtonComponent({ text: 'Edit', styles: ['message-button'] }),
        new ButtonComponent({ text: 'Delete', styles: ['message-button'] }),
      ],
    });
    if (messageData.id === null) {
      this.addChildren([senderName, messageText, messageInfo]);
    } else {
      this.addChildren([senderName, messageText, messageInfo, messageButtons]);
    }
  }
}
