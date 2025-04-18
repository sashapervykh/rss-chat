import BaseComponent from '../base-component/base-component';
import { Callback } from '../base-component/types';
import { FormComponentParameters } from './types';

export default class FormComponent extends BaseComponent {
  constructor(parameters?: FormComponentParameters) {
    super({ tag: 'form', styles: parameters?.styles });

    if (parameters?.onSubmitAction)
      this.addListenerToSubmit(parameters.onSubmitAction);
    if (parameters?.children) this.addChildren(parameters.children);
  }

  addListenerToSubmit(onSubmitAction: Callback) {
    this.getNode().addEventListener('submit', (event: Event) => {
      onSubmitAction(event);
    });
  }

  returnTypeCheckedElement() {
    const node = this.getNode();
    if (!(node instanceof HTMLFormElement))
      throw new Error('The form element was not created');
    return node;
  }
}
