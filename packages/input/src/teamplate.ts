import { createTeamplate } from '@remicro.js/base-element';

export default createTeamplate(function () {
  return `
    <input class="rm-input ${
      this.size
    }" ${this.disabled && 'disabled'} type="${this.type}" value="${this.value}" placeholder="${this.placeholder}"/>
    ${
      this.type === 'password'
        ? '<span class="input-changeType-icon" id="input-changeType">S</span>'
        : ''
    }
  `;
});
