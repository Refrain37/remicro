export function setGlobalEnv(key: string, val: any) {
  const win = window;
  win[key] = val;
}
