import { dataFetch } from '@remicro.js/utils';
/* loader */

// load html
export async function loadHtml(url) {
  try {
    const res = await dataFetch(url);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}
