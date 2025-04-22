import {
  MessageHistoryResponse,
  RequestsByServer,
  ResponsesToUser,
  ResponseToUserLog,
  ResponseTypes,
  ServerUsersResponse,
} from '../API/types';

export function returnTypeCheckedDataWithStringId(
  data: unknown,
): ResponsesToUser | undefined {
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

  if (typeof parsedData.id === 'string') {
    return returnCheckedTypeAndPayloadForUserRequest({
      id: parsedData.id,
      type: parsedData.type,
      payload: parsedData.payload,
    });
  }
}

export function returnTypeCheckedDataWithNullId(
  data: unknown,
): RequestsByServer {
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

  if (parsedData.id !== null) {
    throw new Error('The id of received data differs from awaited data.');
  }

  return returnCheckedTypeAndPayloadForServerRequest({
    id: parsedData.id,
    type: parsedData.type,
    payload: parsedData.payload,
  });
}

function returnCheckedTypeAndPayloadForUserRequest(
  data: DataWithStringId,
): ResponsesToUser {
  switch (data.type) {
    case ResponseTypes.logout:
    case ResponseTypes.login: {
      return processLogData(data);
    }
    case ResponseTypes.activeUsers:
    case ResponseTypes.inactiveUsers: {
      return processUsersData(data);
    }
    case ResponseTypes.messageHistory: {
      return processMessageHistoryData(data);
    }
    case ResponseTypes.oneMessage: {
      const payload = returnTypeCheckedMessagePayload(data.payload);
      return { id: data.id, type: data.type, payload: payload };
    }
    case ResponseTypes.readMessage: {
      const payload = returnCheckedReadChangeStatus(data.payload);
      return { id: data.id, type: data.type, payload: payload };
    }
    case ResponseTypes.deleteMessage: {
      const payload = returnDeletePayload(data.payload);
      return { id: data.id, type: data.type, payload: payload };
    }
    case ResponseTypes.editMessage: {
      const payload = returnEditPayload(data.payload);
      return { id: data.id, type: data.type, payload: payload };
    }
    case ResponseTypes.error: {
      const payload = returnTypeCheckedErrorPayload(data.payload);
      return { id: data.id, type: data.type, payload: payload };
    }
    default: {
      throw new Error('Something strange');
    }
  }
}

function processLogData(data: DataWithStringId): ResponseToUserLog {
  if (
    !(data.type === ResponseTypes.login || data.type === ResponseTypes.logout)
  )
    throw new Error('There is an error in data');
  const payload = returnTypeCheckedLoginPayload(data.payload);
  return { id: data.id, type: data.type, payload: { user: payload } };
}

function processUsersData(data: DataWithStringId): ServerUsersResponse {
  if (
    !(
      data.type === ResponseTypes.activeUsers ||
      data.type === ResponseTypes.inactiveUsers
    )
  )
    throw new Error('There is an error in data');
  const payload = returnTypeCheckedUsersPayload(data.payload);
  return { id: data.id, type: data.type, payload: { users: payload } };
}

function processMessageHistoryData(
  data: DataWithStringId,
): MessageHistoryResponse {
  if (!(data.type === ResponseTypes.messageHistory))
    throw new Error('There is an error in data');
  const payload = returnCheckedMessageFromUserPayload(data.payload);
  return { id: data.id, type: data.type, payload: payload };
}

function returnCheckedTypeAndPayloadForServerRequest(
  data: DataWithNullId,
): RequestsByServer {
  switch (data.type) {
    case ResponseTypes.thirdLogin:
    case ResponseTypes.thirdLogout: {
      const payload = returnTypeCheckedLoginPayload(data.payload);
      return { id: data.id, type: data.type, payload: { user: payload } };
    }
    case ResponseTypes.oneMessage: {
      const payload = returnTypeCheckedMessagePayload(data.payload);
      return { id: data.id, type: data.type, payload: payload };
    }
    case ResponseTypes.readMessage: {
      const payload = returnCheckedReadChangeStatus(data.payload);
      return { id: data.id, type: data.type, payload: payload };
    }
    case ResponseTypes.deleteMessage: {
      const payload = returnDeletePayload(data.payload);
      return { id: data.id, type: data.type, payload: payload };
    }
    case ResponseTypes.editMessage: {
      const payload = returnEditPayload(data.payload);
      return { id: data.id, type: data.type, payload: payload };
    }
    case ResponseTypes.deliverMessage: {
      const payload = returnDeliverPayload(data.payload);
      return { id: data.id, type: data.type, payload: payload };
    }
    case ResponseTypes.error: {
      const payload = returnTypeCheckedErrorPayload(data.payload);
      return { id: data.id, type: data.type, payload: payload };
    }
    default: {
      throw new Error('Something strange');
    }
  }
}

