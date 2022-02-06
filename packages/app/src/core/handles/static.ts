import { ISource } from '..';
import { getLink } from './links';
import { getScript } from './scripts';

export async function getStatic(source: ISource) {
  const { domSource: dom } = source;
  extractDom(dom, source);
}

function extractDom(parent: HTMLElement | Element, source: ISource) {
  const children = Array.from(parent.children);
  // 递归处理子元素
  children.length &&
    children.forEach(c => {
      extractDom(c, source);
    });

  for (const dom of children) {
    if (dom instanceof HTMLLinkElement) {
      getLink(dom, parent, source);
    } else if (dom instanceof HTMLScriptElement) {
      getScript(dom, parent, source);
    } else if (dom instanceof HTMLStyleElement) {
      // TODO:样式隔离
    }
  }
}
