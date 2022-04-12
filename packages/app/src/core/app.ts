import { loadHtml, loadLinks, loadScripts } from './loader';
import {
  formateHtmlStr,
  getStatic,
  runScipts,
  createStyleEles,
  scopeStyleEle,
} from './handles/index';
import SandBox, { ISandBox } from './sandbox';
import RMApp from '..';
import { CommCenterForApp, eventCenter } from './comm/index';

export const appCache = new Map<string, IApp>();

interface IConfig {
  name: string;
  url: string;
  container: RMApp;
}

export enum STATUS {
  CREATED = 'created',
  LOADED = 'loaded',
  MOUNTED = 'mounted',
  DESTROYED = 'destroyed',
}

interface ISourceItem {
  code: string; // 代码内容
  isExternal?: boolean; // 是否外部导入
}

export interface ISource {
  domSource: HTMLElement | Element;
  links: Map<string, ISourceItem>;
  scripts: Map<string, ISourceItem>;
}

interface ILifeCycleHook {
  init: () => void;
  load: () => void;
  mount: () => void;
  destroy: () => void;
}

export interface IApp extends ILifeCycleHook {
  name: string;
  url: string;
  container: RMApp;
  mountCount: number;
  status: STATUS;
  source: ISource;
  commCenterForApp: CommCenterForApp;
  sandbox: ISandBox;
}

export class App implements IApp {
  name: string;
  url: string;
  container: RMApp;
  mountCount: number;
  status: STATUS;
  source: ISource;
  commCenterForApp: CommCenterForApp;
  sandbox: ISandBox;

  constructor(config: IConfig) {
    const { name, url, container } = config;
    this.name = name;
    this.url = url;
    this.container = container;
    this.mountCount = 0;
    this.source = {
      domSource: null,
      links: new Map<string, ISourceItem>(),
      scripts: new Map<string, ISourceItem>(),
    };
    this.init();
    this.load();
  }

  /* create sandbox and communication center */
  init() {
    this.commCenterForApp = new CommCenterForApp(eventCenter, this); // communication center
    this.sandbox = new SandBox(this.name, this.commCenterForApp);
    this.status = STATUS.CREATED;
  }

  /* load source */
  async load() {
    /* load start */
    // load html
    const htmlStr = await loadHtml(this.url);
    const formattedHtmlStr = await formateHtmlStr(htmlStr);
    const appDom = document.createElement('div');
    appDom.innerHTML = formattedHtmlStr;
    this.source.domSource = appDom;

    // load static
    getStatic(this.source, this.name);
    if (this.source.links.size) {
      await loadLinks(this);
      const styleEles = createStyleEles(this.source);
      // scope style
      styleEles.forEach(e => {
        scopeStyleEle(e, this.name);
      });
      this.status = STATUS.LOADED;
    }
    if (this.source.scripts.size) {
      await loadScripts(this);
      this.status = STATUS.LOADED;
    }
    /* load end */

    // mount
    // TODO:maybe remove
    if (this.status !== STATUS.MOUNTED && this.mountCount === 0) {
      this.mount();
    }
  }

  mount() {
    const cloneDomSource = this.source.domSource.cloneNode(true);
    const fragment = document.createDocumentFragment();
    Array.from(cloneDomSource.childNodes).forEach(node => {
      fragment.appendChild(node);
    });
    this.container.innerHTML = '';
    this.container.appendChild(fragment);

    // open sandbox
    this.sandbox?.start();
    // run scripts
    runScipts(this);

    this.mountCount += 1;
    this.status = STATUS.MOUNTED;
  }

  destroy() {
    this.sandbox?.stop();
    this.status = STATUS.DESTROYED;
  }
}

export async function createApp(config: IConfig) {
  const app = new App(config);
  return app;
}
