import { BaseComponentParameters, Callback } from './types';

export default class BaseComponent<T extends HTMLElement = HTMLElement> {
  private node: T | HTMLElement;

  constructor(parameters: BaseComponentParameters) {
    this.node = document.createElement(parameters.tag);
    if (parameters.styles) this.addStyles(parameters.styles);
    if (parameters.text) this.setTextContent(parameters.text);
  }

  public addListenerToClick(callback: Callback) {
    this.node.addEventListener('click', () => {
      callback();
    });
  }

  public addStyles(styles: string[]) {
    this.node.classList.add(...styles);
  }

  public setTextContent(text: string) {
    this.node.textContent = text;
  }

  public setAttribute(attribute: string, value: string) {
    this.node.setAttribute(attribute, value);
  }
}
