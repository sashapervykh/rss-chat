import BaseComponent from '../../../../../../../shared/base-component/base-component';

export const MessageTextarea = () => {
  const component = new BaseComponent({
    tag: 'textarea',
    styles: ['message-textarea'],
  });
  component.getNode().setAttribute('rows', '2');
  return component;
};
