import BaseElement, { register } from '@remicro.js/base-element';
import './index.less';
import getTeamplate from './teamplate';

const props = [];

export default class RmInput extends BaseElement {
  static props = props;

  constructor() {
    super();
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

register('rm-input', RmInput);
