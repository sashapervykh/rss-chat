import BaseComponent from '../base-component/base-component';
import { Callback } from '../base-component/types';

export interface FormComponentParameters {
  onSubmitAction: Callback;
  children: BaseComponent[];
  styles: string[];
}
