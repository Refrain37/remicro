/* eslint-disable @typescript-eslint/ban-types */
import elementResizeDetectorMaker from 'element-resize-detector';
const ERD = elementResizeDetectorMaker();
import { throttle } from '../utils/index';

export function onElementResize(container: any, callback: Function) {
  const fn = throttle(callback, 500);
  ERD.listenTo(container, fn);
}

export function rmAllElementResize(container: any) {
  ERD.removeAllListeners(container);
}
