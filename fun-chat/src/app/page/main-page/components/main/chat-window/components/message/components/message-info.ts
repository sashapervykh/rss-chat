import { Message } from '../../../../../../../../API/types';
import BaseComponent from '../../../../../../../../shared/base-component/base-component';
import { returnMessageInfo } from '../../../../../../../../utitlities/return-message-info';

export default class MessageInfo extends BaseComponent {
  isReaded: boolean;
  isEdited: boolean;
  isDelivered: boolean;
  messageType: 'incoming' | 'outgoing';

  constructor(parameters: {
    messageType: 'incoming' | 'outgoing';
    messageData: Message;
  }) {
    super({ tag: 'div', styles: ['message-info'] });
    this.messageType = parameters.messageType;
    this.isDelivered = parameters.messageData.status.isDelivered;
    this.isEdited = parameters.messageData.status.isEdited;
    this.isReaded = parameters.messageData.status.isReaded;
    const text = returnMessageInfo({
      messageType: this.messageType,
      isDelivered: this.isDelivered,
      isEdited: this.isEdited,
      isReaded: this.isReaded,
    });
    this.setTextContent(text);
  }

  changeTextOfStatus(
    status: 'isReaded' | 'isDelivered' | 'isEdited',
    statusValue: boolean,
  ) {
    this[status] = statusValue;
    const text = returnMessageInfo({
      messageType: this.messageType,
      isDelivered: this.isDelivered,
      isEdited: this.isEdited,
      isReaded: this.isReaded,
    });
    this.setTextContent(text);
  }
}
