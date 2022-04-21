export * from './env';
export * from './app';

export function asyncCall(fn: any, ...args: any[]): void {
  Promise.resolve().then(fn.bind(null, ...args));
}
