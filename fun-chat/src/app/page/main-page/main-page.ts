import FooterComponent from './components/footer/footer-component';
import HeaderComponent from './components/header/header';
import ChatComponent from './components/main/chat-component';
import UlComponent from './components/main/user-list-area/component/ul-component/ul-component';

export default class MainPage {
  userList: UlComponent | undefined;

  createMainPage({ userName }: { userName: string }) {
    const header = new HeaderComponent({ userName: userName });
    const footer = new FooterComponent();
    const chatComponent = new ChatComponent(this);

    document.body.append(
      header.getNode(),
      chatComponent.getNode(),
      footer.getNode(),
    );
  }
}
