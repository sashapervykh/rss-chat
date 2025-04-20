export function returnMessageInfo(parameters: ParametersForStatus) {
  let text: string;
  if (parameters.messageType === 'incoming') {
    text = parameters.isEdited ? 'Edited' : 'Not edited';
  } else {
    text = `${parameters.isEdited ? 'Edited' : 'Not edited'}/${parameters.isDelivered ? 'Delivered' : 'Not delivered'}/${parameters.isReaded ? 'Read' : 'Not read'}`;
  }
  return text;
}

export interface ParametersForStatus {
  messageType: 'incoming' | 'outgoing';
  isDelivered: boolean;
  isEdited: boolean;
  isReaded: boolean;
}
