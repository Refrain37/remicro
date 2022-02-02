import BaseElement, { register } from '@remicro.js/base-element';
import './index.less';
import { appCache, createApp, IApp } from './core';

const props = ['name', 'url', 'open-shadow', 'is-cache'];

export default class RMApp extends BaseElement {
  static props = props;
  app: IApp = null;

  constructor() {
    super();
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
      this.app.unmount();
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
}

export function defineApp() {
  register('rm-app', RMApp);
}

defineApp();
