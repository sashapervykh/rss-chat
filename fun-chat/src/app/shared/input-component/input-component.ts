import BaseComponent from '../base-component/base-component';
import { InputComponentParameters } from './types';

export default class Input extends BaseComponent<HTMLInputElement> {
  constructor(parameters?: InputComponentParameters) {
    super({ tag: 'input' });
    if (parameters?.placeholder)
      this.setAttribute('placeholder', parameters.placeholder);
    if (parameters?.value) this.setAttribute('value', parameters.value);
  }
}
