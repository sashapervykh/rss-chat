import LoginPage from '../page/login-page/login-page';
import MainPage from '../page/main-page/main-page';
import clearBody from '../utitlities/clear-body';
import {
  ResponseTypes,
  ServerLogResponse,
  ServerMessageResponse,
  ServerResponses,
  ServerUsersResponse,
} from './types';

class DataHandler {
  mainPage = new MainPage();
  currentUser: string | undefined =
    sessionStorage.getItem('login') ?? undefined;

  currentPassword: string | undefined =
    sessionStorage.getItem('password') ?? undefined;

  processResponseToUser(data: ServerResponses) {
    switch (data.type) {
      case ResponseTypes.login: {
        this.doWhenUserLogIn(data);
        break;
      }
      case ResponseTypes.logout: {
        this.doWhenUserLogOut();
        break;
      }
      case ResponseTypes.activeUsers:
      case ResponseTypes.inactiveUsers: {
        this.drawUsersList(data);
        break;
      }
      case ResponseTypes.oneMessage: {
        this.drawSendedMessage(data);
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

  private doWhenUserLogIn(data: ServerLogResponse) {
    clearBody();
    history.replaceState('main', '', '/main');
    this.mainPage.createMainPage({ userName: data.payload.user.login });
  }

  private doWhenUserLogOut() {
    clearBody();
    history.replaceState('login', '', '/login');
    const loginPage = new LoginPage();
    loginPage.createLoginPage();
    sessionStorage.removeItem('login');
  }

  private drawUsersList(data: ServerUsersResponse) {
    if (this.mainPage.usersUl) {
      for (const user of data.payload.users) {
        if (user.login === this.currentUser) continue;
        this.mainPage.usersUl.addItemToList(user);
      }
    } else {
      console.error('Data about users are not received');
    }
  }

  private drawSendedMessage(data: ServerMessageResponse) {
    if (!this.mainPage.chatWindow) throw new Error('Chat window was not found');
    this.mainPage.chatWindow.addMessageToChat(data);
  }
}

export const dataHandler = new DataHandler();
