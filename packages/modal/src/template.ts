import { createTemplate } from '@remicro.js/base-element';

interface IProps {
  rmId: string;
  contentSlot: string;
}

export default createTemplate(function (props: IProps) {
  const { rmId, contentSlot = '' } = props;

  const mask = this.mask ? `<div class="mask" id="${rmId}-mask"></div>` : '';

  const close = this.closable
    ? `<div class="close" id="${rmId}-close"></div>`
    : '';

  const content = `<div class="content">${contentSlot}</div>`;

  const footer = !this.hideFooter
    ? `<div class="footer flex-row">
    <rm-btn type="primary" id="${rmId}-confirm" content="${this.confirmText}"></rm-btn>
    <rm-btn class="ml10" id="${rmId}-cancel" content="${this.cancelText}"></rm-btn>
  </div>`
    : '';

  const template = `
  <div class="modal-container flex-column" style="width:${this.width};">
    <div class="header flex-row align-items-center justify-content-space-between">
      <div class="title bold fontsize-16">${this.title}</div>
      ${close}
    </div>
    ${content}
    ${footer}
  </div>
  ${mask}
  `;

  return template;
});
