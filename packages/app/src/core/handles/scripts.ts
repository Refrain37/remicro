import { createHashStr } from '@remicro.js/utils';
import { ISource } from '..';

export function getScript(
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

export async function runScipts(source: ISource) {
  const scripts = Array.from(source.scripts.entries());
  scripts.forEach(s => {
    const [url, info] = s;
    const code = info.code;
    (0, eval)(code);
  });
}
