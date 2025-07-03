import { createElement } from '../../utitlities/create-element';
import { BaseComponentParameters, Callback, Tag } from './types';

export default class BaseComponent {
  private node: HTMLElementTagNameMap[Tag];

  constructor(parameters: BaseComponentParameters) {
    this.node = createElement(parameters.tag);

    if (parameters.styles) this.addStyles(parameters.styles);
    if (parameters.text) this.setTextContent(parameters.text);
    if (parameters.children) this.addChildren(parameters.children);
    if (parameters.href) this.addElementSrc(parameters.href);
  }

  public addChildren(children: BaseComponent[]) {
    this.node.append(...children.map((child) => child.getNode()));
  }

  public addElementSrc(source: string) {
    if (!(this.node instanceof HTMLAnchorElement))
      throw new Error('The element is not a link');
    this.node.href = source;
  }

  public addListenerToEvent(
    eventType: keyof HTMLElementEventMap,
    callback: Callback,
  ) {
    this.node.addEventListener(eventType, (event: Event) => {
      callback(event);
    });
  }

  public removeStyles(styles: string[]) {
    this.node.classList.remove(...styles);
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
