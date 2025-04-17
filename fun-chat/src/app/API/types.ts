export interface ServerResponse {
  id: string | null;
  type: 'ERROR' | 'USER_LOGIN';
  payload: PayloadTypes;
}

export type PayloadTypes = ErrorPayload | LoginPayload;

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
