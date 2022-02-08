import { dataFetch } from '@remicro.js/utils';
import { IApp } from '.';
/* loader */

// load html
export async function loadHtml(url) {
  try {
    const htmlStr = await dataFetch(url, { format: 'text' });
    return htmlStr;
  } catch (error) {
    console.log('ERR:load html ', error);
  }
}

// load links
// include styles and prefetch
export async function loadLinks(app: IApp) {
  const links = Array.from(app.source.links.entries());
  const fetchLinkPromises = links.map(l => dataFetch(l[0], { format: 'text' }));

  try {
    const res = await Promise.all(fetchLinkPromises);
    res.forEach((code, index) => {
      const url = links[index][0];
      const sourceBody = app.source.links.get(url);
      if (sourceBody) {
        sourceBody.code = code;
        app.source.links.set(url, sourceBody);
      }
    });
  } catch (error) {
    console.log('ERR:load links ', error);
  }
}

// load scripts
export async function loadScripts(app: IApp) {
  const scripts = Array.from(app.source.scripts.entries());
  const baseURl = app.url;
  const fetchScriptPromises = [];
  scripts.forEach(s => {
    const [url, info] = s;
    if (info.isExternal === true) {
      fetchScriptPromises.push(dataFetch(baseURl + url, { format: 'text' }));
    } else {
      fetchScriptPromises.push(Promise.resolve(info.code));
    }
  });

  try {
    const res = await Promise.all(fetchScriptPromises);
    res.forEach((code, index) => {
      const url = scripts[index][0];
      const sourceBody = app.source.scripts.get(url);
      if (sourceBody) {
        sourceBody.code = code;
        app.source.scripts.set(url, sourceBody);
      }
    });
  } catch (error) {
    console.log('ERR:load script ', error);
  }
}
