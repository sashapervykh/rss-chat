import BaseComponent from '../../../../../../../shared/base-component/base-component';
import './li-component.css';
import { UserListData } from './types';

export default class LiComponent extends BaseComponent {
  constructor(userData: UserListData) {
    super({
      tag: 'li',
      text: userData.login,
      styles: userData.isLogined ? ['online'] : ['offline'],
    });
  }
}
