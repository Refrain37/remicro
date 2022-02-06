export * from './validator';
export * from './event';

export function createHashStr(len = 10) {
  const strs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
  let hashStr = '';

  for (let i = 0; i < len; i++) {
    hashStr += strs.charAt(Math.floor(Math.random() * strs.length));
  }
  return hashStr;
}

interface IConfig extends RequestInit {
  format?: string;
}

export async function dataFetch(
  url: string,
  config: IConfig = {}
): Promise<any> {
  // formate config
  let res = await fetch(url, config);
  if (config && config.format && res[config.format]) {
    res = await res[config.format]();
  }
  return res;
}
