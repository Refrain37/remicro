import BaseElement, { register } from '@remicro.js/base-element';
import './index.less';
import getTeamplate from './teamplate';

const props = ['value', 'placeholder', 'type', 'size', 'disabled'];

export default class RmInput extends BaseElement {
  static props = props;
  btn = null;

  constructor() {
    super();
  }

  render() {
    const teamplate = getTeamplate(this);
    this.innerTeamplate(teamplate);
  }

  /* props */
  get value() {
    return this.getAttribute('value') || '';
  }
  get placeholder() {
    return this.getAttribute('placeholder') || '请输入内容';
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
}

register('rm-input', RmInput);
