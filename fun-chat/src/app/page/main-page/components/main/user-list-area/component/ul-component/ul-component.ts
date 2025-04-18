import { api } from '../../../../../../../API/api';
import BaseComponent from '../../../../../../../shared/base-component/base-component';
import ChatWindow from '../../../chat-window/chat-window';
import LiComponent from '../li-component/li-component';
import { UserListData } from '../li-component/types';

export default class UlComponent extends BaseComponent {
  usersList: LiComponent[] = [];
  constructor(chatWindow: ChatWindow) {
    super({
      tag: 'ul',
      styles: ['user-list'],
    });

    this.addListenerToEvent('click', (event) => {
      if (!(event.target instanceof HTMLLIElement)) return;
      if (!chatWindow.h2)
        throw new Error('Information about chat header are not received');
      if (!event.target.textContent)
        throw new Error('Impossible text value of chosen element');
      const chosenUserLogin = event.target.textContent;
      chatWindow.h2.setTextContent(chosenUserLogin);
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
