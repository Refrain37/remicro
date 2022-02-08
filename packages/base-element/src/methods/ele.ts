export interface IMethods {
  createTemplate: (html: string, css: string) => string;
  appendChildren: (parent: HTMLElement, child: HTMLElement) => HTMLElement;
  createEle: (tagName: string, template: string) => HTMLElement;
  innerTemplate: (template: string) => HTMLElement;
}

function createTemplate(html: string, css: string) {
  return `
    <style>
    ${css}
    </style>
    ${html}
  `;
}

function appendChildren(
  parent: HTMLElement,
  child: HTMLElement | HTMLElement[]
): HTMLElement {
  parent.appendChild(child as HTMLElement);
  return parent;
}

function createEle(tagName: string, template: string) {
  const ele = document.createElement(tagName);
  ele.innerHTML = template;
  return ele;
}

function innerTemplate(template: string) {
  const self: HTMLElement = this;
  self.innerHTML = template;
  return self.children[0] as HTMLElement;
}

export const methods: IMethods = {
  createTemplate,
  appendChildren,
  createEle,
  innerTemplate,
};
