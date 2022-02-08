import { createTemplate } from '@remicro.js/base-element';

export default createTemplate(function () {
  const Icon = this.icon
    ? `<rm-icon class="rm-tag-icon mr5" name="${this.icon}" font-size="12px"></rm-icon>`
    : '';
  return `
    ${Icon}
    <span class="rm-tag-text">${this.text}</span>
  `;
});
