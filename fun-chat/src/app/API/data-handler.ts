import LoginPage from '../page/login-page/login-page';
import MainPage from '../page/main-page/main-page';
import clearBody from '../utitlities/clear-body';
import returnNonNullableValue from '../utitlities/return-defined-value';
import { api } from './api';
import {
  DeleteByOtherResponse,
  DeleteByUserResponse,
  EditByOtherResponse,
  EditByUserResponse,
  MessageHistoryResponse,
  ReadByOtherResponse,
  RequestsByServer,
  ResponsesToUser,
  ResponseToThirdPartyLog,
  ResponseToUserLog,
  ResponseTypes,
  SendingMessageResponse,
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

  processResponseToUser(data: ResponsesToUser) {
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
        this.processMessageHistoryResponse(data);
        break;
      }
      case ResponseTypes.oneMessage: {
        this.drawSendedMessage(data);
        break;
      }
      case ResponseTypes.readMessage: {
        api.sendRequestForMessageHistory(data.id);
        break;
      }
      case ResponseTypes.deleteMessage: {
        this.removeDeletedMessage(data);
        break;
      }
      case ResponseTypes.editMessage: {
        this.processEditByUserResponse(data);
        break;
      }
      default: {
        console.log('Something strange');
      }
    }
  }

  processRequestFromServer(data: RequestsByServer) {
    switch (data.type) {
      case ResponseTypes.thirdLogin: {
        this.processThirdPartyLogIn(data);
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
      case ResponseTypes.readMessage: {
        this.changeReadStatus(data);
        break;
      }
      case ResponseTypes.deleteMessage: {
        this.updateCountersAfterDeleting();
        this.removeDeletedMessage(data);
        break;
      }
      case ResponseTypes.editMessage: {
        this.processEditByOtherResponse(data);
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

  private doWhenUserLogIn(data: ResponseToUserLog) {
    clearBody();
    history.replaceState('main', '', '/sashapervykh-JSFE2024Q4/fun-chat/main');
    this.mainPage.createMainPage({ userName: data.payload.user.login });
  }

  private doWhenUserLogOut() {
    clearBody();
    history.replaceState(
      'login',
      '',
      '/sashapervykh-JSFE2024Q4/fun-chat/login',
    );
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

  private drawSendedMessage(data: SendingMessageResponse) {
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

  private changeReadStatus(data: ReadByOtherResponse) {
    if (!this.mainPage.chatWindow)
      throw new Error('Data about chat window are not received');
    const readMessage = this.mainPage.chatWindow.allMessages.find(
      (element) => element.messageId === data.payload.message.id,
    );
    if (readMessage?.messageInfo) {
      readMessage.messageInfo.changeTextOfStatus(
        'isReaded',
        data.payload.message.status.isReaded,
      );
    }
  }

  private removeDeletedMessage(
    data: DeleteByUserResponse | DeleteByOtherResponse,
  ) {
    if (!this.mainPage.chatWindow)
      throw new Error('Data about chat window are not received');
    const readMessageIndex = this.mainPage.chatWindow.allMessages.findIndex(
      (element) => element.messageId === data.payload.message.id,
    );
    if (readMessageIndex !== -1) {
      this.mainPage.chatWindow.allMessages[readMessageIndex].removeThisNode();
      this.mainPage.chatWindow.allMessages.splice(readMessageIndex, 1);
    }
  }

  private updateCountersAfterDeleting() {
    if (!this.mainPage.usersUl)
      throw new Error('Data about chat window are not received');
    for (const user of this.mainPage.usersUl.usersList) {
      api.sendRequestForMessageHistory(user.login);
    }
  }

  private processMessageHistoryResponse(data: MessageHistoryResponse) {
    this.showAmountOfUnreadLetters(data);
    if (this.isOpeningDialogue) {
      this.showMessageHistory(data);
    }
  }

  private processEditByUserResponse(data: EditByUserResponse) {
    const chatWindow = returnNonNullableValue(this.mainPage.chatWindow);
    const editedMessage = chatWindow.allMessages.find(
      (message) => message.messageId === data.payload.message.id,
    );
    editedMessage?.buttonToEdit.saveEditedResult(data.payload.message.text);
    editedMessage?.messageInfo.changeTextOfStatus(
      'isEdited',
      data.payload.message.status.isEdited,
    );
  }

  private processEditByOtherResponse(data: EditByOtherResponse) {
    const chatWindow = returnNonNullableValue(this.mainPage.chatWindow);
    const editedMessage = chatWindow.allMessages.find(
      (message) => message.messageId === data.payload.message.id,
    );
    editedMessage?.messageText.setTextContent(data.payload.message.text);
    editedMessage?.messageInfo.changeTextOfStatus(
      'isEdited',
      data.payload.message.status.isEdited,
    );
  }

  private processThirdPartyLogIn(data: ResponseToThirdPartyLog) {
    if (!this.mainPage.usersUl)
      throw new Error('Data about user list are not received');
    this.mainPage.usersUl.updateUserListForThirdPartyLogIn(data.payload.user);
  }
}

export const dataHandler = new DataHandler();
