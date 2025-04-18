import BaseComponent from './base-component';

export interface BaseComponentParameters {
  tag: Tag;
  styles?: string[];
  text?: string;
  children?: BaseComponent[];
}

export type Callback = (event: Event) => void;
export type Tag = keyof HTMLElementTagNameMap;
