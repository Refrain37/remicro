import { createTeamplate } from '@remicro.js/base-element';

export default createTeamplate(function () {
  return `
    <input class="rm-input" ${
      this.disabled && 'disabled'
    } type="text" ${this.value && 'value="${this.value}"'} placeholder="${this.placeholder}"/>
  `;
});
