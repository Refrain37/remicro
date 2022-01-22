import { createTeamplate } from '@remicro.js/base-element';

export default createTeamplate(function () {
  return `
  <button class="btn ${
    this.type ? this.type + '-btn' : ''
  } ${this.disabled == 'true' ? 'btn-disabled' : ''}">
    ${this.loading == 'true' ? 'loading' : this.content}
  </button>
  `;
});
