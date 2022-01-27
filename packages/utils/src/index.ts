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
