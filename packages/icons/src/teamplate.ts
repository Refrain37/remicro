import { createTeamplate } from '@remicro.js/base-element';

export default createTeamplate(function () {
  return `
  <i
  ${this.fontsize ? 'style=font-size:' + this.fontsize + '' : ''} 
  ${this.color ? 'style=color:"' + this.color + '"' : ''}
  ${this.styles ? 'style="' + this.styles + '"' : ''}
  class="rm-iconfont rm-icon rm-icon-${
    this.name
  } ${this.className ? this.className : ''}"></i>
  `;
});
