import BaseElement, { register } from '@remicro.js/base-element';
import './index.less';
import getTemplate from './template';

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
    const template = getTemplate(this);
    this.innerTemplate(template);
  }

  /* props */
  get name() {
    return this.getAttribute('name') || '';
  }
  set name(val: any) {
    this.setAttribute('name', val);
  }
  get className() {
    return this.getAttribute('class-name');
  }
  set className(val: any) {
    this.setAttribute('class-name', val);
  }
  get styles() {
    return this.getAttribute('styles');
  }
  set styles(val: any) {
    this.setAttribute('style', val);
  }
  get color() {
    return this.getAttribute('color');
  }
  set color(val: any) {
    this.setAttribute('color', val);
  }
  get fontsize() {
    return this.getAttribute('font-size');
  }
  set fontsize(val: any) {
    this.setAttribute('font-size', val);
  }
}

export function defineIcons() {
  register('rm-icon', RmIcon);
}
