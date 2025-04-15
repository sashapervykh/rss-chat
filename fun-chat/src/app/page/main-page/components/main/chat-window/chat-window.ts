import BaseComponent from '../../../../../shared/base-component/base-component';
import ButtonComponent from '../../../../../shared/button-component/button-component';
import FormComponent from '../../../../../shared/form-component/form-component';
import InputComponent from '../../../../../shared/input-component/input-component';
import './chat-window.css';

export default class ChatWindow extends BaseComponent {
  constructor() {
    super({ tag: 'div', styles: ['chat-window'] });
    this.addChatWindowChildren();
  }

  addChatWindowChildren() {
    const h2 = new BaseComponent({ tag: 'h2', text: 'UserName' });
    const messageList = new BaseComponent({ tag: 'div' });
    const messageForm = new FormComponent({
      styles: ['form'],
      onSubmitAction: () => {
        console.log(3);
      },
      children: [
        new InputComponent({
          placeholder: 'Enter your message',
          styles: ['input'],
        }),
        new ButtonComponent({ text: 'Send', styles: ['button'] }),
      ],
    });
    this.addChildren([h2, messageList, messageForm]);
  }
}
