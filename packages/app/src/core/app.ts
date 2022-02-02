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

interface ISource {
  links: Map<string, any>;
  scripts: Map<string, any>;
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
      links: new Map<string, any>(),
      scripts: new Map<string, any>(),
    };
    this.load();
  }

  /* load source */
  async load() {
    // load html
    const htmlStr = await loadHtml(this.url);
    const formatedHtmlStr = await formateHtmlStr(htmlStr);
    const appDom = document.createElement('teamplate');
    appDom.innerHTML = formatedHtmlStr;
    // load static
    getStatic(appDom, this);
  }

  mount() {
    console.log('mount');
  }
  unmount() {
    console.log('unmount');
  }
}

export async function createApp(config: IConfig) {
  const app = new App(config);
  return app;
}
