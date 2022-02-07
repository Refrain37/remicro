const rawWindowAddEventListener = window.addEventListener;
const rawWindowRemoveEventListener = window.removeEventListener;

export function proxyWindowEvent(appWindow: any) {
  const eventListenerCache = new Map<string, Set<any>>();

  /* override */
  appWindow.addEventListener = (eventName: string, cbk, opts) => {
    const eventListenerList = eventListenerCache.get(eventName);
    if (eventListenerList) {
      eventListenerList.add(cbk);
    } else {
      eventListenerCache.set(eventName, new Set([cbk]));
    }

    return rawWindowAddEventListener.call(window, eventName, cbk, opts); // 修改函数执行在全局的window对象
  };

  appWindow.removeEventListener = (eventName: string, cbk, opts) => {
    const eventListenerList = eventListenerCache.get(eventName);
    if (eventListenerList.size) {
      if (cbk && eventListenerList.has(cbk)) {
        eventListenerList.delete(cbk);
      } else {
        eventListenerList.clear();
      }
    }

    return rawWindowRemoveEventListener.call(window, eventName, cbk, opts);
  };

  const clear = () => {
    if (eventListenerCache.size) {
      eventListenerCache.forEach((list, eventName) => {
        if (list.size) {
          for (const cbk of list) {
            rawWindowRemoveEventListener.call(window, eventName, cbk);
          }
        }
      });
      eventListenerCache.clear();
    }
  };

  return clear;
}
