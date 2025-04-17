import {
  ResponseTypes,
  ServerErrorResponse,
  ServerLogResponse,
} from '../API/types';

export default function returnTypeCheckedData(
  data: unknown,
): ServerLogResponse | ServerErrorResponse {
  if (typeof data !== 'string')
    throw new Error('The received data is not string');

  const parsedData: unknown = JSON.parse(data);

  if (typeof parsedData !== 'object' || !parsedData)
    throw new Error('The received data is not an object or null');

  if (
    Object.keys(parsedData).length !== 3 ||
    !('id' in parsedData) ||
    !('type' in parsedData) ||
    !('payload' in parsedData)
  ) {
    throw new Error(
      'The properties of received data differs from awaited data.',
    );
  }

  if (!(typeof parsedData.id === 'string') && !(parsedData.id === null)) {
    throw new Error('The id of received data differs from awaited data.');
  }

  const id = parsedData.id;

  return checkTypeAndPayload({
    id: id,
    type: parsedData.type,
    payload: parsedData.payload,
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
    // case ResponseTypes.activeUsers:
    // case ResponseTypes.inactiveUsers: {
    // }
    case ResponseTypes.error: {
      const payload = returnTypeCheckedErrorPayload(data.payload);
      return { id: data.id, type: data.type, payload: payload };
    }
    default: {
      throw new Error('Type of received data differs from awaited');
    }
  }
}

// function returnTypeCheckedUsersPayload(payload: unknown) {
//   if (typeof payload !== 'object' || !payload)
//     throw new Error('The received payload is not an object or null');

//   if (Object.keys(payload).length !== 1 || !('users' in payload)) {
//     throw new Error(
//       'The user property of received payload differs from awaited data.',
//     );
//   }

//   if (!Array.isArray(payload.users)) {
//     throw new TypeError(
//       'The user property of received payload differs from awaited data.',
//     );
//   }

//   const result = [];

//   return { login: payload.user.login, isLogined: payload.user.isLogined };
// }

function returnTypeCheckedLoginPayload(payload: unknown) {
  if (typeof payload !== 'object' || !payload)
    throw new Error('The received payload is not an object or null');

  if (Object.keys(payload).length !== 1 || !('user' in payload)) {
    throw new Error(
      'The user property of received payload differs from awaited data.',
    );
  }

  // if (typeof payload.user !== 'object' || !payload.user) {
  //   throw new Error(
  //     'The user property of received payload differs from awaited data.',
  //   );
  // }

  // if (
  //   Object.keys(payload.user).length !== 2 ||
  //   !('login' in payload.user) ||
  //   !('isLogined' in payload.user)
  // ) {
  //   throw new Error(
  //     'The properties of received payload differs from awaited data.',
  //   );
  // }

  // if (typeof payload.user.login !== 'string')
  //   throw new TypeError(
  //     'The user property of received payload differs from awaited data.',
  //   );
  // if (typeof payload.user.isLogined !== 'boolean')
  //   throw new TypeError(
  //     'The isLogined property of received payload differs from awaited data.',
  //   );

  return returnLoginAndStatus(payload.user);
}

function returnLoginAndStatus(data: unknown) {
  if (typeof data !== 'object' || !data) {
    throw new Error(
      'The user property of received payload differs from awaited data.',
    );
  }

  if (
    Object.keys(data).length !== 2 ||
    !('login' in data) ||
    !('isLogined' in data)
  ) {
    throw new Error(
      'The properties of received payload differs from awaited data.',
    );
  }

  if (typeof data.login !== 'string')
    throw new TypeError(
      'The user property of received payload differs from awaited data.',
    );
  if (typeof data.isLogined !== 'boolean')
    throw new TypeError(
      'The isLogined property of received payload differs from awaited data.',
    );

  return { login: data.login, isLogined: data.isLogined };
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
