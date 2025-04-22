import BaseComponent from '../../shared/base-component/base-component';

export default class ErrorMessage extends BaseComponent {
  isOpen = false;
  message = new BaseComponent({ tag: 'div', text: 'Connection to server...' });

  constructor() {
    super({
      tag: 'dialog',
    });
    this.addChildren([this.message]);
  }

  open() {
    const node = this.getNode();
    if (!(node instanceof HTMLDialogElement))
      throw new Error('Element is not dialog');
    node.showModal();
    this.isOpen = true;
  }

  close() {
    const node = this.getNode();
    if (!(node instanceof HTMLDialogElement))
      throw new Error('Element is not dialog');
    node.close();
    this.isOpen = false;
    this.removeThisNode();
  }
}
