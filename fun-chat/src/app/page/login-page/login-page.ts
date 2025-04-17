import MainComponent from '../../shared/main-component/main-component';
import LoginForm from './login-form/login-form';
import './login-page.css';

export default class LoginPage {
  createLoginPage() {
    const form = new LoginForm();
    const main = new MainComponent([form]);
    document.body.append(main.getNode());
  }
}
