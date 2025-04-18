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
    api.sendUsersRequestToServer();

    this.mainPage.userList = new UlComponent();

    const searchForm = new SearchInput(this.mainPage.userList);

    this.addChildren([searchForm, this.mainPage.userList]);
  }
}
