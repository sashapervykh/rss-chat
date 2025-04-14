export interface BaseComponentParameters {
  tag: keyof HTMLElementTagNameMap;
  styles?: string[];
  text: string;
}
