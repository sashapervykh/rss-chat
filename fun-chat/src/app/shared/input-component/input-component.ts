import BaseComponent from '../base-component/base-component';
import { InputComponentParameters } from './types';

export default class InputComponent extends BaseComponent {
  constructor(parameters?: InputComponentParameters) {
    super({ tag: 'input' });
    if (parameters?.styles) this.addStyles(parameters.styles);

    if (parameters?.placeholder)
      this.setAttribute('placeholder', parameters.placeholder);
    if (parameters?.value) this.setAttribute('value', parameters.value);
    if (parameters?.type) this.setAttribute('type', parameters.type);
    if (parameters?.required) this.setAttribute('required', 'required');
    if (parameters?.minLength)
      this.setAttribute('minlength', parameters.minLength);
  }

  getNode() {
    const node = super.getNode();
    if (!(node instanceof HTMLInputElement))
      throw new Error('Created node is not an Input');
    return node;
  }
}
