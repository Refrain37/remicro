import { dataFetch } from '@remicro.js/utils';
import { IApp } from '.';
/* loader */

// load html
export async function loadHtml(url) {
  try {
    const htmlStr = await dataFetch(url, { format: 'text' });
    return htmlStr;
  } catch (error) {
    console.log(error);
  }
}

export async function loadLinks(app: IApp) {
  const links = Array.from(app.source.links.entries());
  const fetchLinkPromises = links.map(l => {
    return l;
  });
  console.log('links');
}

export async function loadScripts(app: IApp) {
  const scripts = Array.from(app.source.scripts.entries());
  const fetchScriptPromise = [];
  scripts.forEach(s => {
    if (s[1].isExternal === true) {
    }
  });
  console.log(scripts);
}