function returnTypeCheckedUsersPayload(payload: unknown) {
  if (typeof payload !== 'object' || !payload)
    throw new Error('The received payload is not an object or null');

  if (Object.keys(payload).length !== 1 || !('users' in payload)) {
    throw new Error(
      'The user property of received payload differs from awaited data.',
    );
  }

  if (!Array.isArray(payload.users)) {
    throw new TypeError(
      'The user property of received payload differs from awaited data.',
    );
  }

  const result = payload.users.map((element) => returnLoginAndStatus(element));

  return result;
}

function returnTypeCheckedLoginPayload(payload: unknown) {
  if (typeof payload !== 'object' || !payload)
    throw new Error('The received payload is not an object or null');

  if (Object.keys(payload).length !== 1 || !('user' in payload)) {
    throw new Error(
      'The user property of received payload differs from awaited data.',
    );
  }

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

function returnTypeCheckedMessagePayload(payload: unknown) {
  if (typeof payload !== 'object' || !payload)
    throw new Error('The received payload is not an object or null');

  if (Object.keys(payload).length !== 1 || !('message' in payload)) {
    throw new Error(
      'The user property of received payload differs from awaited data.',
    );
  }

  const message = returnTypeCheckedMessage(payload.message);

  return { message: message };
}

function returnTypeCheckedMessage(data: unknown) {
  const message = returnObject(data);

  if (
    Object.keys(message).length !== 6 ||
    !(
      'id' in message &&
      'from' in message &&
      'to' in message &&
      'text' in message &&
      'datetime' in message &&
      'status' in message
    )
  ) {
    throw new Error(
      'The user property of received payload differs from awaited data.',
    );
  }

  const id = returnString(message.id, 'id');
  const from = returnString(message.from, 'from');
  const to = returnString(message.to, 'to');
  const text = returnString(message.text, 'text');
  const datetime = returnNumber(message.datetime, 'datetime');

  const status = returnTypeCheckedStatus(message.status);

  return {
    id: id,
    from: from,
    to: to,
    text: text,
    datetime: datetime,
    status: status,
  };
}

function returnTypeCheckedStatus(status: unknown) {
  if (typeof status !== 'object' || !status) {
    throw new TypeError('The status property of message has the wrong type');
  }

  if (
    Object.keys(status).length !== 3 ||
    !('isDelivered' in status && 'isReaded' in status && 'isEdited' in status)
  ) {
    throw new Error(
      'The status property of received payload differs from awaited data.',
    );
  }

  if (typeof status.isDelivered !== 'boolean') {
    throw new TypeError(
      'The isDelivered property of message has the wrong type',
    );
  }
  if (typeof status.isReaded !== 'boolean') {
    throw new TypeError('The isReaded property of message has the wrong type');
  }
  if (typeof status.isEdited !== 'boolean') {
    throw new TypeError('The isEdited property of message has the wrong type');
  }

  return {
    isDelivered: status.isDelivered,
    isEdited: status.isEdited,
    isReaded: status.isReaded,
  };
}

function returnObject(data: unknown) {
  if (typeof data !== 'object' || !data)
    throw new Error('The received payload is not an object or null');
  return data;
}

function returnString(data: unknown, key: string) {
  if (typeof data !== 'string') {
    throw new TypeError(`The ${key} property of message has the wrong type`);
  }
  return data;
}

function returnNumber(data: unknown, key: string) {
  if (typeof data !== 'number') {
    throw new TypeError(`The ${key} property of message has the wrong type`);
  }
  return data;
}

function returnCheckedMessageFromUserPayload(payload: unknown) {
  const objectPayload = returnObject(payload);
  if (
    Object.keys(objectPayload).length !== 1 ||
    !('messages' in objectPayload)
  ) {
    throw new Error('Messages payload has the wrong type.');
  }

  if (!Array.isArray(objectPayload.messages)) {
    throw new TypeError('Messages payload has the wrong type.');
  }

  const checkedMessages = [];

  for (const message of objectPayload.messages) {
    checkedMessages.push(returnTypeCheckedMessage(message));
  }

  return { messages: checkedMessages };
}

function returnCheckedReadChangeStatus(payload: unknown) {
  const objectPayload = returnObject(payload);
  if (
    Object.keys(objectPayload).length !== 1 ||
    !('message' in objectPayload)
  ) {
    throw new Error('ReadChange payload has the wrong type.');
  }

  const message = returnObject(objectPayload.message);
  if (
    Object.keys(message).length !== 2 ||
    !('id' in message) ||
    !('status' in message)
  ) {
    throw new Error('ReadChange payload has the wrong type.');
  }

  if (typeof message.id !== 'string') {
    throw new TypeError('ReadChange payload has the wrong type.');
  }

  const status = returnObject(message.status);

  if (Object.keys(status).length !== 1 || !('isReaded' in status)) {
    throw new Error('ReadChange payload has the wrong type.');
  }

  if (typeof status.isReaded !== 'boolean') {
    throw new TypeError('ReadChange payload has the wrong type.');
  }
  return { message: { id: message.id, status: { isReaded: status.isReaded } } };
}

function returnDeletePayload(payload: unknown) {
  const objectPayload = returnObject(payload);
  if (
    Object.keys(objectPayload).length !== 1 ||
    !('message' in objectPayload)
  ) {
    throw new Error('ReadChange payload has the wrong type.');
  }

  const message = returnObject(objectPayload.message);
  if (
    Object.keys(message).length !== 2 ||
    !('id' in message) ||
    !('status' in message)
  ) {
    throw new Error('ReadChange payload has the wrong type.');
  }

  if (typeof message.id !== 'string') {
    throw new TypeError('ReadChange payload has the wrong type.');
  }

  const status = returnObject(message.status);

  if (Object.keys(status).length !== 1 || !('isDeleted' in status)) {
    throw new Error('ReadChange payload has the wrong type.');
  }

  if (typeof status.isDeleted !== 'boolean') {
    throw new TypeError('ReadChange payload has the wrong type.');
  }
  return {
    message: { id: message.id, status: { isDeleted: status.isDeleted } },
  };
}

function returnEditPayload(payload: unknown) {
  const objectPayload = returnObject(payload);
  if (
    Object.keys(objectPayload).length !== 1 ||
    !('message' in objectPayload)
  ) {
    throw new Error('ReadChange payload has the wrong type.');
  }
  const message = returnObject(objectPayload.message);
  if (
    Object.keys(message).length !== 3 ||
    !('id' in message) ||
    !('text' in message) ||
    !('status' in message)
  ) {
    throw new Error('Edit payload has the wrong type.');
  }
  if (typeof message.id !== 'string') {
    throw new TypeError('Edit payload has the wrong type.');
  }
  if (typeof message.text !== 'string') {
    throw new TypeError('Edit payload has the wrong type.');
  }
  const status = returnObject(message.status);
  if (Object.keys(status).length !== 1 || !('isEdited' in status)) {
    throw new Error('ReadChange payload has the wrong type.');
  }
  if (typeof status.isEdited !== 'boolean') {
    throw new TypeError('ReadChange payload has the wrong type.');
  }
  return {
    message: {
      id: message.id,
      text: message.text,
      status: { isEdited: status.isEdited },
    },
  };
}

function returnDeliverPayload(payload: unknown) {
  const objectPayload = returnObject(payload);
  if (
    Object.keys(objectPayload).length !== 1 ||
    !('message' in objectPayload)
  ) {
    throw new Error('Deliver payload has the wrong type.');
  }
  const message = returnObject(objectPayload.message);
  if (
    Object.keys(message).length !== 2 ||
    !('id' in message) ||
    !('status' in message)
  ) {
    throw new Error('Edit payload has the wrong type.');
  }
  if (typeof message.id !== 'string') {
    throw new TypeError('Edit payload has the wrong type.');
  }

  const status = returnObject(message.status);
  if (Object.keys(status).length !== 1 || !('isDelivered' in status)) {
    throw new Error('ReadChange payload has the wrong type.');
  }
  if (typeof status.isDelivered !== 'boolean') {
    throw new TypeError('ReadChange payload has the wrong type.');
  }
  return {
    message: {
      id: message.id,
      status: { isDelivered: status.isDelivered },
    },
  };
}

interface DataWithStringId {
  id: string;
  type: unknown;
  payload: unknown;
}

interface DataWithNullId {
  id: null;
  type: unknown;
  payload: unknown;
}
