import { api } from '../API/api';
import { dataHandler } from '../API/data-handler';
import { ResponseTypes } from '../API/types';
import AboutPage from '../page/about-page/about-page';
import LoginPage from '../page/login-page/login-page';
import clearBody from '../utitlities/clear-body';

export function routePages(): void {
  const hash = globalThis.location.hash;

  switch (hash) {
    case '#/main': {
      loadMainPage();
      break;
    }

    case '#/about': {
      loadAboutPage();
      break;
    }

    case '#/login': {
      loadLoginPage();
      break;
    }
    default: {
      loadLoginPage();
    }
  }
}

function loadAboutPage(): void {
  document.body.replaceChildren();
  const aboutPage = new AboutPage();
  aboutPage.createAboutPage();
}

function loadLoginPage(): void {
  const storedLogin = sessionStorage.getItem('login');
  if (storedLogin) {
    globalThis.location.assign('#/main');
  } else {
    globalThis.location.assign('#/login');
    createLoginPageContent();
  }
}

function createLoginPageContent() {
  document.body.replaceChildren();
  const loginPage = new LoginPage();
  loginPage.createLoginPage();
}

function loadMainPage(): void {
  clearBody();
  const storedLogin = sessionStorage.getItem('login');
  const storedPassword = sessionStorage.getItem('password');
  if (storedLogin) {
    if (!storedPassword) throw new Error('Password was not saved');

    if (api.websocket.readyState === 1) {
      console.log('kkkk');
      dataHandler.mainPage.createMainPage({ userName: storedLogin });
    } else if (api.websocket.readyState === 0) {
      api.websocket.addEventListener('open', () => {
        dataHandler.mainPage.createMainPage({ userName: storedLogin });
        api.sendLogRequestToServer({
          id: 'Log In',
          type: ResponseTypes.login,
          login: storedLogin,
          password: storedPassword,
        });
      });
    }
  } else {
    globalThis.location.assign('#/login');
    createLoginPageContent();
  }
}

// function loadErrorPage(): void {
//   console.log(2);
// }
