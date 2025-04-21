import { api } from '../../../../../../../../API/api';
import ButtonComponent from '../../../../../../../../shared/button-component/button-component';
import MessageComponent from '../message';

export default class ButtonToEdit extends ButtonComponent {
  messageComponent: MessageComponent;
  constructor(messageComponent: MessageComponent) {
    super({
      text: 'Edit',
      styles: ['message-button'],
    });
    this.messageComponent = messageComponent;
    this.addListenerToEvent('click', () => {
      if (this.getNode().textContent === 'Edit') {
        this.getNode().textContent = 'Save';
        messageComponent.messageText.editingText();
      } else {
        api.sendEditRequest(
          messageComponent.messageData.from,
          messageComponent.messageData.id,
          messageComponent.messageText.returnEditedValue(),
        );
      }
    });
  }

  saveEditedResult(value: string) {
    this.setTextContent('Edit');
    this.messageComponent.messageText.stopEditing(value);
  }
}
