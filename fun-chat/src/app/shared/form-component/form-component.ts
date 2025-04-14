import BaseComponent from '../base-component/base-component';
import { Callback } from '../base-component/types';
import { FormComponentParameters } from './types';

export default class FormComponent extends BaseComponent<HTMLFormElement> {
  constructor(parameters: FormComponentParameters) {
    super({ tag: 'form' });

    this.addListenerToSubmit(parameters.onSubmitAction);
  }

  addListenerToSubmit(onSubmitAction: Callback) {
    this.getNode().addEventListener('submit', (event: Event) => {
      onSubmitAction(event);
    });
  }
}
