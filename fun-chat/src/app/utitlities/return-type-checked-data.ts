import { ResponseTypes } from '../API/types';

export default function returnTypeCheckedData(data: unknown) {
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

  const typeAndPayload = checkTypeAndPayload(data);

  const type = typeAndPayload.type;
  const payload = typeAndPayload.payload;

  return { id: id, type: type, payload: payload };
}

function checkTypeAndPayload(data: {
  id: unknown;
  type: unknown;
  payload: unknown;
}) {
  switch (data.type) {
    case ResponseTypes.thirdLogin:
    case ResponseTypes.thirdLogout:
    case ResponseTypes.logout:
    case ResponseTypes.login: {
      const payload = returnTypeCheckedLoginPayload(data.payload);
      return { type: data.type, payload: payload };
    }
    case ResponseTypes.error: {
      const payload = returnTypeCheckedErrorPayload(data.payload);
      return { type: data.type, payload: payload };
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
    !('user' in payload) ||
    !('isLogined' in payload)
  ) {
    throw new Error(
      'The properties of received payload differs from awaited data.',
    );
  }

  if (typeof payload.user !== 'string')
    throw new TypeError(
      'The user property of received payload differs from awaited data.',
    );
  if (typeof payload.isLogined !== 'string')
    throw new TypeError(
      'The isLogined property of received payload differs from awaited data.',
    );

  return { user: payload.user, isLogined: payload.isLogined };
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
