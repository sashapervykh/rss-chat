import BaseComponent from '../../../../../../../shared/base-component/base-component';
import './separate-line.css';

export default class SeparateLine extends BaseComponent {
  constructor() {
    super({ tag: 'div', text: 'New Messages', styles: ['separate-line'] });
  }
}
