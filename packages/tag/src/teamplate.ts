import { createTeamplate } from '@remicro.js/base-element';

export default createTeamplate(function () {
  const Icon = this.icon
    ? `<rm-icon class="rm-tag-icon mr5" name="${this.icon}" color="${this.color}" font-size="12px"></rm-icon>`
    : '';
  return `
    ${Icon}
    <span class="rm-tag-text" style="color:${this.color};">${this.text}</span>
  `;
});
