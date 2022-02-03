import { loadHtml } from './loader';
import { formateHtmlStr, getStatic } from './handles';
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
  status: STATUS;
  source: ISource;
  mount: () => void;
  unmount: () => void;
}

export class App implements IApp {
  name: string;
  url: string;
  container: RMApp;
  status: STATUS = STATUS.CREATED;
  source: ISource;

  constructor(config: IConfig) {
    const { name, url, container } = config;
    this.name = name;
    this.url = url;
    this.container = container;
    this.status = STATUS.LOADIND;
    this.source = {
      domSource: null,
      links: new Map<string, any>(),
      scripts: new Map<string, any>(),
    };
    this.load();
  }

  /* load source */
  async load() {
    // load html
    const htmlStr = await loadHtml(this.url);
    const formattedHtmlStr = await formateHtmlStr(htmlStr);
    const appDom = document.createElement('teamplate');
    appDom.innerHTML = formattedHtmlStr;
    this.source.domSource = appDom;
    // load static
    getStatic(this.source);
  }

  mount() {
    this.status = STATUS.MOUNTED;
    console.log('mount');
  }
  unmount() {
    this.status = STATUS.DESTROYED;
    console.log('unmount');
  }
}

export async function createApp(config: IConfig) {
  const app = new App(config);
  return app;
}
