import MainPage from '../page/main-page/main-page';
import clearBody from '../utitlities/clear-body';
import returnTypeCheckedData from '../utitlities/return-type-checked-data';
import {
  ResponseTypes,
  ServerErrorResponse,
  ServerLogResponse,
  UserLoginData,
} from './types';
// import clearBody from '../utitlities/clear-body';

export default class API {
  websocket = new WebSocket('ws://localhost:4000');
  mainPage = new MainPage();

  constructor() {
    this.websocket.addEventListener('error', (event) => {
      console.log(event);
    });

    this.websocket.addEventListener('message', (event) => {
      const response = returnTypeCheckedData(event.data);
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
      default: {
        console.log('Something strange');
      }
    }
  }

  sendLoginRequestToServer(data: UserLoginData) {
    const request = {
      id: 'Log In',
      type: 'USER_LOGIN',
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
