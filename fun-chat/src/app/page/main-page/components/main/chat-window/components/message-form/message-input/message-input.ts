import InputComponent from '../../../../../../../../shared/input-component/input-component';

export default class MessageInput extends InputComponent {
  constructor() {
    super({ styles: ['message-textarea'] });

    this.getNode().disabled = true;
  }
}
