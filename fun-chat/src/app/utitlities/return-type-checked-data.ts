import {
  ResponseTypes,
  ServerErrorResponse,
  ServerLogResponse,
} from '../API/types';

export default function returnTypeCheckedData(
  data: unknown,
): ServerLogResponse | ServerErrorResponse {
  if (typeof data !== 'object' || !data)
    throw new Error('The received data is not an object or null');

  if (
    Object.keys(data).length !== 3 ||
    !('id' in data) ||
    !('type' in data) ||
    !('payload' in data)
  ) {
    throw new Error(
      'The properties of received data differs from awaited data.',
    );
  }

  if (!(typeof data.id === 'string') && !(data.id === null)) {
    throw new Error('The id of received data differs from awaited data.');
  }

  const id = data.id;

  return checkTypeAndPayload({
    id: id,
    type: data.type,
    payload: data.payload,
  });
}

function checkTypeAndPayload(data: {
  id: string | null;
  type: unknown;
  payload: unknown;
}) {
  switch (data.type) {
    case ResponseTypes.thirdLogin:
    case ResponseTypes.thirdLogout:
    case ResponseTypes.logout:
    case ResponseTypes.login: {
      const payload = returnTypeCheckedLoginPayload(data.payload);
      return { id: data.id, type: data.type, payload: { user: payload } };
    }
    case ResponseTypes.error: {
      const payload = returnTypeCheckedErrorPayload(data.payload);
      return { id: data.id, type: data.type, payload: payload };
    }
    default: {
      throw new Error('Type of received data differs from awaited');
    }
  }
}

function returnTypeCheckedLoginPayload(payload: unknown) {
  if (typeof payload !== 'object' || !payload)
    throw new Error('The received payload is not an object or null');

  if (
    Object.keys(payload).length !== 3 ||
    !('login' in payload) ||
    !('isLogined' in payload)
  ) {
    throw new Error(
      'The properties of received payload differs from awaited data.',
    );
  }

  if (typeof payload.login !== 'string')
    throw new TypeError(
      'The user property of received payload differs from awaited data.',
    );
  if (typeof payload.isLogined !== 'boolean')
    throw new TypeError(
      'The isLogined property of received payload differs from awaited data.',
    );

  return { login: payload.login, isLogined: payload.isLogined };
}

function returnTypeCheckedErrorPayload(payload: unknown) {
  if (typeof payload !== 'object' || !payload)
    throw new Error('The received payload is not an object or null');

  if (Object.keys(payload).length !== 1 || !('error' in payload)) {
    throw new Error(
      'The properties of received payload differs from awaited data.',
    );
  }

  if (typeof payload.error !== 'string')
    throw new TypeError(
      'The error properties of received payload differs from awaited data.',
    );

  return { error: payload.error };
}
