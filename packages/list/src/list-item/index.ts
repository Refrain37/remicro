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
  desc?: string;
  content: string;
  operations?: string;
}

const props = ['type', 'title', 'avatar', 'desc', 'content'];

export default class RmListItem extends BaseElement {
  static props = props;
  innerContent: string;

  constructor() {
    super();
    this.innerContent = this.innerHTML;
  }

  render() {
    const propsValList = this.getProps(props);
    // TODO:add callback
    const data = this.getInnerContent();
    Object.assign(propsValList, data);

    const template = createTemplate(propsValList);
    this.innerTemplate(template);
  }

  getInnerContent() {
    const type = this.type;
    const data: any = {};

    switch (type) {
      case TYPES.TEXT:
        {
          if (this.innerContent) {
            data.content = this.innerContent;
          }
        }
        break;

      case TYPES.OPERATIONS:
        {
          const rootEle = document.createElement('div');
          rootEle.innerHTML = this.innerContent;

          const operationsSlot = this.getSlotTextContent.call(
            rootEle,
            'operations'
          );
          if (operationsSlot) {
            data.operations = operationsSlot;
          }
        }
        break;
    }

    return data;
  }

  /* props */
  get type() {
    return this.getAttribute('type') || TYPES.TEXT;
  }

  get title() {
    return this.getAttribute('title');
  }

  get avatar() {
    return this.getAttribute('avatar');
  }

  get desc() {
    return this.getAttribute('desc');
  }

  get content() {
    return this.getAttribute('content') || '';
  }
}

export function defineListItem() {
  register('rm-list-item', RmListItem);
}
