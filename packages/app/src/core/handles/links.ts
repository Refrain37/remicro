import { ISource } from '..';

export function getLink(
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
