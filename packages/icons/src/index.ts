import BaseElement, { register } from '@remicro.js/base-element';
import './index.less';
import getTeamplate from './teamplate';

const props = ['name', 'className', 'styles', 'color', 'font-size'];

export default class RmIcon extends BaseElement {
  static props = props;

  constructor() {
    super();
    this.appendLink();
  }

  appendLink() {
    if (document.getElementById('rm-icon-link')) {
      return;
    }
    const linkEle = document.createElement('link');
    linkEle.setAttribute('id', 'rm-icon-link');
    linkEle.setAttribute('rel', 'stylesheet');
    linkEle.setAttribute(
      'href',
      '//at.alicdn.com/t/font_3160431_5xbrxp1pzw6.css'
    );
    document.head.append(linkEle);
  }

  render() {
    const teamplate = getTeamplate(this);
    this.innerTeamplate(teamplate);
  }

  /* props */
  get name() {
    return this.getAttribute('name') || '';
  }
  get className() {
    return this.getAttribute('class-name');
  }
  get styles() {
    return this.getAttribute('styles');
  }
  get color() {
    return this.getAttribute('color');
  }
  get fontsize() {
    return this.getAttribute('font-size');
  }
}

export function defineIcons() {
  register('rm-icon', RmIcon);
}

defineIcons();
