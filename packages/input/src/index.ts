import BaseElement, { register } from '@remicro.js/base-element';
import { createEvent } from '@remicro.js/utils';
import './index.less';
import getTemplate from './template';
import { defineIcons } from '@remicro.js/icons';
defineIcons();

const props = ['value', 'placeholder', 'type', 'size', 'disabled', 'show-del'];
const VALCHANGED = 'valChanged';

export default class RmInput extends BaseElement {
  static props = props;
  Input: HTMLElement = null;
  Clear: HTMLElement = null;

  constructor() {
    super();
  }

  render() {
    const template = getTemplate(this, { id: this.rmId });
    this.Input = this.innerTemplate(template);
    this.Input.addEventListener('keydown', e => {
      this.handleChange(e);
    });
    this.changeInputType();
    this.bindClear();
  }

  /* methods */
  bindClear() {
    if (!this.showDel) {
      return;
    }
    const Clear = document.getElementById('input-clear-' + this.rmId);
    if (Clear) {
      this.Clear = Clear;
      Clear.addEventListener('click', () => {
        const Input: any = this.Input;
        Input.setAttribute('value', '');
        Input.value = '';
        const focusoutEvent = createEvent('keydown');
        Input.dispatchEvent(focusoutEvent);
      });
    }
  }

  // 切换input类型
  changeInputType() {
    const del = document.getElementById('input-changeType-' + this.rmId);
    if (del && this.type === 'password') {
      del.addEventListener('click', () => {
        const inputType = this.Input.getAttribute('type');
        this.Input.setAttribute(
          'type',
          inputType === 'text' ? 'password' : 'text'
        );
        del.setAttribute('name', inputType === 'text' ? 'icon_yulan' : 'miwen');
      });
    }
  }

  /* event */
  handleChange(e) {
    const disabled = this.disabled;
    if (disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    const {
      target: { value },
    } = e;

    // style change
    if (value.length > 0) {
      this.Clear.style.display = 'block';
    } else {
      this.Clear.style.display = 'none';
    }

    // trigger
    const event = createEvent(VALCHANGED, { value });
    this.dispatchEvent(event);
  }

  /* props */
  get value() {
    return this.getAttribute('value') || '';
  }
  get placeholder() {
    return this.getAttribute('placeholder') || '请输入内容';
  }
  get type() {
    return this.getAttribute('type') || 'text';
  }
  get size() {
    return this.getAttribute('size');
  }
  get disabled() {
    return this.getAttribute('disabled') !== null;
  }
  get showDel() {
    return this.getAttribute('show-del') !== null;
  }
}

export function defineInput() {
  register('rm-input', RmInput);
}
