import BaseComponent from '../base-component/base-component';
import { ButtonComponentParameters } from './types';

export default class ButtonComponent extends BaseComponent<HTMLButtonElement> {
  constructor(parameters?: ButtonComponentParameters) {
    super({ tag: 'button' });
    if (parameters?.text) this.setTextContent(parameters.text);
    if (parameters?.onClickAction)
      this.addListenerToEvent('click', parameters.onClickAction);
  }
}
