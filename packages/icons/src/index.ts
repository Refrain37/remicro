import BaseElement, { register } from '@remicro.js/base-element';
import './index.less';
import getTeamplate from './teamplate';

const props = [];

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
  get type() {
    return this.getAttribute('type') || 'text';
  }
  get size() {
    return this.getAttribute('size');
  }
}

register('rm-icon', RmIcon);
