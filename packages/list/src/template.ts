import { createTemplate } from '@remicro.js/base-element';
import { IInnerEle } from '.';

export default createTemplate(function () {
  const innerEle: IInnerEle = this.innerEle;

  const header = innerEle.header
    ? `<div class="list-header">${innerEle.header}</div>`
    : '';

  const footer = innerEle.footer
    ? `<div class="list-footer">${innerEle.footer}</div>`
    : '';

  let body = innerEle.body as string;
  if (header || footer) {
    body = `
      <div class="list-body flex-column align-items-center">
        ${innerEle.body as string}
      </div>  
    `;
  }

  const template = `
    <div class="list-container flex-column align-items-center">
      ${header}
      ${body}
      ${footer}
    </div>
  `;

  return template;
});
