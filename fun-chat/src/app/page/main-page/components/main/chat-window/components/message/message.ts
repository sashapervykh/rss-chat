import { api } from '../../../../../../../API/api';
import { dataHandler } from '../../../../../../../API/data-handler';
import { Message } from '../../../../../../../API/types';
import BaseComponent from '../../../../../../../shared/base-component/base-component';
import ButtonComponent from '../../../../../../../shared/button-component/button-component';
import ButtonToEdit from './components/button-to-edit';
import MessageInfo from './components/message-info';
import MessageText from './components/message-text';
import './message.css';

export default class MessageComponent extends BaseComponent {
  messageId: string;
  from: string;
  messageInfo: MessageInfo;
  messageType: 'incoming' | 'outgoing';
  messageData: Message;
  messageText: MessageText;
  buttonToEdit: ButtonToEdit;

  constructor(messageData: Message) {
    super({ tag: 'div', styles: ['message'] });
    this.messageId = messageData.id;
    this.buttonToEdit = new ButtonToEdit(this);
    this.from = messageData.from;
    this.messageType =
      messageData.from === dataHandler.currentUser ? 'outgoing' : 'incoming';
    this.messageData = messageData;
    this.messageInfo = new MessageInfo({
      messageType: this.messageType,
      messageData: messageData,
    });
    this.messageText = new MessageText(messageData.text);
    this.showMessage(messageData);
  }

  showMessage(messageData: Message) {
    const senderName = new BaseComponent({
      tag: 'p',
      text: `${new Date(messageData.datetime).toLocaleDateString()}, ${new Date(messageData.datetime).toLocaleTimeString()}, ${messageData.from}`,
      styles: ['sender-name'],
    });

    const messageButtons = new BaseComponent({
      tag: 'div',
      styles: ['message-buttons'],
      children: [
        this.buttonToEdit,
        new ButtonComponent({
          text: 'Delete',
          styles: ['message-button'],
          onClickAction: () => {
            api.sendDeleteRequest(messageData.from, this.messageId);
          },
        }),
      ],
    });
    if (dataHandler.currentUser === messageData.from) {
      this.addChildren([
        senderName,
        this.messageText,
        this.messageInfo,
        messageButtons,
      ]);
      this.addStyles(['outgoing-message']);
    } else {
      this.addChildren([senderName, this.messageText, this.messageInfo]);
    }
  }
}
