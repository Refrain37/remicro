export interface ISandBox {
  name: string;
  isActive: boolean; // 是否在运行
  appWindow: object; // 子应用的window
  appProxyWindow: object;
  injectedProps: Set<string | symbol>; // 代理的属性
  bindScope: (code: string) => string;
  start: () => void;
  stop: () => void;
}

export default class SandBox implements ISandBox {
  name: string;
  isActive: boolean;
  appWindow: object;
  appProxyWindow: object;
  injectedProps: Set<string | symbol>;

  constructor(name: string) {
    this.name = name;
    this.isActive = false;
    this.appProxyWindow = null;
    this.appWindow = {};
    this.injectedProps = new Set<string | symbol>();

    // set proxy
    this.setProxy();
  }

  setProxy() {
    const _self = this;
    this.appProxyWindow = new Proxy(this.appWindow, {
      get(target, prop) {
        if (Reflect.has(target, prop)) {
          return Reflect.get(target, prop);
        }

        const rawVal = Reflect.get(window, prop);

        if (typeof rawVal === 'function') {
          const valueStr = rawVal.toString();
          if (
            !/^function\s+[A-Z]/.test(valueStr) &&
            !/^class\s+/.test(valueStr)
          ) {
            return rawVal.bind(window);
          }
        }

        return rawVal;
      },
      set(target, prop, value) {
        if (_self.isActive === true) {
          Reflect.set(target, prop, value);
          _self.injectedProps.add(prop);
        }
        return true;
      },
      deleteProperty(target, prop) {
        // eslint-disable-next-line no-prototype-builtins
        if (target.hasOwnProperty(prop)) {
          return Reflect.deleteProperty(target, prop);
        }
        return true;
      },
    });
  }

  bindScope(code: string) {
    const win: any = window;
    win.proxyWindow = this.appProxyWindow;
    return `;(function(window, self){with(window){;${code}\n}}).call(window.proxyWindow, window.proxyWindow, window.proxyWindow);`;
  }

  start() {
    if (this.isActive === false) {
      this.isActive = true;
    }
  }

  stop() {
    if (this.isActive === true) {
      this.isActive = false;
      this.injectedProps.forEach(k => {
        Reflect.deleteProperty(this.appWindow, k);
      });
      this.injectedProps.clear();
    }
  }
}
