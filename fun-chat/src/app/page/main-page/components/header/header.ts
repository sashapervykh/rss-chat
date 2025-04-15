import BaseComponent from '../../../../shared/base-component/base-component';
import ButtonComponent from '../../../../shared/button-component/button-component';
import './header-component.css';

export default class HeaderComponent extends BaseComponent {
  constructor() {
    super({ tag: 'header', styles: ['header'] });
    this.addHeaderChildren();
  }

  addHeaderChildren() {
    const h1 = new BaseComponent({
      tag: 'h1',
      text: 'Fun Chat',
      styles: ['header_content'],
    });

    const userField = new BaseComponent({
      tag: 'p',
      text: 'User: Sasha Pervykh',
      styles: ['header_content'],
    });

    const infoButton = new ButtonComponent({
      text: 'About',
      styles: ['header_button'],
    });

    const logOutButton = new ButtonComponent({
      text: 'Log Out',
      styles: ['header_button'],
    });

    this.addChildren([userField, h1, infoButton, logOutButton]);
  }
}
