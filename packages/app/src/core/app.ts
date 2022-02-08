import { loadHtml, loadLinks, loadScripts } from './loader';
import { formateHtmlStr, getStatic, runScipts } from './handles/index';
import SandBox, { ISandBox } from './sandbox';
import RMApp from '..';

export const appCache = new Map<string, IApp>();

interface IConfig {
  name: string;
  url: string;
  container: RMApp;
}

export enum STATUS {
  CREATED = 'created',
  LOADIND = 'loading',
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

export interface IApp {
  name: string;
  url: string;
  container: RMApp;
  mountCount: number;
  status: STATUS;
  source: ISource;
  sandbox: ISandBox;
  mount: () => void;
  destroy: () => void;
}

export class App implements IApp {
  name: string;
  url: string;
  container: RMApp;
  mountCount: number;
  status: STATUS = STATUS.CREATED;
  source: ISource;
  sandbox: ISandBox;

  constructor(config: IConfig) {
    const { name, url, container } = config;
    this.name = name;
    this.url = url;
    this.container = container;
    this.mountCount = 0;
    this.status = STATUS.LOADIND;
    this.source = {
      domSource: null,
      links: new Map<string, ISourceItem>(),
      scripts: new Map<string, ISourceItem>(),
    };
    this.sandbox = new SandBox(this.name);
    this.load();
  }

  /* load source */
  async load() {
    // load start
    // load html
    const htmlStr = await loadHtml(this.url);
    const formattedHtmlStr = await formateHtmlStr(htmlStr);
    const appDom = document.createElement('div');
    appDom.innerHTML = formattedHtmlStr;
    this.source.domSource = appDom;
    // load static
    getStatic(this.source);
    if (this.source.links.size) {
      await loadLinks(this);
      // TODO:添加样式到head
    }
    if (this.source.scripts.size) {
      await loadScripts(this);
    }

    // load end
    // TODO:maybe remove
    if (this.status !== STATUS.MOUNTED && this.mountCount === 0) {
      this.mount();
    }
  }

  mount() {
    this.mountCount += 1;
    this.status = STATUS.MOUNTED;
    const cloneDomSource = this.source.domSource.cloneNode(true);
    const fragment = document.createDocumentFragment();
    Array.from(cloneDomSource.childNodes).forEach(node => {
      fragment.appendChild(node);
    });
    this.container.appendChild(fragment);

    // open sandbox
    this.sandbox?.start();
    // run scripts
    runScipts(this);
  }
  destroy() {
    this.sandbox?.stop();
    this.status = STATUS.DESTROYED;
    console.log('unmount');
  }
}

export async function createApp(config: IConfig) {
  const app = new App(config);
  return app;
}
