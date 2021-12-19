import BaseElement, { register } from '@remicro.js/base-element';
import './index.less';
import getTeamplate from './teamplate';

const props = ['content', 'type', 'href'];

export default class RmButton extends BaseElement {
  constructor() {
    super();
  }

  render() {
    const teamplate = getTeamplate.call(this);
    this.innerTeamplate(teamplate);
  }

  static get observedAttributes() {
    return props;
  }

  attributeChangedCallback() {
    this.render();
  }

  /* props */
  get content() {
    return this.getAttribute('content');
  }
  get type() {
    return this.getAttribute('type');
  }
  get href() {
    return this.getAttribute('href');
  }
}

register('rm-btn', RmButton);
