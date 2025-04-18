import BaseComponent from '../../../../../shared/base-component/base-component';
import ButtonComponent from '../../../../../shared/button-component/button-component';
import FormComponent from '../../../../../shared/form-component/form-component';
import InputComponent from '../../../../../shared/input-component/input-component';
import './chat-window.css';

export default class ChatWindow extends BaseComponent {
  h2: BaseComponent | undefined;
  messageList: BaseComponent | undefined;

  constructor() {
    super({ tag: 'div', styles: ['chat-window'] });
    this.addChatWindowChildren();
  }

  addChatWindowChildren() {
    this.h2 = new BaseComponent({ tag: 'h2', styles: ['chat_h2'] });
    this.messageList = new BaseComponent({ tag: 'div' });
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
    this.addChildren([this.h2, this.messageList, messageForm]);
  }
}
