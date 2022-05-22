import BaseElement, { IChanged, register } from '@remicro.js/base-element';
import {
  appCache,
  createApp,
  IApp,
  setGlobalEnv,
  eventCenter,
  overrideSetAttribute,
  CommCenterForBase,
  setCommCenter,
} from './core';
import { getRawPrototypeMethods } from './core/global/RawPrototypeMethods';
import './index.less';

const props = ['name', 'url', 'open-shadow', 'is-cache', 'global-static'];

export default class RMApp extends BaseElement {
  // static props = props;
  app: IApp = null;
  private envSet = false;

  constructor() {
    super();
  }

  /* methods */
  setWebpackEnv() {
    if (this.envSet) {
      return;
    }
    let url = this.url;
    if (!url) {
      return;
    }
    if (this.url[this.url.length - 1] !== '/') {
      url += '/';
    }
    setGlobalEnv('__RM_APP_ENV__', true);
    setGlobalEnv('__RM_APP_PUBLIC_PATH__', url); // auto-complete path while in webpack
    this.envSet = true;
  }

  // check props
  check() {
    if (this.name && this.url && !this.app) {
      return true;
    }

    return false;
  }

  /* life cycle */
  async init() {
    this.setWebpackEnv(); // set env while webpack and not use global static
    if (this.check()) {
      if (appCache.has(this.name)) {
        return appCache.get(this.name);
      }

      // create app
      const app = await createApp({
        name: this.name,
        url: this.url,
        container: this,
      });
      this.app = app;
      appCache.set(this.name, app);
    }
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
    return this.getAttribute('url') || '';
  }
  set url(val) {
    this.setAttribute('url', val);
  }
  get isOpenShadow() {
    return this.getAttribute('open-shadow') === 'true';
  }
  set isOpenShadow(val: any) {
    this.setAttribute('open-shadow', val);
  }
  get isCache() {
    return this.getAttribute('is-cache') === 'true';
  }
  set isCache(val: any) {
    this.setAttribute('is-cache', val);
  }
  get globalStatic() {
    return this.getAttribute('global-static') !== null;
  }
  set globalStatic(val: any) {
    this.setAttribute('global-static', val);
  }
}

export async function defineApp() {
  const commCenterForBase = new CommCenterForBase(eventCenter);
  getRawPrototypeMethods();
  await setCommCenter(commCenterForBase);
  overrideSetAttribute();
  register('rm-app', RMApp);
}

defineApp();
