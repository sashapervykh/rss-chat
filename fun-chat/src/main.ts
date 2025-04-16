import AutorizationPage from './app/page/authorization-page/page';
import startRouting from './app/router/router';

const authorizationPage = new AutorizationPage();
authorizationPage.createAuthorizationPage();
startRouting();
