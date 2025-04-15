import BaseComponent from '../base-component/base-component';
import './main-component.css';

export default class MainComponent extends BaseComponent {
  constructor(children?: BaseComponent[]) {
    super({ tag: 'main', styles: ['main'] });
    if (children) this.addChildren(children);
  }
}
