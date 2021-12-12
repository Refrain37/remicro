import BaseElement, { register } from '@remicro.js/base-element';
import './index.less';

const keys = ['content'];

export default class RmButton extends BaseElement {
  constructor() {
    super();
    const style = `
      .rm-btn {
        background: red;
      }
    `;
    const html = `<button class="rm-btn btn">${this.content}</button>`;
    const teamplate = this.createTeamplate(html, style);
    this.appendChildren(this, this.createEle('div', teamplate));
  }

  get content() {
    return this.getAttribute('content');
  }
}

register('rm-btn', RmButton);
