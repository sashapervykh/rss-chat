import BaseComponent from '../../shared/base-component/base-component';
import './connecting-message.css';

export default class ConnectingMessage extends BaseComponent {
  isOpen = false;
  message = new BaseComponent({
    tag: 'div',
    children: [
      new BaseComponent({
        tag: 'div',
        styles: ['message-element'],
        text: 'Connecting to server...',
      }),
      new BaseComponent({
        tag: 'div',
        styles: ['message-element'],
        text: 'Check if the server runs.',
      }),
      new BaseComponent({
        tag: 'a',
        text: `Server's repository`,
        href: 'https://github.com/rolling-scopes-school/fun-chat-server/tree/main',
      }),
    ],
  });

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
