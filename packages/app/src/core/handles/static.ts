import { ISource } from '..';
import { getLink, scopeStyleEle } from './links';
import { getScript } from './scripts';

export async function getStatic(source: ISource, appName: string) {
  const { domSource: dom } = source;
  extractDom(dom, source, appName);
}

function extractDom(
  parent: HTMLElement | Element,
  source: ISource,
  appName: string
) {
  const children = Array.from(parent.children);
  // 递归处理子元素
  children.length &&
    children.forEach(c => {
      extractDom(c, source, appName);
    });

  for (const dom of children) {
    if (dom instanceof HTMLLinkElement) {
      getLink(dom, parent, source);
    } else if (dom instanceof HTMLScriptElement) {
      getScript(dom, parent, source);
    } else if (dom instanceof HTMLStyleElement) {
      scopeStyleEle(dom, appName);
    }
  }
}
