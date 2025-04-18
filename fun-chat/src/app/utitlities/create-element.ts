export const createElement = <Tag extends keyof HTMLElementTagNameMap>(
  tag: Tag,
) => {
  const element = document.createElement(tag);
  return element;
};
