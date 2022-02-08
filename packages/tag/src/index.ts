import BaseElement, { register } from '@remicro.js/base-element';
import './index.less';
import getTemplate from './template';
import { defineIcons } from '@remicro.js/icons';
defineIcons();

const props = ['text', 'color', 'type', 'icon'];

enum TYPES {
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
  PROCESSING = 'processing',
}
interface ITypeItem {
  type: TYPES;
  color: string;
}
const typeMap: ITypeItem[] = [
  {
    type: TYPES.SUCCESS,
    color: '#52cc15',
  },
  {
    type: TYPES.WARNING,
    color: '#faab0c',
  },
  {
    type: TYPES.ERROR,
    color: 'red',
  },
  {
    type: TYPES.PROCESSING,
    color: 'blue',
  },
];
export default class RmTag extends BaseElement {
  static props = props;

  constructor() {
    super();
  }

  setColor() {
    const type = this.type;
    let color = this.color || '';
    if (type) {
      color = typeMap.filter((t: ITypeItem) => {
        if (type === t.type) {
          return t;
        }
      })[0].color;
    }
    if (color) {
      this.style.backgroundColor = color;
      this.style.color = '#fff';
    }
  }

  render() {
    const template = getTemplate(this);
    this.innerTemplate(template);
    this.setColor();
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
