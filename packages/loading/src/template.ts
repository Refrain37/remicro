import { createTemplate } from '@remicro.js/base-element';

export default createTemplate(function () {
  const styles = this.color && `style="color:${this.color};"`;
  const loading = `<rm-icon id="rm-loading" class="rm-loading" name="icon_loading" font-size="${this.fontsize}px"></rm-icon>`;
  const loadingContainer = `
  <span class="rm-loading-container" ${styles}>
    ${loading}
    ${this.text}
  </span>`;

  return loadingContainer;
});
