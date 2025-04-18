import LoginPage from '../page/login-page/login-page';
import MainPage from '../page/main-page/main-page';
import clearBody from '../utitlities/clear-body';
import returnTypeCheckedData from '../utitlities/return-type-checked-data';
import { ResponseTypes, ServerResponses, UserLoginData } from './types';

export default class API {
  websocket = new WebSocket('ws://localhost:4000');
  mainPage = new MainPage();
  currentUser: string | undefined;

  currentPassword: string | undefined;

  constructor() {
    this.websocket.addEventListener('error', (event) => {
      console.log(event);
    });

    this.websocket.addEventListener('message', (event) => {
      const response = returnTypeCheckedData(event.data);
      console.log(response);
      this.processServerData(response);
    });
  }

  processServerData(data: ServerResponses) {
    switch (data.type) {
      case ResponseTypes.login: {
        clearBody();
        history.pushState('main', '', '/main');
        this.mainPage.createMainPage({ userName: data.payload.user.login });
        sessionStorage.setItem('login', data.payload.user.login);
        break;
      }
      case ResponseTypes.logout: {
        clearBody();
        history.replaceState('login', '', '/login');
        const loginPage = new LoginPage();
        loginPage.createLoginPage();
        sessionStorage.removeItem('login', data.payload.user.login);
        break;
      }
      case ResponseTypes.activeUsers:
      case ResponseTypes.inactiveUsers: {
        if (this.mainPage.userList) {
          for (const user of data.payload.users) {
            if (user.login === this.currentUser) continue;
            this.mainPage.userList.addItemToList(user);
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

  sendUsersRequestToServer() {
    const requestForActive = JSON.stringify({
      id: 'All users',
      type: 'USER_ACTIVE',
      payload: null,
    });

    this.websocket.send(requestForActive);
    const requestForInactive = JSON.stringify({
      id: 'All users',
      type: 'USER_INACTIVE',
      payload: null,
    });
    this.websocket.send(requestForInactive);
  }

  sendLogRequestToServer(data: UserLoginData) {
    if (!data.login && !data.password)
      throw new Error('Data about current user is not received');
    this.currentUser = data.login;
    this.currentPassword = data.password;
    const request = {
      id: data.id,
      type: data.type,
      payload: {
        user: {
          login: data.login,
          password: data.password,
        },
      },
    };
    this.websocket.send(JSON.stringify(request));
  }

  sendOutgoingMessageRequest({
    login,
    message,
  }: {
    login: string;
    message: string;
  }) {
    const request = {
      id: login,
      type: 'MSG_SEND',
      payload: {
        message: {
          to: login,
          text: message,
        },
      },
    };
    this.websocket.send(JSON.stringify(request));
  }

  sendRequestForAllMessages(login: string) {
    const request = {
      id: login,
      type: ResponseTypes.allUsersMessages,
      payload: { users: { login: login } },
    };
    this.websocket.send(JSON.stringify(request));
  }
}

export const api = new API();
