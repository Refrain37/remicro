/* eslint-disable @typescript-eslint/no-empty-function */
import { methods, IMethods } from '../methods/index';
import { createHashStr } from '@remicro.js/utils';
import { IChanged } from '../shaped';

interface IOriginLifeCycle {
  connectedCallback?: () => void;
  disconnectedCallback?: () => void;
  attributeChangedCallback?: (
    attrName: string,
    oldVal: any,
    newVal: any
  ) => void;
  adoptedCallback?: () => void;
}

interface ILifeCycle {
  init?: () => any;
  render?: () => any;
  update?: (changed?: IChanged) => any;
  destroy?: () => any;
}

export default class BaseElement
  extends HTMLElement
  implements ILifeCycle, IMethods, IOriginLifeCycle
{
  static props = [];
  rmId = createHashStr();
  constructor() {
    super();
  }

  /* methods */
  appendChildren = methods.appendChildren;
  createTemplate = methods.createTemplate;
  createEle = methods.createEle;
  innerTemplate = methods.innerTemplate;
  getSlotTextContent = methods.getSlotTextContent;

  /* origin life-cycle */
  connectedCallback() {
    this.init();
    this.render();
  }
  disconnectedCallback() {
    this.destroy();
  }
  adoptedCallback() {}
  attributeChangedCallback(...args) {
    const changed: IChanged = {
      attrName: args[0],
      oldVal: args[1],
      newVal: args[2],
    };
    this.update(changed);
    this.render();
  }

  static get observedAttributes() {
    return this.props;
  }

  /* life-cycle */
  init() {}
  render() {}
  update(changed: IChanged) {}
  destroy() {}
}
