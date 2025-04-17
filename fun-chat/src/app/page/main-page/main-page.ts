import FooterComponent from './components/footer/footer-component';
import HeaderComponent from './components/header/header';
import ChatComponent from './components/main/chat-component';

export default class MainPage {
  createMainPage({ userName }: { userName: string }) {
    const header = new HeaderComponent({ userName: userName });
    const footer = new FooterComponent();
    const chatComponent = new ChatComponent();

    document.body.append(
      header.getNode(),
      chatComponent.getNode(),
      footer.getNode(),
    );
  }
}
