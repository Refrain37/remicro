let templateStyle;

export function scopeStyle(styleEle: HTMLElement, appName: string) {
  const prefix = `rm-app[name=${appName}]`;
  if (!templateStyle) {
    templateStyle = document.createElement('style');
    document.body.appendChild(templateStyle);
    templateStyle.sheet.disabled = true;
  }
}
