import BaseComponent from './base-component';

export interface BaseComponentParameters {
  tag: keyof HTMLElementTagNameMap;
  styles?: string[];
  text?: string;
  children?: BaseComponent[];
}

export type Callback = (event: Event) => void;
