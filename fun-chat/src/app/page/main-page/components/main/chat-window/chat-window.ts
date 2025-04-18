import BaseComponent from '../../../../../shared/base-component/base-component';
import './chat-window.css';
import MessageForm from './components/message-form';

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
    const messageForm = new MessageForm();
    this.addChildren([this.h2, this.messageList, messageForm]);
  }
}
