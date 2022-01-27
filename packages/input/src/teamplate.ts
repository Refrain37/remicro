import { createTeamplate } from '@remicro.js/base-element';

export default createTeamplate(function (props) {
  const { id } = props;
  const clearIcon = this.showDel
    ? `<rm-icon class="input-clear" id="input-clear-${id}" name="cuowukongxin"></rm-icon>`
    : '';
  const ChangeType =
    this.type === 'password'
      ? '<span class="input-changeType-icon" id="input-changeType">S</span>'
      : '';
  const styles =
    this.type === 'password' || this.showDel
      ? 'style="padding-right:36px;"'
      : '';
  return `
    <input ${styles} class="rm-input ${this.size}" ${this.disabled ? 'disabled' : ''} type="${this.type}" value="${this.value}" placeholder="${this.placeholder}"/>
    ${ChangeType}
    ${clearIcon}
  `;
});
