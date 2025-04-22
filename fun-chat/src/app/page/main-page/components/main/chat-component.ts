import MainComponent from '../../../../shared/main-component/main-component';
import UserListArea from './user-list-area/user-list-area';
import './chat-component.css';
import ChatWindow from './chat-window/chat-window';
import MainPage from '../../main-page';

export default class ChatComponent extends MainComponent {
  mainPage: MainPage;

  constructor(mainPage: MainPage) {
    super();
    this.addStyles(['chat-main']);
    this.mainPage = mainPage;
    this.addChatComponent();
  }

  addChatComponent() {
    this.mainPage.chatWindow = new ChatWindow();
    const userListArea = new UserListArea(this.mainPage);
    this.addChildren([userListArea, this.mainPage.chatWindow]);
  }
}
