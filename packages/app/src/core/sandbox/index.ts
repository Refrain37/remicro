import { CommCenterForApp } from '..';
import { overridePrototype, releasePrototype } from './override';
import { proxyWindowEvent } from './windowEvent';

/**
 * 沙箱
 * 核心功能在于修改js的作用域，以及重写window对象
 * 修改js的作用域：将子应用的window指向代理后的window对象，来进行window对象的隔离
 * 重写window对象：主要在事件相关的函数上进行重写
 */

interface IAppWindow {
  commCenter: CommCenterForApp;
}
export interface ISandBox {
  name: string;
  isActive: boolean; // 是否在运行
  appWindow: IAppWindow; // 子应用的window
  appProxyWindow: object; // 经过代理后的子应用的window
  injectedProps: Set<string | symbol>; // 代理的属性
  bindScope: (code: string) => string; // 修改js作用域
  start: () => void;
  stop: () => void;
  clearEventCache: () => void; // 清除事件代理
}

export default class SandBox implements ISandBox {
  static activeCount = 0;
  name: string;
  isActive: boolean;
  appWindow: IAppWindow;
  appProxyWindow: object;
  injectedProps: Set<string | symbol>;
  clearEventCache: () => void;

  constructor(name: string, commCenterForApp: CommCenterForApp) {
    this.name = name;
    this.isActive = false;
    this.appWindow = {
      commCenter: commCenterForApp,
    };
    this.appProxyWindow = null;
    this.injectedProps = new Set<string | symbol>();
    // set proxy
    this.setProxy();
  }

  private setProxy() {
    const _self = this;
    // proxy window event-func
    this.clearEventCache = proxyWindowEvent(this.appWindow);

    // proxy whole window
    this.appProxyWindow = new Proxy(this.appWindow, {
      get(target, prop) {
        // 首先从代理对象获取
        if (Reflect.has(target, prop)) {
          return Reflect.get(target, prop);
        }

        // 在全局对象重获取
        const rawVal = Reflect.get(window, prop);

        // 处理函数
        if (typeof rawVal === 'function') {
          const valueStr = rawVal.toString();
          // exclude constructor
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

  /**
   * 绑定js作用域
   *
   * @param {string} code
   * @return {*}
   * @memberof SandBox
   */
  bindScope(code: string) {
    const win: any = window;
    win.proxyWindow = this.appProxyWindow;
    // change scope to proxy-window
    return `
    ;(function(proxyWindow){
      with(proxyWindow){
       (function(window){${code}\n}).call(proxyWindow,proxyWindow)
      }
    })(this);`;
  }

  start() {
    if (this.isActive === false) {
      this.isActive = true;
      if (++SandBox.activeCount === 1) {
        overridePrototype();
      }
    }
  }

  stop() {
    if (this.isActive === true) {
      this.isActive = false;
      this.injectedProps.forEach(k => {
        Reflect.deleteProperty(this.appWindow, k);
      });
      this.injectedProps.clear();
      this.clearEventCache();
      this.appWindow.commCenter.clearDataListeners();
      if (--SandBox.activeCount === 0) {
        releasePrototype();
      }
    }
  }
}
