import BaseElement, { register } from '@remicro.js/base-element';
import './index.less';
import getTeamplate from './teamplate';
import { defineIcons } from '@remicro.js/icons';
defineIcons();

const props = ['text', 'color', 'type', 'icon'];

export default class RmTag extends BaseElement {
  static props = props;

  constructor() {
    super();
  }

  render() {
    const teamplate = getTeamplate(this);
    this.innerTeamplate(teamplate);
  }

  /* props */
  get text() {
    return this.getAttribute('text') || '';
  }
  get color() {
    return this.getAttribute('color');
  }
  get type() {
    return this.getAttribute('type') || '';
  }
  get icon() {
    return this.getAttribute('icon') || '';
  }
}

export function defineTag() {
  register('rm-tag', RmTag);
}

defineTag();
