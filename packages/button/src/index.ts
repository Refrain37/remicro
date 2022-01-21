import BaseElement, { register } from '@remicro.js/base-element';
import './index.less';
import getTeamplate from './teamplate';

const props = ['content', 'type', 'href'];

export default class RmButton extends BaseElement {
  static props = props;
  constructor() {
    super();
    this.addEventListener('click', () => {
      this.setAttribute('content', '321');
    });
  }

  render() {
    const teamplate = getTeamplate(this);
    this.innerTeamplate(teamplate);
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
