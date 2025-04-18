import { createElement } from '../../utitlities/create-element';
import { BaseComponentParameters, Callback, Tag } from './types';

export default class BaseComponent {
  private node: HTMLElementTagNameMap[Tag];

  constructor(parameters: BaseComponentParameters) {
    this.node = createElement(parameters.tag);
    if (parameters.styles) this.addStyles(parameters.styles);
    if (parameters.text) this.setTextContent(parameters.text);
    if (parameters.children) this.addChildren(parameters.children);
  }

  public addChildren(children: BaseComponent[]) {
    this.node.append(...children.map((child) => child.getNode()));
  }

  public addListenerToEvent(
    eventType: keyof HTMLElementEventMap,
    callback: Callback,
  ) {
    this.node.addEventListener(eventType, (event: Event) => {
      callback(event);
    });
  }

  public addStyles(styles: string[]) {
    this.node.classList.add(...styles);
  }

  public getNode() {
    return this.node;
  }

  removeChildren() {
    this.node.replaceChildren();
  }

  public removeThisNode() {
    this.node.remove();
  }

  public setTextContent(text: string) {
    this.node.textContent = text;
  }

  public setAttribute(attribute: string, value: string) {
    this.node.setAttribute(attribute, value);
  }
}
