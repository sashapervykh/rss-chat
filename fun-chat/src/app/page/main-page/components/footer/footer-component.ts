import BaseComponent from '../../../../shared/base-component/base-component';
import RSLogo from '../../../../../assets/rs_school.svg';
import GitHubLogo from '../../../../../assets/github-mark.svg';
import './footer-component.css';

export default class FooterComponent extends BaseComponent {
  constructor() {
    super({ tag: 'footer', styles: ['footer'] });
    this.addFooterChildren();
  }

  addFooterChildren() {
    const rsLogo = new BaseComponent({ tag: 'img' });
    const githubLogo = new BaseComponent({
      tag: 'img',
      styles: ['ghlogo'],
    });
    const year = new BaseComponent({
      tag: 'div',
      text: '2025, created by Sasha Pervykh',
      styles: ['footer_element'],
    });

    rsLogo.setAttribute('src', RSLogo);

    githubLogo.setAttribute('src', GitHubLogo);

    const rsLogoWrapper = new BaseComponent({
      tag: 'div',
      children: [rsLogo],
      styles: ['rslogo-wrapper', 'footer_element'],
    });

    const gitHubLink = new BaseComponent({ tag: 'a', children: [githubLogo] });
    gitHubLink.setAttribute('href', 'https://github.com/sashapervykh');
    const ghLogoWrapper = new BaseComponent({
      tag: 'div',
      children: [gitHubLink],
      styles: ['ghlogo-wrapper', 'footer_element'],
    });

    this.addChildren([rsLogoWrapper, year, ghLogoWrapper]);
  }
}
