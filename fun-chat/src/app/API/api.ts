import LoginPage from '../page/login-page/login-page';
import MainPage from '../page/main-page/main-page';
import clearBody from '../utitlities/clear-body';
import returnTypeCheckedData from '../utitlities/return-type-checked-data';
import {
  ResponseTypes,
  ServerErrorResponse,
  ServerLogResponse,
  UserLoginData,
} from './types';

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

  processServerData(data: ServerLogResponse | ServerErrorResponse) {
    switch (data.type) {
      case ResponseTypes.login: {
        clearBody();
        history.pushState('main', '', '/main');
        console.log(data.payload.user.login);
        this.mainPage.createMainPage({ userName: data.payload.user.login });
        break;
      }
      case ResponseTypes.logout: {
        clearBody();
        history.replaceState('login', '', '/login');
        const loginPage = new LoginPage();
        loginPage.createLoginPage();
        break;
      }
      default: {
        console.log('Something strange');
      }
    }
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
}

export const api = new API();
