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
  get type() {
    return this.getAttribute('type');
  }
  get size() {
    return this.getAttribute('size');
  }
  get disabled() {
    return this.getAttribute('disabled') !== null;
  }
  get href() {
    return this.getAttribute('href');
  }
  get loading() {
    return this.getAttribute('loading');
  }
}

export function defineButton() {
  register('rm-btn', RmButton);
}

defineButton();
