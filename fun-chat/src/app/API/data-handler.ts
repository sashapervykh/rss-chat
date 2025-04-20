import LoginPage from '../page/login-page/login-page';
import MainPage from '../page/main-page/main-page';
import clearBody from '../utitlities/clear-body';
import {
  MessageHistoryResponse,
  ResponseTypes,
  ServerLogResponse,
  ServerMessageResponse,
  ServerResponses,
  ServerUsersResponse,
} from './types';

export default class DataHandler {
  mainPage = new MainPage();
  currentUser: string | undefined =
    sessionStorage.getItem('login') ?? undefined;

  currentPassword: string | undefined =
    sessionStorage.getItem('password') ?? undefined;
  isOpeningDialogue = false;
  statusOfChosenUser: 'online' | 'offline' = 'offline';

  processResponseToUser(data: ServerResponses) {
    console.log(data);
    switch (data.type) {
      case ResponseTypes.login: {
        this.doWhenUserLogIn(data);
        break;
      }
      case ResponseTypes.logout: {
        this.doWhenUserLogOut();
        break;
      }
      case ResponseTypes.activeUsers:
      case ResponseTypes.inactiveUsers: {
        this.drawUsersList(data);
        break;
      }
      case ResponseTypes.messageHistory: {
        this.showAmountOfUnreadLetters(data);
        if (this.isOpeningDialogue) {
          this.showMessageHistory(data);
        }
        break;
      }
      case ResponseTypes.oneMessage: {
        this.drawSendedMessage(data);
        break;
      }
      default: {
        console.log('Something strange');
      }
    }
  }

  processRequestFromServer(data: ServerResponses) {
    console.log(data);

    switch (data.type) {
      case ResponseTypes.thirdLogin: {
        if (!this.mainPage.usersUl)
          throw new Error('Data about user list are not received');
        this.mainPage.usersUl.updateUserListForThirdPartyLogIn(
          data.payload.user,
        );
        break;
      }
      case ResponseTypes.thirdLogout: {
        if (!this.mainPage.usersUl)
          throw new Error('Data about user list are not received');
        this.mainPage.usersUl.updateUserListForThirdPartyLogOut(
          data.payload.user,
        );
        break;
      }
      case ResponseTypes.oneMessage: {
        if (!this.mainPage.chatWindow)
          throw new Error('Data about chat window are not received');
        this.mainPage.chatWindow.processIncomingLetter(data.payload.message);
        break;
      }

      default: {
        console.log('Something strange');
      }
    }
  }

  resetDataHandler() {
    this.mainPage = new MainPage();
    this.isOpeningDialogue = false;
    this.statusOfChosenUser = 'offline';
  }

  private doWhenUserLogIn(data: ServerLogResponse) {
    clearBody();
    history.replaceState('main', '', '/main');
    this.mainPage.createMainPage({ userName: data.payload.user.login });
  }

  private doWhenUserLogOut() {
    clearBody();
    history.replaceState('login', '', '/login');
    const loginPage = new LoginPage();
    loginPage.createLoginPage();
    sessionStorage.removeItem('login');
  }

  private drawUsersList(data: ServerUsersResponse) {
    if (this.mainPage.usersUl) {
      for (const user of data.payload.users) {
        if (user.login === this.currentUser) continue;
        this.mainPage.usersUl.addItemToList(user);
      }
    } else {
      console.error('Data about users are not received');
    }
  }

  private drawSendedMessage(data: ServerMessageResponse) {
    if (!this.mainPage.chatWindow) throw new Error('Chat window was not found');
    this.mainPage.chatWindow.addMessageToChat(data.payload.message);
  }

  private showAmountOfUnreadLetters(data: MessageHistoryResponse) {
    if (!this.mainPage.usersUl)
      throw new Error('There is not data about users list');
    const element = this.mainPage.usersUl.usersList.find(
      (element) => element.login === data.id,
    );
    const unreadMessages = data.payload.messages.filter(
      (message) => message.from === data.id && !message.status.isReaded,
    );
    element?.setTextContent(`${data.id} (${unreadMessages.length.toString()})`);
  }

  private showMessageHistory(data: MessageHistoryResponse) {
    if (!this.mainPage.usersUl)
      throw new Error('There is no data about users list');
    if (!this.mainPage.chatWindow)
      throw new Error('There is no data about chat window');

    this.mainPage.chatWindow.messageList.removeChildren();
    this.mainPage.chatWindow.openDialogue(data, this.statusOfChosenUser);
  }
}

export const dataHandler = new DataHandler();
