import ButtonComponent from '../../../../../../shared/button-component/button-component';
import FormComponent from '../../../../../../shared/form-component/form-component';
import './message-form.css';
import { MessageTextarea } from './message-textarea/message-textarea';

export default class MessageForm extends FormComponent {
  constructor() {
    super({
      styles: ['message-form'],
      onSubmitAction: (event: Event) => {
        event.preventDefault();
      },
      children: [
        MessageTextarea(),
        new ButtonComponent({ text: 'Send', styles: ['button-to-send'] }),
      ],
    });
  }
}
