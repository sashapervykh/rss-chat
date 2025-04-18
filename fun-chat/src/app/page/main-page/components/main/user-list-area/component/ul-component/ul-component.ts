import { api } from '../../../../../../../API/api';
import BaseComponent from '../../../../../../../shared/base-component/base-component';
import ChatWindow from '../../../chat-window/chat-window';
import LiComponent from '../li-component/li-component';
import { UserListData } from '../li-component/types';

export default class UlComponent extends BaseComponent {
  usersList: LiComponent[] = [];
  filtered = false;
  constructor(chatWindow: ChatWindow) {
    super({
      tag: 'ul',
      styles: ['user-list'],
    });

    this.addListenerToEvent('click', (event) => {
      if (!(event.target instanceof HTMLLIElement)) return;
      if (!event.target.textContent)
        throw new Error('Impossible text value of chosen element');
      const chosenUserLogin = event.target.textContent;
      chatWindow.openDialogue(chosenUserLogin);
      api.sendRequestForAllMessages(chosenUserLogin);
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
      this.filtered = false;
      this.addChildren(this.usersList);
    } else {
      const filterUsers = [];
      for (const user of this.usersList) {
        if (user.login.startsWith(value)) {
          filterUsers.push(user);
        }
      }
      this.filtered = true;
      this.addChildren(filterUsers);
    }
  }

  updateUserListForThirdPartyLogIn(userData: UserListData) {
    for (const user of this.usersList) {
      if (user.login === userData.login) {
        user.addStyles(['online']);
        user.removeStyles(['offline']);
        return;
      }
    }
    const user = new LiComponent(userData);
    if (!this.filtered) {
      this.addChildren([user]);
    }
    this.usersList.push(user);
  }

  updateUserListForThirdPartyLogOut(userData: UserListData) {
    for (const user of this.usersList) {
      if (user.login === userData.login) {
        user.addStyles(['offline']);
        user.removeStyles(['online']);
        return;
      }
    }
  }
}
