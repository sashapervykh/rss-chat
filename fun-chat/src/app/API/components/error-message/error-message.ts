import BaseComponent from '../../../shared/base-component/base-component';
import ButtonComponent from '../../../shared/button-component/button-component';
import './error-message.css';

export default class ErrorMessage extends BaseComponent {
  constructor(text: string) {
    super({
      tag: 'dialog',
    });
    this.addChildren([
      new BaseComponent({
        tag: 'div',
        styles: ['dialog-wrapper'],
        children: [
          new BaseComponent({ tag: 'div', text: text }),
          new ButtonComponent({
            text: 'OK',
            styles: ['dialog-button'],
            onClickAction: () => {
              this.close();
            },
          }),
        ],
      }),
    ]);
  }

  open() {
    const node = this.getNode();
    if (!(node instanceof HTMLDialogElement))
      throw new Error('Element is not dialog');
    node.showModal();
  }

  close() {
    const node = this.getNode();
    if (!(node instanceof HTMLDialogElement))
      throw new Error('Element is not dialog');
    node.close();
    this.removeThisNode();
  }
}
