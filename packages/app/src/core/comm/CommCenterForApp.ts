import RMApp from '../../index';
import { createEvent } from '@remicro.js/utils';
import { formatName } from '.';
import { App } from '..';
import { EventCenter, cbk } from './EventCenter';

interface ICommCenterForApp {
  eventCenter: EventCenter;
  container: RMApp;
  appName: string;
  addDataListener: (cbk: cbk) => void;
  rmDataListener: (cbk: cbk) => void;
  clearDataListeners: (appName: string) => void;
  dispatch: (data: any) => void;
}

export default class CommCenterForApp implements ICommCenterForApp {
  eventCenter: EventCenter;
  appName: string;
  container: RMApp;
  constructor(eventCenter, app: App) {
    this.eventCenter = eventCenter || new EventCenter();
    this.container = app.container;
    this.appName = app.name;
  }

  addDataListener(cbk: cbk) {
    this.eventCenter.on(formatName(this.appName), cbk);
  }

  rmDataListener(cbk: cbk) {
    this.eventCenter.off(formatName(this.appName), cbk);
  }

  clearDataListeners() {
    this.eventCenter.off(formatName(this.appName));
  }

  /**
   *  子应用向基座发送数据
   *
   * @param {*} data
   * @memberof CommCenterForApp
   */
  dispatch(data: any) {
    const event = createEvent('dataChanged', data);
    this.container.dispatchEvent(event);
  }
}
