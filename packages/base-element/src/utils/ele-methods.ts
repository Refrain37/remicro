export interface IMethods {
  createTeamplate: (html: string, css: string) => string;
  appendChildren: (parent: HTMLElement, child: HTMLElement) => HTMLElement;
  createEle: (tagName: string, teamplate: string) => HTMLElement;
  innerTeamplate: (obj: HTMLElement, teamplate: string) => void;
}

export function createTeamplate(html: string, css: string) {
  return `
    <style>
    ${css}
    </style>
    ${html}
  `;
}

export function appendChildren(
  parent: HTMLElement,
  child: HTMLElement | HTMLElement[]
): HTMLElement {
  parent.appendChild(child as HTMLElement);
  return parent;
}

export function createEle(tagName: string, template: string) {
  const ele = document.createElement(tagName);
  ele.innerHTML = template;
  return ele;
}

export function innerTeamplate(obj: HTMLElement, teamplate: string) {
  obj.innerHTML = teamplate;
}

export const methods: IMethods = {
  createTeamplate,
  appendChildren,
  createEle,
  innerTeamplate,
};
