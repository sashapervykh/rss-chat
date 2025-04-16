import BaseComponent from '../../shared/base-component/base-component';
import ButtonComponent from '../../shared/button-component/button-component';
import MainComponent from '../../shared/main-component/main-component';
import './about-page.css';

export default class AboutPage {
  createAboutPage() {
    const h1 = new BaseComponent({
      tag: 'h1',
      text: 'Fun Chat',
      styles: ['about__h1'],
    });
    const description = new BaseComponent({
      tag: 'p',
      text: 'The app was created within Javascript/Front-end 2024Q4 in order to learn how to work with WebSocket API',
      styles: ['about__content'],
    });
    const linkToGitHub = new BaseComponent({
      tag: 'a',
      text: 'Sasha Pervykh',
    });
    linkToGitHub
      .getNode()
      .setAttribute('href', 'https://github.com/sashapervykh');
    const authorInfo = new BaseComponent({
      tag: 'p',
      text: 'Created by ',
      children: [linkToGitHub],
      styles: ['about__content'],
    });
    const backButton = new ButtonComponent({
      text: 'Go Back',
      styles: ['about__button'],
      onClickAction: () => {
        history.back();
      },
    });
    const infoWrapper = new BaseComponent({
      tag: 'div',
      styles: ['about-wrapper'],
      children: [h1, description, authorInfo, backButton],
    });

    const main = new MainComponent([infoWrapper]);
    document.body.append(main.getNode());
  }
}
