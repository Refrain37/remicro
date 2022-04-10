import BaseElement, { register } from '@remicro.js/base-element';
import { createEvent } from '@remicro.js/utils';
import './index.less';
import getTemplate from './template';
import { defineButton } from '@remicro.js/button';
defineButton();

const props = [
  'visible',
  'width',
  'mask',
  'closable',
  'title',
  'confirm-text',
  'cancel-text',
];

export default class RmModal extends BaseElement {
  static props = props;
  confirmBtn: HTMLElement;
  cancelBtn: HTMLElement;
  closeIcon: HTMLElement;
  Mask: HTMLElement;
  contentSlot: string;
  handleConfirm: (e) => void;
  handleCancel: (e) => void;

  constructor() {
    super();
    this.contentSlot = this.getSlotTextContent('content');
  }

  setVisible() {
    !this.visible && (this.style.display = 'none');
  }

  render() {
    const template = getTemplate(this, {
      rmId: this.rmId,
      contentSlot: this.contentSlot,
    });
    this.innerTemplate(template);
    this.setVisible();
    this.bindEvent();
  }

  destroy(): void {
    this.unbindEvent();
  }

  /* event */
  bindEvent() {
    const self = this;
    this.confirmBtn = document.getElementById(`${this.rmId}-confirm`);
    this.handleConfirm = e => {
      self.confirm(e);
    };
    this.confirmBtn?.addEventListener('click', this.handleConfirm);

    this.handleCancel = e => {
      self.cancel(e);
      self.closeModal();
    };
    this.cancelBtn = document.getElementById(`${this.rmId}-cancel`);
    this.closeIcon = document.getElementById(`${this.rmId}-close`);
    this.Mask = document.getElementById(`${this.rmId}-mask`);
    this.cancelBtn?.addEventListener('click', this.handleCancel);
    this.closeIcon?.addEventListener('click', this.handleCancel);
    this.Mask?.addEventListener('click', this.handleCancel);
  }
  unbindEvent() {
    this.confirmBtn?.removeEventListener('click', this.handleConfirm);
    this.cancelBtn?.removeEventListener('click', this.handleCancel);
    this.closeIcon?.removeEventListener('click', this.handleCancel);
    this.Mask?.removeEventListener('click', this.handleCancel);
  }

  confirm(e) {
    const closeModal = this.closeModal.bind(this);
    const event = createEvent('confirm', { closeModal });
    this.dispatchEvent(event);
  }

  cancel(e) {
    console.log('cancel', e);
  }

  closeModal() {
    const self = this;
    self.setAttribute('visible', 'false');
    self.setVisible();
  }

  /* props */
  get visible() {
    return this.getAttribute('visible') !== 'false';
  }
  get width() {
    return this.getAttribute('width') || '520px';
  }
  get mask() {
    return this.getAttribute('mask') || true;
  }
  get closable() {
    return this.getAttribute('closable') || true;
  }
  get title() {
    return this.getAttribute('title') || 'Title';
  }
  get confirmText() {
    return this.getAttribute('confirm-text') || '确认';
  }
  get cancelText() {
    return this.getAttribute('cancel-text') || '取消';
  }
}

export function defineModal() {
  register('rm-modal', RmModal);
}
