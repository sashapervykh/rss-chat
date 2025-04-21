export type ResponsesToUser =
  | ResponseToUserLog
  | ServerUsersResponse
  | ServerErrorResponse
  | SendingMessageResponse
  | MessageHistoryResponse
  | ReadChangeResponse;

export type RequestsByServer =
  | ResponseToThirdPartyLog
  | ServerErrorResponse
  | ReceivingMessageResponse
  | ReadChangeResponse;

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

export interface ServerErrorResponse {
  id: string | null;
  type: ResponseTypes.error;
  payload: ErrorPayload;
}

export interface SendingMessageResponse {
  id: null;
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

export interface ReadChangeResponse {
  id: string | null;
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
