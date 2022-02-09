import { formatName } from './utils';
import { EventCenter } from './EventCenter';

interface ICommCenterForBase {
  eventCenter: EventCenter;
  setData: (appName: string, data: any) => void;
  clearDataListeners: (appName: string) => void;
}

export default class CommCenterForBase implements ICommCenterForBase {
  eventCenter: EventCenter;
  constructor(eventCenter) {
    this.eventCenter = eventCenter || new EventCenter();
  }

  setData(appName: string, data: any) {
    appName = formatName(appName);
    this.eventCenter.fire(appName, data);
  }

  clearDataListeners(appName: string) {
    appName = formatName(appName);
    this.eventCenter.off(appName);
  }
}
