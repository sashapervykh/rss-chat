import returnTypeCheckedData from '../utitlities/return-type-checked-data';
import { dataHandler } from './data-handler';
import { ResponseTypes, UserLoginData } from './types';

class API {
  websocket = new WebSocket('ws://localhost:4000');

  constructor() {
    this.websocket.addEventListener('error', (event) => {
      console.log(event);
    });

    this.websocket.addEventListener('message', (event) => {
      const response = returnTypeCheckedData(event.data);
      if (response.id) {
        dataHandler.processResponseToUser(response);
      } else {
        dataHandler.processRequestFromServer(response);
      }
    });
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
    dataHandler.currentUser = data.login;
    dataHandler.currentPassword = data.password;
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

  sendRequestForMessagesFromUser(login: string) {
    const request = {
      id: login,
      type: 'MSG_FROM_USER',
      payload: {
        user: {
          login: login,
        },
      },
    };

    this.websocket.send(JSON.stringify(request));
  }

  sendRequestForAllMessages(login: string) {
    const request = {
      id: login,
      type: ResponseTypes.messageHistory,
      payload: { users: { login: login } },
    };
    this.websocket.send(JSON.stringify(request));
  }
}

export const api = new API();
