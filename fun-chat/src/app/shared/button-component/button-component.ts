import BaseComponent from '../base-component/base-component';
import { ButtonComponentParameters } from './types';

export default class ButtonComponent extends BaseComponent {
  constructor(parameters?: ButtonComponentParameters) {
    super({ tag: 'button', styles: parameters?.styles });
    if (parameters?.text) this.setTextContent(parameters.text);
    if (parameters?.onClickAction)
      this.addListenerToEvent('click', parameters.onClickAction);
    if (parameters?.disabled) this.getNode().disabled = parameters.disabled;
  }

  public getNode() {
    const node = super.getNode();
    if (!(node instanceof HTMLButtonElement))
      throw new Error('Button Element was not created');
    return node;
  }
}
