import { dataFetch } from '@remicro.js/utils';
/* loader */

// load html
export async function loadHtml(url) {
  const res = await dataFetch(url);
}
