import { createTeamplate } from '@remicro.js/base-element';

export default createTeamplate(function () {
  const content = `${
    this.loading == 'true'
      ? '<rm-loading class="btn-loading" color="#fff"></rm-loading>'
      : this.content
  }`;
  return `
  <button class="rm-btn ${
    this.type ? this.type + '-btn' : ''
  } ${this.disabled && 'btn-disabled'}
    ${this.loading == 'true' && 'btn-loading'}
    ${this.size}">
    ${content}
  </button>
  `;
});
