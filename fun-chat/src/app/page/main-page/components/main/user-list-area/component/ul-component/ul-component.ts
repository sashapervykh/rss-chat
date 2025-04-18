import BaseComponent from '../../../../../../../shared/base-component/base-component';
import LiComponent from '../li-component/li-component';
import { UserListData } from '../li-component/types';

export default class UlComponent extends BaseComponent {
  usersList: LiComponent[] = [];
  constructor() {
    super({
      tag: 'ul',
      styles: ['user-list'],
    });
  }

  addItemToList(userData: UserListData) {
    const user = new LiComponent(userData);
    this.usersList.push(user);
    this.addChildren([user]);
  }
}
