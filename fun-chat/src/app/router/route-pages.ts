import AboutPage from '../page/about-page/about-page';
import AutorizationPage from '../page/authorization-page/authorization-page';
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

    case 'authorization': {
      loadAuthorizationPage();
      break;
    }
    default: {
      loadAuthorizationPage();
    }
  }
}

function loadAboutPage(): void {
  document.body.replaceChildren();
  const aboutPage = new AboutPage();
  aboutPage.createAboutPage();
}

function loadAuthorizationPage(): void {
  document.body.replaceChildren();
  const aboutPage = new AutorizationPage();
  aboutPage.createAuthorizationPage();
}

function loadMainPage(): void {
  document.body.replaceChildren();
  const mainPage = new MainPage();
  mainPage.createMainPage();
}

// function loadErrorPage(): void {
//   console.log(2);
// }
