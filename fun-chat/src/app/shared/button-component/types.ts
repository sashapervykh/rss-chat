import { Callback } from '../base-component/types';

export interface ButtonComponentParameters {
  text?: string;
  onClickAction?: Callback;
  styles: string[];
  disabled?: boolean;
}
