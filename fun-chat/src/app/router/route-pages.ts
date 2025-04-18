import AboutPage from '../page/about-page/about-page';
import LoginPage from '../page/login-page/login-page';
import MainPage from '../page/main-page/main-page';

export function routePages(state: string): void {
  switch (state) {
    case 'main': {
      loadMainPage();
      break;
    }

    case 'about': {
      loadAboutPage();
      break;
    }

    case 'login': {
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
  document.body.replaceChildren();
  const loginPage = new LoginPage();
  loginPage.createLoginPage();
}

function loadMainPage(): void {
  document.body.replaceChildren();
  const storedLogin = sessionStorage.getItem('login');
  if (storedLogin) {
    const mainPage = new MainPage();
    mainPage.createMainPage({ userName: storedLogin });
  } else {
    const loginPage = new LoginPage();
    loginPage.createLoginPage();
  }
}

// function loadErrorPage(): void {
//   console.log(2);
// }
