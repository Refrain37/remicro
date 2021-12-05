/* eslint-disable @typescript-eslint/no-empty-function */
import { methods, IMethods } from '../utils/index';

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
  update?: () => any;
  destroy?: () => any;
}

export default class BaseElement
  extends HTMLElement
  implements ILifeCycle, IMethods, IOriginLifeCycle
{
  constructor() {
    super();
  }

  /* methods */
  appendChildren = methods.appendChildren;
  createTeamplate = methods.createTeamplate;
  createEle = methods.createEle;

  /* origin life-cycle */
  connectedCallback() {}
  disconnectedCallback() {}
  attributeChangedCallback() {}
  adoptedCallback() {}

  /* life-cycle */
  init() {}
  render() {}
  update() {}
  destroy() {}
}
