import BaseElement, { register } from '@remicro.js/base-element';
import './index.less';
import getTemplate from './template';

const props = ['visible', 'height', 'width'];

export default class RmModal extends BaseElement {
  static props = props;

  constructor() {
    super();
  }

  render() {
    const template = getTemplate(this);
    this.innerTemplate(template);
  }

  /* props */
}

export function defineModal() {
  register('rm-modal', RmModal);
}

defineModal();
