import { createTeamplate } from '@remicro.js/base-element';

export default createTeamplate(function (props) {
  const { id } = props;
  const clearIcon =
    this.showDel && this.type !== 'password'
      ? `<rm-icon class="input-clear" id="input-clear-${id}" name="cuowukongxin"></rm-icon>`
      : '';
  const ChangeType =
    this.type === 'password'
      ? `<rm-icon class="input-changeType" id="input-changeType-${id}" name="icon_yulan"></rm-icon>`
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
