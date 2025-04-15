import FooterComponent from './components/footer/footer-component';
import HeaderComponent from './components/header/header';

export default class MainPage {
  createMainPage() {
    const header = new HeaderComponent();
    const footer = new FooterComponent();

    document.body.append(header.getNode(), footer.getNode());
  }
}
