import BaseElement, { register } from '@remicro.js/base-element';
import './index.less';
import createTemplate from './template';

export enum TYPES {
  TEXT = 'text',
  BASE = 'base',
  CARD = 'card',
  OPERATIONS = 'operations',
}

export interface IProps {
  type?: TYPES;
  title?: string;
  avatar?: string;
  cover?: string;
  desc?: string;
  content: string;
  operations?: string;
}

const props = ['type', 'title', 'avatar', 'cover', 'desc', 'content'];

export default class RmListItem extends BaseElement {
  static props = props;
  innerContent: string;

  constructor() {
    super();
    this.innerContent = this.innerHTML;
  }

  render() {
    const propsValList = this.getProps(props, this.getInnerContent);
    const template = createTemplate(propsValList);
    this.innerTemplate(template);
  }

  getInnerContent(data) {
    const type = this.type;

    switch (type) {
      case TYPES.TEXT:
        {
          if (this.innerContent) {
            data.content = this.innerContent;
          }
        }
        break;

      case TYPES.OPERATIONS:
      case TYPES.CARD:
        {
          const rootEle = document.createElement('div');
          rootEle.innerHTML = this.innerContent;

          const operationsSlot = this.getSlotTextContent.call(
            rootEle,
            'operations'
          );
          if (operationsSlot) {
            data.operations = operationsSlot || '';
          }
        }
        break;
    }

    return data;
  }

  /* props */
  get type() {
    let type = this.getAttribute('type');
    if (!(<any>Object).values(TYPES).includes(type)) {
      type = TYPES.TEXT;
    }
    return type;
  }

  set type(val: any) {
    this.setAttribute('type', val);
  }

  get title() {
    return this.getAttribute('title');
  }

  set title(val: any) {
    this.setAttribute('title', val);
  }

  get avatar() {
    return this.getAttribute('avatar');
  }

  set avatar(val: any) {
    this.setAttribute('avatar', val);
  }

  get cover() {
    return this.getAttribute('cover');
  }

  set cover(val: any) {
    this.setAttribute('cover', val);
  }

  get desc() {
    return this.getAttribute('desc');
  }

  set desc(val: any) {
    this.setAttribute('desc', val);
  }

  get content() {
    return this.getAttribute('content') || '';
  }

  set content(val: any) {
    this.setAttribute('content', val);
  }
}

export function defineListItem() {
  register('rm-list-item', RmListItem);
}
