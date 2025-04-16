import ButtonComponent from '../../../shared/button-component/button-component';
import { buttonToAbout } from '../../../shared/button-to-about/button-to-about';
import FormComponent from '../../../shared/form-component/form-component';
import InputLabel from '../components/input-label';

export default class AuthorizationForm extends FormComponent {
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
      onSubmitAction: (event: Event) => {
        event.preventDefault();
        console.log('Authorization');
      },
    });

    this.addChildren([
      ...this.formLabels,
      this.buttonToLogIn,
      buttonToAbout(['authorization-element']),
    ]);

    this.addListenerToInputChange();
  }

  public addListenerToInputChange() {
    for (const label of this.formLabels) {
      label.input.getNode().addEventListener('input', (event) => {
        console.log(11);
        const resultOfCheck = this.formLabels.map((label) =>
          label.input.getNode() === event.target
            ? label.validateInputValue(true)
            : label.validateInputValue(false),
        );
        console.log(resultOfCheck);
        if (resultOfCheck.every(Boolean)) {
          console.log(1);
          this.buttonToLogIn.getNode().disabled = false;
        } else {
          this.buttonToLogIn.getNode().disabled = true;
        }
      });
    }
  }
}
