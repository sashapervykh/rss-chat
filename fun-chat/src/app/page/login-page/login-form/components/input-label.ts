import { DataForCheck, InputLabelParameters } from './types';
import './input-label.css';
import BaseComponent from '../../../../shared/base-component/base-component';
import InputComponent from '../../../../shared/input-component/input-component';

export default class InputLabel extends BaseComponent {
  type: 'Name' | 'Password';
  notice: BaseComponent | undefined;
  input = new InputComponent({
    styles: ['label_input'],
  });

  constructor(parameters: InputLabelParameters) {
    super({ tag: 'label' });
    this.type = parameters.type;
    this.addChildren([
      new BaseComponent({
        tag: 'div',
        styles: ['label_first-line'],
        children: [
          new BaseComponent({ tag: 'div', text: `${parameters.type}: ` }),
          this.input,
        ],
      }),
    ]);
  }

  showNotice(noticeText: string) {
    if (this.notice) {
      this.notice.setTextContent(noticeText);
    } else {
      this.notice = new BaseComponent({
        tag: 'p',
        text: noticeText,
        styles: ['notice'],
      });
      this.addChildren([this.notice]);
    }
  }

  removeNotice() {
    if (this.notice) {
      this.notice.removeThisNode();
      this.notice = undefined;
    }
  }

  checkValue(dataForCheck: DataForCheck) {
    let resultOfCheck = true;
    let notice = '';
    if (dataForCheck.value.length <= dataForCheck.criteria.minlength) {
      notice += `${this.type} shall be longer than ${dataForCheck.criteria.minlength.toString()} letters. \n`;
      resultOfCheck = false;
    }
    if (!dataForCheck.criteria.pattern.test(dataForCheck.value)) {
      notice +=
        this.type === 'Name'
          ? `${this.type} shall include capital and lowercase English letters. `
          : `${this.type} shall include capital English letters and digits.`;
      resultOfCheck = false;
    }

    return { resultOfCheck: resultOfCheck, notice: notice };
  }

  changeNoticeAsPerCheck(dataForCheck: DataForCheck) {
    const results = this.checkValue(dataForCheck);
    if (results.resultOfCheck) {
      if (dataForCheck.withNotice) this.removeNotice();
      return true;
    }
    if (dataForCheck.withNotice) this.showNotice(results.notice);
    return false;
  }

  validateInputValue(withNotice: boolean) {
    const value = this.input.getNode().value;

    if (this.type === 'Name') {
      return this.changeNoticeAsPerCheck({
        withNotice: withNotice,
        value: value,
        criteria: {
          minlength: 3,
          pattern: /^(?=.*[A-Z])(?=.*[a-z]).+$/,
        },
      });
    }

    return this.changeNoticeAsPerCheck({
      withNotice: withNotice,
      value: value,
      criteria: {
        minlength: 4,
        pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/,
      },
    });
  }
}
