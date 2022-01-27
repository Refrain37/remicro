import BaseElement, { register } from '@remicro.js/base-element';
import { createEvent } from '@remicro.js/utils';
import './index.less';
import getTeamplate from './teamplate';
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
    const teamplate = getTeamplate(this, { id: this.rmId });
    this.Input = this.innerTeamplate(teamplate);
    this.Input.addEventListener('focusout', (e: FocusEvent) => {
      this.handleFocusout(e);
    });
    // this.Input.addEventListener('keyup', e => {
    //   this.handleChange(e);
    // });
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
        const focusoutEvent = createEvent('focusout');
        Input.dispatchEvent(focusoutEvent);
      });
    }
  }

  // 切换input类型
  changeInputType() {
    const del = document.getElementById('input-changeType');
    if (del && this.type === 'password') {
      del.addEventListener('click', () => {
        const inputType = this.Input.getAttribute('type');
        this.Input.setAttribute(
          'type',
          inputType === 'text' ? 'password' : 'text'
        );
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
    console.log(value.length);
    if (value.length > 0) {
      // this.Clear.style.display = ''
    } else {
      console.log('first');
      this.Clear.style.display = 'none';
    }
  }

  handleFocusout(e) {
    console.log('focusout');
    const disabled = this.disabled;
    if (disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    const {
      target: { value },
    } = e;
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

register('rm-input', RmInput);
