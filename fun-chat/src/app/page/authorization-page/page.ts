import ButtonComponent from '../../shared/button-component/button-component';
import FormComponent from '../../shared/form-component/form-component';
import InputComponent from '../../shared/input-component/input-component';
import MainComponent from '../../shared/main-component/main-component';
import AboutPage from '../about-page/about-page';
import './authorization-page.css';

export default class AutorizationPage {
  createAuthorizationPage() {
    const form = new FormComponent({
      styles: ['authorization-form'],
      children: [
        new InputComponent({
          placeholder: 'Name',
          styles: ['authorization-element'],
        }),
        new InputComponent({
          placeholder: 'Password',
          styles: ['authorization-element'],
        }),
        new ButtonComponent({
          text: 'Log In',
          styles: ['authorization-element'],
        }),
        new ButtonComponent({
          text: 'About',
          styles: ['authorization-element'],
          onClickAction: () => {
            document.body.replaceChildren();

            history.pushState('about', '', '/about');
            const aboutPage = new AboutPage();
            aboutPage.createAboutPage();
          },
        }),
      ],
      onSubmitAction: (event: Event) => {
        event.preventDefault();
        console.log('Authorization');
      },
    });
    const main = new MainComponent([form]);
    document.body.append(main.getNode());
  }
}
