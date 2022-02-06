import BaseElement, { register } from '@remicro.js/base-element';
import './index.less';
import { appCache, createApp, IApp, setGlobalEnv } from './core';

const props = ['name', 'url', 'open-shadow', 'is-cache', 'global-static'];

export default class RMApp extends BaseElement {
  static props = props;
  app: IApp = null;

  constructor() {
    super();
    !this.globalStatic && this.setWebackEnv();
  }

  /* methods */
  setWebackEnv() {
    let url = this.url;
    if (this.url[this.url.length - 1] !== '/') {
      url += '/';
    }
    setGlobalEnv('__RM_APP_ENV__', true);
    setGlobalEnv('__RM_APP_PUBLIC_PATH__', url); // 静态资源路径运行时补齐
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
      // 创建容器，拉取资源
      const app = await createApp({
        name: this.name,
        url: this.url,
        container: this,
      });
      this.app = app;
      appCache.set(this.name, app);
    }
  }

  mount() {
    this.app.mount();
    console.log('mount');
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
  get url() {
    return this.getAttribute('url');
  }
  get isOpenShadow() {
    return this.getAttribute('open-shadow') === 'true';
  }
  get isCache() {
    return this.getAttribute('is-cache') === 'true';
  }
  get globalStatic() {
    return this.getAttribute('global-static') !== null;
  }
}

export function defineApp() {
  register('rm-app', RMApp);
}

defineApp();
