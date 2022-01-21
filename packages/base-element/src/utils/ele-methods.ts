export interface IMethods {
  createTeamplate: (html: string, css: string) => string;
  appendChildren: (parent: HTMLElement, child: HTMLElement) => HTMLElement;
  createEle: (tagName: string, teamplate: string) => HTMLElement;
  innerTeamplate: (teamplate: string) => void;
}

function createTeamplate(html: string, css: string) {
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

function innerTeamplate(teamplate: string) {
  const self: HTMLElement = this;
  self.innerHTML = teamplate;
}

export const methods: IMethods = {
  createTeamplate,
  appendChildren,
  createEle,
  innerTeamplate,
};
