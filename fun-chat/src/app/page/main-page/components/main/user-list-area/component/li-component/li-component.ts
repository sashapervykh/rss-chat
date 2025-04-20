import { api } from '../../../../../../../API/api';
import BaseComponent from '../../../../../../../shared/base-component/base-component';
import './li-component.css';
import { UserListData } from './types';

export default class LiComponent extends BaseComponent {
  login: string;
  iSshown: boolean;
  constructor(userData: UserListData) {
    super({
      tag: 'li',
      text: userData.login,
      styles: userData.isLogined ? ['online'] : ['offline'],
    });
    this.iSshown = true;
    this.login = userData.login;
    api.sendRequestForMessageHistory(this.login);
  }
}
