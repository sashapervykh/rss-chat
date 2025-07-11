export type ResponsesToUser =
  | ResponseToUserLog
  | ServerUsersResponse
  | ErrorToUserResponse
  | SendingMessageResponse
  | MessageHistoryResponse
  | ReadByUserResponse
  | DeleteByUserResponse
  | EditByUserResponse;

export type RequestsByServer =
  | ResponseToThirdPartyLog
  | ErrorFromServerResponse
  | ReceivingMessageResponse
  | ReadByOtherResponse
  | DeleteByOtherResponse
  | EditByOtherResponse
  | MessageDeliverResponse;

export interface ResponseToUserLog {
  id: string;
  type: UserLogTypes;
  payload: LoginPayload;
}

export interface ResponseToThirdPartyLog {
  id: null;
  type: OtherUserLogTypes;
  payload: LoginPayload;
}

export interface ServerUsersResponse {
  id: string;
  type: ResponseTypes.activeUsers | ResponseTypes.inactiveUsers;
  payload: {
    users: User[];
  };
}

export interface ErrorToUserResponse {
  id: string;
  type: ResponseTypes.error;
  payload: ErrorPayload;
}

export interface ErrorFromServerResponse {
  id: null;
  type: ResponseTypes.error;
  payload: ErrorPayload;
}

export interface SendingMessageResponse {
  id: string;
  type: ResponseTypes.oneMessage;
  payload: { message: Message };
}

export interface ReceivingMessageResponse {
  id: null;
  type: ResponseTypes.oneMessage;
  payload: { message: Message };
}

export enum ResponseTypes {
  login = 'USER_LOGIN',
  logout = 'USER_LOGOUT',
  thirdLogin = 'USER_EXTERNAL_LOGIN',
  thirdLogout = 'USER_EXTERNAL_LOGOUT',
  error = 'ERROR',
  activeUsers = 'USER_ACTIVE',
  inactiveUsers = 'USER_INACTIVE',
  messageHistory = 'MSG_FROM_USER',
  oneMessage = 'MSG_SEND',
  readMessage = 'MSG_READ',
  deleteMessage = 'MSG_DELETE',
  editMessage = 'MSG_EDIT',
  deliverMessage = 'MSG_DELIVER',
}

export interface ErrorPayload {
  error: string;
}

export interface LoginPayload {
  user: User;
}

interface User {
  login: string;
  isLogined: boolean;
}

export type UserLogTypes = ResponseTypes.login | ResponseTypes.logout;

export type OtherUserLogTypes =
  | ResponseTypes.thirdLogin
  | ResponseTypes.thirdLogout;

export interface UserLoginData {
  id: string;
  type: UserLogTypes;
  login: string | undefined;
  password: string | undefined;
}

export interface Message {
  id: string;
  from: string;
  to: string;
  text: string;
  datetime: number;
  status: {
    isDelivered: boolean;
    isReaded: boolean;
    isEdited: boolean;
  };
}

export interface ReadByUserResponse {
  id: string;
  type: ResponseTypes.readMessage;
  payload: {
    message: {
      id: string;
      status: {
        isReaded: boolean;
      };
    };
  };
}

export interface ReadByOtherResponse {
  id: null;
  type: ResponseTypes.readMessage;
  payload: {
    message: {
      id: string;
      status: {
        isReaded: boolean;
      };
    };
  };
}

export interface MessageHistoryResponse {
  id: string;
  type: ResponseTypes.messageHistory;
  payload: {
    messages: Message[];
  };
}

export interface DeleteByUserResponse {
  id: string;
  type: ResponseTypes.deleteMessage;
  payload: {
    message: {
      id: string;
      status: {
        isDeleted: boolean;
      };
    };
  };
}

export interface DeleteByOtherResponse {
  id: null;
  type: ResponseTypes.deleteMessage;
  payload: {
    message: {
      id: string;
      status: {
        isDeleted: boolean;
      };
    };
  };
}

export interface EditByUserResponse {
  id: string;
  type: ResponseTypes.editMessage;
  payload: {
    message: {
      id: string;
      text: string;
      status: {
        isEdited: boolean;
      };
    };
  };
}

export interface EditByOtherResponse {
  id: null;
  type: ResponseTypes.editMessage;
  payload: {
    message: {
      id: string;
      text: string;
      status: {
        isEdited: boolean;
      };
    };
  };
}

export interface MessageDeliverResponse {
  id: null;
  type: ResponseTypes.deliverMessage;
  payload: {
    message: {
      id: string;
      status: {
        isDelivered: boolean;
      };
    };
  };
}
