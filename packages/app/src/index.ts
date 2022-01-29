import BaseElement, { register } from '@remicro.js/base-element';
import './index.less';
import getTeamplate from './teamplate';
import { appCache, createApp, STATUS } from './core';

const props = ['name', 'url', 'open-shadow'];

export default class RMApp extends BaseElement {
  static props = props;
  status = STATUS.CREATED;
  app = null;

  constructor() {
    super();
  }

  check() {
    if (!this.name || !this.url) {
      throw TypeError('err');
    }
    return true;
  }

  /* life cycle */
  init() {
    console.log('init');
    if (this.check()) {
      const app = createApp({
        name: this.name,
        url: this.url,
        container: this,
      });
      this.app = app;
      appCache.set(this.name, app);
    }
  }

  mount() {
    console.log('mount');
  }

  destroy() {
    console.log('destroy');
    appCache.delete(this.name);
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
}

export function defineApp() {
  register('rm-app', RMApp);
}

defineApp();
