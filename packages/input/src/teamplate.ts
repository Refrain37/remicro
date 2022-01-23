import { createTeamplate } from '@remicro.js/base-element';

export default createTeamplate(function () {
  return `
    <div>
      <input type="text" value="${this.value}" placeholder="${this.placeholder}"/>
    </div>
  `;
});
