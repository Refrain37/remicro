import BaseElement, { IChanged, register } from '@remicro.js/base-element';
import {
  appCache,
  createApp,
  IApp,
  setGlobalEnv,
  eventCenter,
  overrideSetAttribute,
  CommCenterForBase,
} from './core';
import './index.less';

const props = ['name', 'url', 'open-shadow', 'is-cache', 'global-static'];

const commCenterForBase = new CommCenterForBase(eventCenter);
overrideSetAttribute(commCenterForBase);

export default class RMApp extends BaseElement {
  static props = props;
  app: IApp = null;

  constructor() {
    super();
    !this.globalStatic && this.setWebackEnv(); // set env while webpack and not use global static
  }

  /* methods */
  setWebackEnv() {
    let url = this.url;
    if (this.url[this.url.length - 1] !== '/') {
      url += '/';
    }
    setGlobalEnv('__RM_APP_ENV__', true);
    setGlobalEnv('__RM_APP_PUBLIC_PATH__', url); // auto-complete path while in webpack
  }

  // check props
  check() {
    if (!this.name || !this.url) {
      throw TypeError('err');
    }
    return true;
  }

  /* life cycle */
  async init() {
    if (this.check()) {
      const app = await createApp({
        name: this.name,
        url: this.url,
        container: this,
      });
      this.app = app;
      appCache.set(this.name, app);
    }
  }

  update(changed: IChanged): void {
    // console.log(changed);
  }

  destroy() {
    if (!this.isCache) {
      this.app.destroy();
      appCache.delete(this.name);
    }
  }

  /* props */
  get name() {
    return this.getAttribute('name');
  }
  set name(val) {
    this.setAttribute('name', val);
  }
  get url() {
    return this.getAttribute('url');
  }
  set url(val) {
    this.setAttribute('url', val);
  }
  get isOpenShadow() {
    return this.getAttribute('open-shadow') === 'true';
  }
  set isOpenShadow(val: any) {
    this.setAttribute('isOpenShadow', val);
  }
  get isCache() {
    return this.getAttribute('is-cache') === 'true';
  }
  set isCache(val: any) {
    this.setAttribute('isCache', val);
  }
  get globalStatic() {
    return this.getAttribute('global-static') !== null;
  }
  set globalStatic(val: any) {
    this.setAttribute('globalStatic', val);
  }
}

export function defineApp() {
  register('rm-app', RMApp);
}
