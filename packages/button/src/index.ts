import BaseElement, { register } from '@remicro.js/base-element';
import './index.less';
import getTeamplate from './teamplate';

const props = ['content', 'type', 'href', 'loading', 'disabled'];

export default class RmButton extends BaseElement {
  static props = props;
  constructor() {
    super();
    this.addEventListener('click', () => {
      this.handleClick();
    });
  }

  render() {
    const teamplate = getTeamplate(this);
    this.innerTeamplate(teamplate);
  }

  /* event */
  handleClick() {
    console.log('test');
    const href = this.href;
    if (href) {
      window.open(`https://${href}`, '_blank');
    }
  }

  /* props */
  get content() {
    return this.getAttribute('content');
  }
  get type() {
    return this.getAttribute('type');
  }
  get disabled() {
    return this.getAttribute('disabled');
  }
  get href() {
    return this.getAttribute('href');
  }
  get loading() {
    return this.getAttribute('loading');
  }
}

register('rm-btn', RmButton);
