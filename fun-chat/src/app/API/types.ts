export type ServerResponses =
  | ServerLogResponse
  | ServerUsersResponse
  | ServerErrorResponse
  | ServerMessageResponse
  | MessageFromUserResponse;

export interface MessageFromUserResponse {
  id: string;
  type: ResponseTypes.messagesFromUser;
  payload: {
    messages: Message[];
  };
}

export interface ServerLogResponse {
  id: string | null;
  type: UserLogTypes;
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

export interface ServerMessageResponse {
  id: string | null;
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
  messagesFromUser = 'MSG_FROM_USER',
  oneMessage = 'MSG_SEND',
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

export type UserLogTypes =
  | ResponseTypes.login
  | ResponseTypes.logout
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
