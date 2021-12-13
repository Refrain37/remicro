import BaseElement, { register } from '@remicro.js/base-element';
import './index.less';

const keys = ['content'];

export default class RmButton extends BaseElement {
  constructor() {
    super();
    const teamplate = `<button class="btn">${this.content}</button>`;
    this.innerTeamplate(this, teamplate);
  }

  get content() {
    return this.getAttribute('content');
  }
}

register('rm-btn', RmButton);
