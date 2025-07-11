import AboutPage from '../../page/about-page/about-page';
import ButtonComponent from '../button-component/button-component';

export const buttonToAbout = (styles: string[]) =>
  new ButtonComponent({
    text: 'About',
    styles: styles,
    onClickAction: () => {
      document.body.replaceChildren();
      globalThis.location.assign('#/about');
      const aboutPage = new AboutPage();
      aboutPage.createAboutPage();
    },
  });
