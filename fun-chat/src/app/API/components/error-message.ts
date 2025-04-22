import BaseComponent from '../../shared/base-component/base-component';

export default class ErrorMessage extends BaseComponent {
  isOpen = false;
  dotCounter = 3;
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

  changeText() {
    if (this.dotCounter === 3) {
      this.dotCounter = 1;
    } else {
      this.dotCounter++;
    }
    this.message.setTextContent(
      `Connection to server ${'.'.repeat(this.dotCounter)}`,
    );
  }
}
