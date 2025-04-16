import MainComponent from '../../shared/main-component/main-component';
import AuthorizationForm from './authorization-form/authorization-form';
import './authorization-page.css';

export default class AutorizationPage {
  createAuthorizationPage() {
    const form = new AuthorizationForm();
    const main = new MainComponent([form]);
    document.body.append(main.getNode());
  }
}
