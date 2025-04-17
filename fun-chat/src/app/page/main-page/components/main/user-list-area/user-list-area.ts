import { api } from '../../../../../API/api';
import BaseComponent from '../../../../../shared/base-component/base-component';
import ButtonComponent from '../../../../../shared/button-component/button-component';
import FormComponent from '../../../../../shared/form-component/form-component';
import InputComponent from '../../../../../shared/input-component/input-component';
import MainPage from '../../../main-page';
import UlComponent from './component/ul-component/ul-component';
import './user-list-area.css';

export default class UserListArea extends BaseComponent {
  mainPage: MainPage;

  constructor(mainPage: MainPage) {
    super({
      tag: 'div',
      styles: ['user-list-area'],
    });

    this.mainPage = mainPage;
    this.addAreaChildren();
  }

  addAreaChildren() {
    api.sendUsersRequestToServer();
    const searchForm = new FormComponent({
      styles: ['form'],
      onSubmitAction: () => {
        console.log(1);
      },
      children: [
        new InputComponent({ placeholder: 'Search', styles: ['input'] }),
        new ButtonComponent({ text: `\u{1F50D}`, styles: ['button'] }),
      ],
    });

    this.mainPage.userList = new UlComponent();

    this.addChildren([searchForm, this.mainPage.userList]);
  }
}
