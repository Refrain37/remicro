import { CommCenterForApp } from '..';
import { RawPrototypeMethods } from '../global';
import { asyncSetCurrAppName } from '../utils';
import { overridePrototypeMethods, releasePrototypeMethods } from './override';
import { proxyWindowEvent } from './windowEvent';

/**
 * 沙箱
 * 核心功能在于修改js的作用域，以及重写window对象
 * 修改js的作用域：将子应用的window指向代理后的window对象，来进行window对象的隔离
 * 重写window对象：主要在事件相关的函数上进行重写
 */

export type MicroAppWindowDataType = {
  commCenter: CommCenterForApp;
  rawWindow: Window;
  rawDocument: Document;
};

export type MicroAppWindow = Window & MicroAppWindowDataType;
export interface ISandBox {
  appName: string;
  isActive: boolean; // 是否在运行
  appWindow: MicroAppWindow; // 子应用的window
  appProxyWindow: WindowProxy; // 经过代理后的子应用的window
  injectedProps: Set<string | symbol>; // 代理的属性
  bindScope: (code: string) => string; // 修改js作用域
  start: () => void;
  stop: () => void;
  clearEventCache: () => void; // 清除事件代理
}

export default class SandBox implements ISandBox {
  static activeCount = 0;
  appName: string;
  isActive: boolean;
  appWindow = {} as MicroAppWindow;
  appProxyWindow: WindowProxy = null;
  injectedProps: Set<string | symbol> = new Set<string | symbol>();
  clearEventCache: () => void;

  constructor(appName: string, commCenterForApp: CommCenterForApp) {
    this.appName = appName;
    this.isActive = false;
    this.mixinAppWindow(this.appWindow, commCenterForApp);
    this.appProxyWindow = this.createProxyWindow();
  }

  private createProxyWindow() {
    const appName = this.appName;
    const rawWindow = RawPrototypeMethods.rawWindow;
    const _self = this;

    return new Proxy(this.appWindow, {
      get(target, prop) {
        asyncSetCurrAppName(appName);
        // 首先从代理对象获取
        if (Reflect.has(target, prop)) {
          return Reflect.get(target, prop);
        }

        // 在全局对象重获取
        const rawVal = Reflect.get(rawWindow, prop);

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

  private mixinAppWindow(
    appWindow: MicroAppWindow,
    commCenterForApp: CommCenterForApp
  ) {
    // proxy window event-func
    this.clearEventCache = proxyWindowEvent(appWindow);

    // communication center
    appWindow.commCenter = commCenterForApp;
    appWindow.rawWindow = RawPrototypeMethods.rawWindow;
    appWindow.rawDocument = RawPrototypeMethods.rawDocument;

    // set specialKeys
    this.setSpecialProperties(appWindow);
  }

  private setSpecialProperties(appWindow: MicroAppWindow) {
    const appName = this.appName;
    Object.defineProperties(appWindow, {
      document: {
        get() {
          asyncSetCurrAppName(appName);
          return RawPrototypeMethods.rawWindow;
        },
        configurable: false,
        enumerable: true,
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
        overridePrototypeMethods(); // override prototype methods
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
        releasePrototypeMethods();
      }
    }
  }
}
