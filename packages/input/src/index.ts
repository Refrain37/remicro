import BaseElement, { register } from '@remicro.js/base-element';
import { createEvent } from '@remicro.js/utils';
import './index.less';
import getTeamplate from './teamplate';

const props = ['value', 'placeholder', 'type', 'size', 'disabled', 'show-del'];
const VALCHANGED = 'valChanged';

export default class RmInput extends BaseElement {
  static props = props;
  input = null;

  constructor() {
    super();
  }

  render() {
    const teamplate = getTeamplate(this);
    this.input = this.innerTeamplate(teamplate);
    this.input.addEventListener('focusout', (e: FocusEvent) => {
      this.handleChange(e);
    });
    this.changeInputType();
  }

  /* methods */
  changeInputType() {
    const del = document.getElementById('input-changeType');
    if (del && this.type === 'password') {
      del.addEventListener('click', () => {
        const inputType = this.input.getAttribute('type');
        this.input.setAttribute(
          'type',
          inputType === 'text' ? 'password' : 'text'
        );
      });
    }
  }

  /* event */
  handleChange(e: FocusEvent) {
    const disabled = this.disabled;
    if (disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    const { target } = e;
    const { value } = target as any;
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
