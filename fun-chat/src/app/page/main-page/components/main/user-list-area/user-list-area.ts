import { api } from '../../../../../API/api';
import BaseComponent from '../../../../../shared/base-component/base-component';
import MainPage from '../../../main-page';
import SearchInput from './component/search-input/search-input';
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
    console.log(2);
    api.sendUsersRequestToServer();
    if (!this.mainPage.chatWindow)
      throw new Error('Information about chat window is not received');

    this.mainPage.usersUl = new UlComponent(this.mainPage.chatWindow);

    const searchForm = new SearchInput(this.mainPage.usersUl);

    this.addChildren([searchForm, this.mainPage.usersUl]);
  }
}
