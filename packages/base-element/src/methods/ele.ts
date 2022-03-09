export interface IMethods {
  createTemplate: (html: string, css: string) => string;
  appendChildren: (parent: HTMLElement, child: HTMLElement) => HTMLElement;
  createEle: (tagName: string, template: string) => HTMLElement;
  innerTemplate: (template: string) => HTMLElement;
  getSlotTextContent: (key: string) => string;
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

function getSlotTextContent(key: string) {
  const self: HTMLElement = this;
  let target;

  self.children &&
    Array.from(self.children).forEach((e: HTMLElement) => {
      if (e.getAttribute('slot') === key) {
        target = e.innerHTML;
      }
    });

  return target;
}

export const methods: IMethods = {
  createTemplate,
  appendChildren,
  createEle,
  innerTemplate,
  getSlotTextContent,
};
