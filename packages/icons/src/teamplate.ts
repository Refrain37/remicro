import { createTeamplate } from '@remicro.js/base-element';

export default createTeamplate(function () {
  return `
  <i style="color:${
    this.color
  };"${this.styles ? 'style="' + this.styles + '"' : ''}class="rm-iconfont rm-icon rm-icon-${this.name} ${this.className}"></i>
  `;
});
