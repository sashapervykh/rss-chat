import LoginPage from './app/page/login-page/login-page';
import startRouting from './app/router/router';

const authorizationPage = new LoginPage();
authorizationPage.createLoginPage();

history.replaceState('login', '', '/login');
startRouting();
