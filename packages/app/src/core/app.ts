import { loadHtml } from './loader';
import { formateHtmlStr, getStatic } from './handles';
import RMApp from '..';

export const appCache = new Map<string, any>();

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

export interface IApp {
  name: string;
  url: string;
  container: RMApp;
  status: STATUS;
}

export async function createApp(config: IConfig) {
  // initial
  const { name, url, container } = config;
  container.status = STATUS.LOADIND;
  const app: IApp = {
    name,
    url,
    container,
    status: STATUS.LOADIND,
  };

  /* load source */
  // load html
  const htmlStr = await loadHtml(url);
  const formatedHtmlStr = await formateHtmlStr(htmlStr);
  const appDom = document.createElement('div');
  appDom.innerHTML = formatedHtmlStr;

  // load static
  getStatic(appDom, app);
  return app;
}
