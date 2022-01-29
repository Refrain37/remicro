import { loadHtml } from './loader';

export const appCache = new Map<string, any>();

interface IConfig {
  name: string;
  url: string;
  container: HTMLElement;
}

export enum STATUS {
  CREATED = 'created',
  LOADIND = 'loading',
  MOUNTED = 'mounted',
  DESTROYED = 'destroyed',
}

interface IApp {
  name: string;
  url: string;
  container: HTMLElement;
  status: STATUS;
}

export function createApp(config: IConfig) {
  // initial
  const { name, url, container } = config;
  const app: IApp = {
    name,
    url,
    container,
    status: STATUS.LOADIND,
  };

  // load source
  loadHtml();
  return app;
}
