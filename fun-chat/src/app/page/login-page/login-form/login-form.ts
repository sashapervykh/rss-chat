import { api } from '../../../API/api';
import ButtonComponent from '../../../shared/button-component/button-component';
import { buttonToAbout } from '../../../shared/button-to-about/button-to-about';
import FormComponent from '../../../shared/form-component/form-component';
import InputLabel from './components/input-label';

export default class LoginForm extends FormComponent {
  formLabels = [
    new InputLabel({ type: 'Name' }),
    new InputLabel({ type: 'Password' }),
  ];
  buttonToLogIn = new ButtonComponent({
    text: 'Log In',
    styles: ['authorization-element'],
    disabled: true,
  });

  constructor() {
    super({
      styles: ['authorization-form'],
    });

    this.addChildren([
      ...this.formLabels,
      this.buttonToLogIn,
      buttonToAbout(['authorization-element']),
    ]);

    this.addListenerToSubmit((event: Event) => {
      event.preventDefault();
      api.sendLoginRequestToServer({
        login: this.formLabels[0].input.getNode().value,
        password: this.formLabels[1].input.getNode().value,
      });
    });
    this.addListenerToInputChange();
  }

  public addListenerToInputChange() {
    for (const label of this.formLabels) {
      label.input.getNode().addEventListener('input', (event) => {
        const resultOfCheck = this.formLabels.map((label) =>
          label.input.getNode() === event.target
            ? label.validateInputValue(true)
            : label.validateInputValue(false),
        );
        if (resultOfCheck.every(Boolean)) {
          this.buttonToLogIn.getNode().disabled = false;
        } else {
          this.buttonToLogIn.getNode().disabled = true;
        }
      });
    }
  }
}
