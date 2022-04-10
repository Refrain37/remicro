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
  get text() {
    return this.getAttribute('text') || '';
  }
  get fontsize() {
    return this.getAttribute('font-size') || '16';
  }
  get mask() {
    return this.getAttribute('mask') !== null;
  }
}

export function defineLoading() {
  register('rm-loading', RmLoading);
}
