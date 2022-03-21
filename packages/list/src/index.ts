import BaseElement, { IChanged, register } from '@remicro.js/base-element';
import './index.less';
import getTemplate from './template';
import { defineListItem, TYPES } from './list-item';

const props = ['size', 'empty-text', 'bordered', 'type'];

export interface IInnerEle {
  header: string;
  body: string | any[];
  footer: string;
}

const getItems = (ele: HTMLElement) => {
  const items = [];
  ele.children &&
    Array.from(ele.children).forEach((e: HTMLElement) => {
      if (e.tagName.toLocaleLowerCase() === 'rm-list-item') {
        items.push(e.outerHTML);
      }
    });

  return items.join('\n');
};

const getInnerEle = (ele: HTMLElement) => {
  let onlyBody = true;
  const innerEle: IInnerEle = {
    header: '',
    body: [],
    footer: '',
  };

  ele.children &&
    Array.from(ele.children).forEach((e: HTMLElement) => {
      if (e.hasAttribute('slot')) {
        onlyBody = false;
        const val = e.getAttribute('slot');
        if (val === 'body') {
          e.innerHTML = getItems(e);
        }
        innerEle[val] = e.innerHTML;
      } else {
        if (e.tagName.toLocaleLowerCase() === 'rm-list-item') {
          (innerEle.body as any[]).push(e.outerHTML);
        }
      }
    });

  if (onlyBody) {
    innerEle.body = (innerEle.body as any[]).join('\n');
  }

  return innerEle;
};

export default class RmList extends BaseElement {
  static props = props;
  innerEle: IInnerEle;

  constructor() {
    super();
    this.innerEle = getInnerEle(this);
  }

  render(changed?: IChanged) {
    this.setStyles();
    if (changed.attrName === 'type') {
      this.setItemType();
    }

    const template = getTemplate(this);
    this.innerTemplate(template);
  }

  destroy(): void {
    const styleEle = document.getElementById(this.rmId);
    styleEle.remove();
  }

  setItemType() {
    const type = this.type;
    const body = document.createElement('div');
    body.innerHTML = this.innerEle.body as string;
    Array.from(body.children).forEach((e: HTMLElement) => {
      if (e.tagName.toLocaleLowerCase() === 'rm-list-item') {
        if (!e.hasAttribute('type')) {
          e.setAttribute('type', type);
        }
      }
    });

    this.innerEle.body = body.innerHTML;
  }

  setStyles() {
    const styleEle = document.getElementById(this.rmId);
    if (styleEle && styleEle.tagName.toLocaleLowerCase() === 'style') {
      return;
    }

    const bordered = this.bordered;
    if (bordered) {
      const styles = `
        #${this.rmId} rm-list-item {
          border-bottom: 1px solid var(--color-border);
        }
        #${this.rmId} rm-list-item:last-child {
          border-bottom: none;
        }
      `;
      const styleEle = document.createElement('style');
      styleEle.setAttribute('id', this.rmId);
      styleEle.innerHTML = styles;
      document.body.append(styleEle);
    }
  }

  /* props */
  get size() {
    return this.getAttribute('size') || 'default';
  }

  get type() {
    let type = this.getAttribute('type');
    if (!(<any>Object).values(TYPES).includes(type)) {
      type = TYPES.TEXT;
    }
    return type;
  }

  get emptyText() {
    return this.getAttribute('empty-text') || '当前列表暂无数据';
  }

  get bordered() {
    return this.getAttribute('bordered') !== 'false';
  }
}

export function defineList() {
  register('rm-list', RmList);
  defineListItem();
}

defineList();
