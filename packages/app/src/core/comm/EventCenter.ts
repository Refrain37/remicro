export type cbk = (args?: any) => void;

interface IEventCenter {
  appListenersCache: Map<string, Set<cbk>>;
  on: (name: string, cbk: cbk) => void;
  off: (name: string, cbk: cbk) => void;
  fire: (name: string, data?: any) => void;
}

export class EventCenter implements IEventCenter {
  appListenersCache: Map<string, Set<cbk>>;
  constructor() {
    this.appListenersCache = new Map<string, Set<cbk>>();
  }

  on(name: string, cbk: cbk) {
    let cbks = this.appListenersCache.get(name);
    if (!cbks) {
      cbks = new Set([cbk]);
    } else {
      cbks.add(cbk);
    }
    this.appListenersCache.set(name, cbks);
  }

  off(name: string, cbk?: cbk) {
    const cbks = this.appListenersCache.get(name);
    if (!cbks) return;
    if (cbk) {
      cbks.delete(cbk);
    } else {
      cbks.clear();
    }
    this.appListenersCache.set(name, cbks);
  }

  fire(name: string, data?: any) {
    const cbks = this.appListenersCache.get(name);
    if (cbks) {
      cbks.forEach(c => c(data));
    }
  }
}

const eventCenter = new EventCenter();
export default eventCenter;
