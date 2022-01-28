import { createTeamplate } from '@remicro.js/base-element';

export default createTeamplate(function () {
  let styles = '';
  if (this.styles) {
    styles = `style="${this.styles}"`;
  }

  if (this.fontsize && this.color) {
    styles = `style="font-size:${this.fontsize};line-height: ${this.fontsize};color:${this.color};"`;
  } else if (this.fontsize) {
    styles = `style="font-size:${this.fontsize};line-height: ${this.fontsize};"`;
  } else if (this.color) {
    styles = `style="color:${this.color};"`;
  }
  return `
  <i
  ${styles}
  class="rm-iconfont rm-icon rm-icon-${
    this.name
  } ${this.className ? this.className : ''}"></i>
  `;
});
