import BaseComponent from '../../../../shared/base-component/base-component';
import ButtonComponent from '../../../../shared/button-component/button-component';
import { buttonToAbout } from '../../../../shared/button-to-about/button-to-about';
import './header-component.css';

export default class HeaderComponent extends BaseComponent {
  constructor({ userName }: { userName: string }) {
    super({ tag: 'header', styles: ['header'] });

    this.addHeaderChildren({ userName: userName });
  }

  addHeaderChildren({ userName }: { userName: string }) {
    const h1 = new BaseComponent({
      tag: 'h1',
      text: 'Fun Chat',
      styles: ['header_content'],
    });

    const userField = new BaseComponent({
      tag: 'p',
      text: `User: ${userName}`,
      styles: ['header_content'],
    });

    const logOutButton = new ButtonComponent({
      text: 'Log Out',
      styles: ['header_button'],
      onClickAction: () => {
        console.log(1);
      },
    });

    this.addChildren([
      userField,
      h1,
      buttonToAbout(['header_button']),
      logOutButton,
    ]);
  }
}
