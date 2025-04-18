import BaseComponent from '../../../../../../../shared/base-component/base-component';

export default class MessageTextarea extends BaseComponent {
  constructor() {
    super({ tag: 'textarea', styles: ['message-textarea'] });

    this.getNode().setAttribute('rows', '2');
  }

  getNode() {
    const node = super.getNode();
    if (!(node instanceof HTMLTextAreaElement))
      throw new Error('The element is not textarea');
    return node;
  }
}
