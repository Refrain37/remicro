import { createHashStr } from '@remicro.js/utils';
import { ISource } from '.';

// html handles
export async function formateHtmlStr(htmlStr: string) {
  return htmlStr
    .replace(/<head[^>]*>[\s\S]*?<\/head>/i, match => {
      return match
        .replace(/<head/i, '<rm-app-head')
        .replace(/<\/head>/i, '</rm-app-head>');
    })
    .replace(/<body[^>]*>[\s\S]*?<\/body>/i, match => {
      return match
        .replace(/<body/i, '<rm-app-body')
        .replace(/<\/body>/i, '</rm-app-body>');
    });
}

// load static
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

function getLink(
  dom: HTMLElement | Element,
  parent: HTMLElement | Element,
  source: ISource
) {
  const href = dom.getAttribute('href');
  if (href && dom.getAttribute('rel') === 'stylesheet') {
    source.links.set(href, {
      code: '',
    });
  }
  parent.removeChild(dom);
}

function getScript(
  dom: HTMLElement | Element,
  parent: HTMLElement | Element,
  source: ISource
) {
  const src = dom.getAttribute('src');
  if (src) {
    source.scripts.set(src, {
      code: '',
      isExternal: true,
    });
  } else if (dom.textContent) {
    const name = createHashStr(12);
    source.scripts.set(name, {
      code: dom.textContent,
      isExternal: false,
    });
  }
  parent.removeChild(dom);
}

// add-style

// runScript
export async function runScipts(source: ISource) {
  const scripts = Array.from(source.scripts.entries());
  scripts.forEach(s => {
    const [url, info] = s;
    const code = info.code;
    (0, eval)(code);
  });
}
