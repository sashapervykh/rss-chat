import InputComponent from '../../../../../../../shared/input-component/input-component';
import UlComponent from '../ul-component/ul-component';
import './search-input.css';

export default class SearchInput extends InputComponent {
  constructor(userList: UlComponent) {
    super({ placeholder: 'Search', styles: ['search-input'] });

    this.addListenerToEvent('input', () => {
      const enteredValue = this.getNode().value;
      console.log(enteredValue);
      userList.filterUsers(enteredValue);
    });
  }
}
