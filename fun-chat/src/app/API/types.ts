export interface ServerLogResponse {
  id: string | null;
  type: UserLogTypes;
  payload: LoginPayload;
}

export interface ServerErrorResponse {
  id: string | null;
  type: ResponseTypes.error;
  payload: ErrorPayload;
}

export enum ResponseTypes {
  login = 'USER_LOGIN',
  logout = 'USER_LOGOUT',
  thirdLogin = 'USER_EXTERNAL_LOGIN',
  thirdLogout = 'USER_EXTERNAL_LOGOUT',
  error = 'ERROR',
}

export interface ErrorPayload {
  error: string;
}

export interface LoginPayload {
  user: {
    login: string;
    isLogined: boolean;
  };
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
