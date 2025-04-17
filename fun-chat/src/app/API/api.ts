import MainPage from '../page/main-page/main-page';
// import clearBody from '../utitlities/clear-body';

export default class API {
  websocket = new WebSocket('ws://localhost:4000');
  mainPage = new MainPage();

  constructor() {
    this.websocket.addEventListener('error', (event) => {
      console.log(event);
    });

    this.websocket.addEventListener('message', (event) => {
      console.log(event.data);
    });
  }

  // processServerData(data) {
  //   switch (data.id) {
  //     case 'Log In': {
  //       clearBody();
  //       history.pushState('main', '', '/main');
  //       console.log(data.payload.user.login);
  //       this.mainPage.createMainPage({ userName: data.payload.user.login });
  //       break;
  //     }
  //     default: {
  //       console.log('Something strange');
  //     }
  //   }
  // }

  // sendRequestToServer(request) {
  //   this.websocket.send(JSON.stringify(request));
  // }
}

export const api = new API();
