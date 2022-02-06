import { loadHtml, loadLinks, loadScripts } from './loader';
import { formateHtmlStr, getStatic, runScipts } from './handles';
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
    this.load();
  }

  /* load source */
  async load() {
    // load start
    // load html
    const htmlStr = await loadHtml(this.url);
    const formattedHtmlStr = await formateHtmlStr(htmlStr);
    const appDom = document.createElement('teamplate');
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

    // run scripts
    runScipts(this.source);
  }
  destroy() {
    this.status = STATUS.DESTROYED;
    console.log('unmount');
  }
}

export async function createApp(config: IConfig) {
  const app = new App(config);
  return app;
}
