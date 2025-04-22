import BaseComponent from '../../../../../../../../shared/base-component/base-component';
import InputComponent from '../../../../../../../../shared/input-component/input-component';
import returnNonNullableValue from '../../../../../../../../utitlities/return-defined-value';

export default class MessageText extends BaseComponent {
  text;
  inputForEditing: InputComponent | undefined;
  constructor(text: string) {
    super({ tag: 'p', text: text, styles: ['message-text'] });
    this.text = text;
  }

  editingText() {
    this.setTextContent('');
    this.inputForEditing = new InputComponent({ value: this.text });
    this.addChildren([this.inputForEditing]);
  }

  returnEditedValue() {
    const input = returnNonNullableValue<InputComponent>(this.inputForEditing);
    return input.getNode().value;
  }

  stopEditing(value: string) {
    const input = returnNonNullableValue<InputComponent>(this.inputForEditing);
    input.removeThisNode();
    this.changeText(value);
  }

  changeText(value: string) {
    this.text = value;
    this.setTextContent(this.text);
    this.addStyles(['edited']);
  }
}
