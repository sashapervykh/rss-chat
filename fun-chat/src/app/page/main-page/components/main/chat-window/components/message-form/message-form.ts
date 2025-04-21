import { api } from '../../../../../../../API/api';
import ButtonComponent from '../../../../../../../shared/button-component/button-component';
import FormComponent from '../../../../../../../shared/form-component/form-component';
import ChatWindow from '../../chat-window';
import './message-form.css';
import MessageInput from './message-input/message-input';

export default class MessageForm extends FormComponent {
  constructor(chatWindow: ChatWindow) {
    super({
      styles: ['message-form'],
    });

    this.addMessageFormContent(chatWindow);
  }

  addMessageFormContent(chatWindow: ChatWindow) {
    chatWindow.messageTextarea = new MessageInput();
    const buttonToSend = new ButtonComponent({
      text: 'Send',
      styles: ['button-to-send'],
      disabled: true,
    });

    this.addChildren([chatWindow.messageTextarea, buttonToSend]);

    chatWindow.messageTextarea.addListenerToEvent('input', () => {
      if (!chatWindow.messageTextarea)
        throw new Error('Textarea was not created');
      if (chatWindow.messageTextarea.getNode().value === '') {
        buttonToSend.getNode().disabled = true;
      } else {
        buttonToSend.getNode().disabled = false;
      }
    });

    this.addListenerToSubmit((event: Event) => {
      event.preventDefault();
      if (!chatWindow.messageTextarea)
        throw new Error('Textarea was not created');
      if (!chatWindow.addressee) throw new Error('Login was not created');

      api.sendOutgoingMessageRequest({
        login: chatWindow.addressee,
        message: chatWindow.messageTextarea.getNode().value,
      });

      chatWindow.messageTextarea.getNode().value = '';
      buttonToSend.getNode().disabled = true;
      if (chatWindow.separateLine) {
        chatWindow.separateLine.removeThisNode();
      }
    });
  }
}
