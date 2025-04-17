import BaseComponent from '../../../../../shared/base-component/base-component';
import ButtonComponent from '../../../../../shared/button-component/button-component';
import FormComponent from '../../../../../shared/form-component/form-component';
import InputComponent from '../../../../../shared/input-component/input-component';
import './user-list-area.css';

export default class UserListArea extends BaseComponent {
  constructor() {
    super({
      tag: 'div',
      styles: ['user-list-area'],
    });

    this.addAreaChildren();
  }

  addAreaChildren() {
    const searchForm = new FormComponent({
      styles: ['form'],
      onSubmitAction: () => {
        console.log(1);
      },
      children: [
        new InputComponent({ placeholder: 'Search', styles: ['input'] }),
        new ButtonComponent({ text: `\u{1F50D}`, styles: ['button'] }),
      ],
    });

    const userList = new BaseComponent({ tag: 'ul', styles: ['user-list'] });

    this.addChildren([searchForm, userList]);
  }
}
