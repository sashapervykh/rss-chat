import BaseComponent from '../../../../../../../shared/base-component/base-component';
import LiComponent from '../li-component/li-component';
import { UserListData } from '../li-component/types';

export default class UlComponent extends BaseComponent {
  constructor() {
    super({
      tag: 'ul',
      styles: ['user-list'],
    });
  }

  addItemToList(userData: UserListData) {
    this.addChildren([new LiComponent(userData)]);
  }
}
