import BaseElement, { register } from '@remicro.js/base-element';

const keys = ['content'];

export default class RmButton extends BaseElement {
  constructor() {
    super();
    const style = `
      .rm-btn {
        background: red;
      }
    `;
    const html = `<button>${this.content}</button>`;
    const teamplate = this.createTeamplate(html, style);
    this.appendChildren(this, this.createEle('div', teamplate));
  }

  get content() {
    return this.getAttribute('content');
  }
}

register('rm-btn', RmButton);
