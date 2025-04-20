import { dataHandler } from '../../../../../../../API/data-handler';
import { Message } from '../../../../../../../API/types';
import BaseComponent from '../../../../../../../shared/base-component/base-component';
import ButtonComponent from '../../../../../../../shared/button-component/button-component';
import './message.css';

export default class MessageComponent extends BaseComponent {
  constructor(messageData: Message) {
    super({ tag: 'div', styles: ['message'] });
    this.showMessage(messageData);
  }

  showMessage(messageData: Message) {
    const senderName = new BaseComponent({
      tag: 'p',
      text: `${new Date(messageData.datetime).toLocaleDateString()}, ${messageData.from}`,
      styles: ['sender-name'],
    });
    const messageText = new BaseComponent({
      tag: 'p',
      text: messageData.text,
      styles: ['message-text'],
    });

    const messageInfoText = messageData.id
      ? `${messageData.status.isEdited ? 'Edited' : 'Not edited'}//${messageData.status.isDelivered ? 'Delivered' : 'Not delivered'}//${messageData.status.isReaded ? 'Read' : 'Not read'}`
      : messageData.status.isEdited
        ? 'Edited'
        : 'Not edited';
    const messageInfo = new BaseComponent({
      tag: 'p',
      text: messageInfoText,
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
    if (dataHandler.currentUser === messageData.from) {
      this.addChildren([senderName, messageText, messageInfo, messageButtons]);
      this.addStyles(['outgoing-message']);
    } else {
      this.addChildren([senderName, messageText, messageInfo]);
    }
  }
}
