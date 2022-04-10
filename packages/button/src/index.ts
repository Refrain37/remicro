import BaseElement, { register } from '@remicro.js/base-element';
import './index.less';
import getTemplate from './template';
import { defineLoading } from '@remicro.js/loading';
defineLoading();

const props = ['content', 'type', 'href', 'size', 'loading', 'disabled'];
export default class RmButton extends BaseElement {
  static props = props;
  btn = null;

  constructor() {
    super();
  }

  render() {
    const template = getTemplate(this);
    this.btn = this.innerTemplate(template);
    this.btn.addEventListener('click', e => {
      this.handleClick(e);
    });
  }

  /* event */
  handleClick(e) {
    const disabled = this.disabled;
    if (disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    const href = this.href;
    const type = this.type;
    if (href && type === 'link') {
      window.open(`https://${href}`, '_blank');
    }
  }

  /* props */
  get content() {
    return this.getAttribute('content') || 'Button';
  }
  set content(val) {
    this.setAttribute('content', val);
  }
  get type() {
    return this.getAttribute('type');
  }
  set type(val) {
    this.setAttribute('type', val);
  }
  get size() {
    return this.getAttribute('size');
  }
  set size(val) {
    this.setAttribute('size', val);
  }
  get disabled() {
    return this.getAttribute('disabled') !== null;
  }
  set disabled(val: any) {
    this.setAttribute('disabled', val);
  }
  get href() {
    return this.getAttribute('href');
  }
  set href(val: any) {
    this.setAttribute('href', val);
  }
  get loading() {
    return this.getAttribute('loading');
  }
  set loading(val: any) {
    this.setAttribute('loading', val);
  }
}

export function defineButton() {
  register('rm-btn', RmButton);
}
