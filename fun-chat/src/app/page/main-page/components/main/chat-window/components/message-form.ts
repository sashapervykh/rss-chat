import { api } from '../../../../../../API/api';
import ButtonComponent from '../../../../../../shared/button-component/button-component';
import FormComponent from '../../../../../../shared/form-component/form-component';
import './message-form.css';
import MessageTextarea from './message-textarea/message-textarea';

export default class MessageForm extends FormComponent {
  constructor() {
    super({
      styles: ['message-form'],
    });

    this.addMessageFormContent();
  }

  addMessageFormContent() {
    const messageTextarea = new MessageTextarea();
    const buttonToSend = new ButtonComponent({
      text: 'Send',
      styles: ['button-to-send'],
      disabled: true,
    });

    this.addChildren([messageTextarea, buttonToSend]);

    messageTextarea.addListenerToEvent('input', () => {
      if (messageTextarea.getNode().value === '') {
        buttonToSend.getNode().disabled = true;
      } else {
        buttonToSend.getNode().disabled = false;
      }
    });

    this.addListenerToSubmit((event: Event) => {
      event.preventDefault();
      api.sendOutgoingMessageRequest({
        login: 'bbbB',
        message: messageTextarea.getNode().value,
      });
    });
  }
}
