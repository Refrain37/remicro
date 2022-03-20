import BaseElement, { register } from '@remicro.js/base-element';
import './index.less';
import getTemplate from './template';
import { defineListItem } from './list-item';

const props = ['size', 'empty-text'];

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
  innerEle: any;

  constructor() {
    super();
    this.innerEle = getInnerEle(this);
    defineListItem();
  }

  render() {
    const template = getTemplate(this);
    this.innerTemplate(template);
  }

  /* props */
  get size() {
    return this.getAttribute('size') || 'default';
  }

  get emptyText() {
    return this.getAttribute('empty-text') || '当前列表暂无数据';
  }
}

export function defineList() {
  register('rm-list', RmList);
}

defineList();
