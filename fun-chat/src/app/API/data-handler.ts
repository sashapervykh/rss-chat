import LoginPage from '../page/login-page/login-page';
import MainPage from '../page/main-page/main-page';
import clearBody from '../utitlities/clear-body';
import { ResponseTypes, ServerResponses } from './types';

class DataHandler {
  mainPage = new MainPage();
  currentUser: string | undefined =
    sessionStorage.getItem('login') ?? undefined;

  currentPassword: string | undefined =
    sessionStorage.getItem('password') ?? undefined;

  processResponseToUser(data: ServerResponses) {
    switch (data.type) {
      case ResponseTypes.login: {
        clearBody();
        history.replaceState('main', '', '/main');
        this.mainPage.createMainPage({ userName: data.payload.user.login });
        break;
      }
      case ResponseTypes.logout: {
        clearBody();
        history.replaceState('login', '', '/login');
        const loginPage = new LoginPage();
        loginPage.createLoginPage();
        sessionStorage.removeItem('login');
        break;
      }
      case ResponseTypes.activeUsers:
      case ResponseTypes.inactiveUsers: {
        if (this.mainPage.usersUl) {
          for (const user of data.payload.users) {
            if (user.login === this.currentUser) continue;
            this.mainPage.usersUl.addItemToList(user);
          }
        } else {
          console.error('Data about users are not received');
        }
        break;
      }
      case ResponseTypes.oneMessage: {
        if (!this.mainPage.chatWindow)
          throw new Error('Chat window was not found');
        this.mainPage.chatWindow.addMessageToChat(data);
        break;
      }
      default: {
        console.log('Something strange');
      }
    }
  }

  processRequestFromServer(data: ServerResponses) {
    if (!this.mainPage.usersUl)
      throw new Error('Data about user list are not received');
    switch (data.type) {
      case ResponseTypes.thirdLogin: {
        this.mainPage.usersUl.updateUserListForThirdPartyLogIn(
          data.payload.user,
        );
        break;
      }
      case ResponseTypes.thirdLogout: {
        this.mainPage.usersUl.updateUserListForThirdPartyLogOut(
          data.payload.user,
        );
        break;
      }

      default: {
        console.log('Something strange');
      }
    }
  }
}

export const dataHandler = new DataHandler();
