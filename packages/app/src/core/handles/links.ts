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

export function createStyleEles(source: ISource) {
  const { domSource: dom, links } = source;
  const head = Array.from(dom.children).filter(c => {
    if (c.tagName.toLowerCase() === 'rm-app-head') {
      return c;
    }
  })[0];

  const styleEles = [];
  links.forEach((l, name) => {
    const styleEle = document.createElement('style');
    styleEle.textContent = l.code;
    styleEle.setAttribute('source', name);
    head.appendChild(styleEle);
    styleEles.push(styleEle);
  });

  return styleEles;
}

// scope
let templateStyle;

export function scopeStyleEle(styleEle: HTMLStyleElement, appName: string) {
  const prefix = `rm-app[name=${appName}]`;

  // 初始化模板标签
  if (!templateStyle) {
    templateStyle = document.createElement('style');
    document.body.appendChild(templateStyle);
    templateStyle.sheet.disabled = true;
  }

  if (styleEle.textContent) {
    templateStyle.textContent = styleEle.textContent;
    const cssRules = Array.from(templateStyle.sheet?.cssRules) || [];
    styleEle.textContent = scopedRules(cssRules, prefix);
    templateStyle.textContent = '';
  } else {
    const observer = new MutationObserver(() => {
      observer.disconnect();
      const cssRules = Array.from(styleEle.sheet?.cssRules) || [];
      styleEle.textContent = scopedRules(cssRules, prefix);
    });
    observer.observe(styleEle, { childList: true });
  }
}

function scopedRules(rules, prefix) {
  let result = '';
  // 遍历rules，处理每一条规则
  for (const rule of rules) {
    if (rule.selectorText === ':root') {
      return;
    }
    switch (rule.type) {
      case 1: // STYLE_RULE
        result += scopedStyleRule(rule, prefix);
        break;
      case 4: // MEDIA_RULE
        result += scopedPackRule(rule, prefix, 'media');
        break;
      case 12: // SUPPORTS_RULE
        result += scopedPackRule(rule, prefix, 'supports');
        break;
      default:
        result += rule.cssText;
        break;
    }
  }

  return result;
}

function scopedPackRule(rule, prefix, packName) {
  const result = scopedRules(Array.from(rule.cssRules), prefix);
  return `@${packName} ${rule.conditionText} {${result}}`;
}

function scopedStyleRule(rule, prefix) {
  const { selectorText, cssText } = rule;

  if (/^((html[\s>~,]+body)|(html|body|:root))$/.test(selectorText)) {
    return cssText.replace(/^((html[\s>~,]+body)|(html|body|:root))/, prefix);
  } else if (selectorText === '*') {
    return cssText.replace('*', `${prefix} *`);
  }

  const builtInRootSelectorRE =
    /(^|\s+)((html[\s>~]+body)|(html|body|:root))(?=[\s>~]+|$)/;

  return cssText.replace(/^[\s\S]+{/, selectors => {
    return selectors.replace(/(^|,)([^,]+)/g, (all, $1, $2) => {
      if (builtInRootSelectorRE.test($2)) {
        return all.replace(builtInRootSelectorRE, prefix);
      }
      return `${$1} ${prefix} ${$2.replace(/^\s*/, '')}`;
    });
  });
}
