import HeaderComponent from './components/header';

export default class MainPage {
  createMainPage() {
    const header = new HeaderComponent();

    document.body.append(header.getNode());
  }
}
