import { dataFetch } from '@remicro.js/utils';
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
