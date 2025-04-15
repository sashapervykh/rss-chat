import MainComponent from '../../../../shared/main-component/main-component';
import UserListArea from './user-list-area/user-list-area';
import './chat-component.css';
import ChatWindow from './chat-window/chat-window';

export default class ChatComponent extends MainComponent {
  constructor() {
    super();
    this.addStyles(['chat-main']);

    this.addChatComponent();
  }

  addChatComponent() {
    const userListArea = new UserListArea();
    const chatWindow = new ChatWindow();
    this.addChildren([userListArea, chatWindow]);
  }
}
