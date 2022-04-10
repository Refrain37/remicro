import BaseElement, { register } from '@remicro.js/base-element';
import './index.less';
import getTemplate from './template';
import { defineIcons } from '@remicro.js/icons';
defineIcons();

const props = ['color', 'text', 'font-size', 'mask'];
const MASK = 'rm-loading-mask';

export default class RmLoading extends BaseElement {
  static props = props;

  constructor() {
    super();
  }

  createMask() {
    if (this.mask && !document.getElementById(MASK)) {
      const mask = this.createEle('div', '');
      mask.setAttribute('id', MASK);
      mask.setAttribute('class', MASK);
      document.body.appendChild(mask);
    }
  }

  render() {
    const template = getTemplate(this);
    this.innerTemplate(template);
    this.createMask();
  }

  /* props */
  get color() {
    return this.getAttribute('color');
  }

  set color(val: any) {
    this.setAttribute('color', val);
  }

  get text() {
    return this.getAttribute('text') || '';
  }

  set text(val: any) {
    this.setAttribute('text', val);
  }
  get fontsize() {
    return this.getAttribute('font-size') || '16';
  }

  set fontsize(val: any) {
    this.setAttribute('fontsize', val);
  }
  get mask() {
    return this.getAttribute('mask') !== null;
  }

  set mask(val: any) {
    this.setAttribute('mask', val);
  }
}

export function defineLoading() {
  register('rm-loading', RmLoading);
}
