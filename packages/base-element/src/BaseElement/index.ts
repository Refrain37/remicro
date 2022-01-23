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
  static props = [];
  constructor() {
    super();
  }

  /* methods */
  appendChildren = methods.appendChildren;
  createTeamplate = methods.createTeamplate;
  createEle = methods.createEle;
  innerTeamplate = methods.innerTeamplate;

  /* origin life-cycle */
  connectedCallback() {
    this.init();
    this.render();
  }
  disconnectedCallback() {
    this.destroy();
  }
  adoptedCallback() {}
  attributeChangedCallback() {
    this.update();
    this.render();
  }

  static get observedAttributes() {
    return this.props;
  }

  /* life-cycle */
  init() {}
  render() {}
  update() {}
  destroy() {}
}
