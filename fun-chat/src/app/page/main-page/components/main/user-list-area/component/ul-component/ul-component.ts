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

  filterUsers(value: string) {
    this.removeChildren();
    if (value === '') {
      this.addChildren(this.usersList);
    } else {
      const filterUsers = [];
      for (const user of this.usersList) {
        if (user.login.startsWith(value)) {
          filterUsers.push(user);
        }
      }
      this.addChildren(filterUsers);
    }
  }
}
