export interface BaseComponentParameters {
  tag: keyof HTMLElementTagNameMap;
  styles?: string[];
  text?: string;
}

export type Callback = (event: Event) => void;
