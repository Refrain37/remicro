/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { appCache, IApp } from '../app';
import { RawPrototypeMethods } from '../global';
import { scopeStyleEle } from '../handles';
import { getCurrAppName, setCurrAppName } from '../utils';

type Func = () => void;

function markElement(element) {
  const appName = getCurrAppName();
  appName && (element.__RM_APP_NAME = appName);
  return element;
}

function overrideDocumentPrototypeMethods() {
  const rawDocument = RawPrototypeMethods.rawDocument;

  Document.prototype.createElement = function createElement(
    tagName: string,
    options?: ElementCreationOptions
  ): HTMLElement {
    const element = RawPrototypeMethods.rawCreateElement.call(
      this,
      tagName,
      options
    );
    return markElement(element);
  };

  Document.prototype.createElementNS = function createElementNS(
    namespaceURI: string,
    name: string,
    options?: string | ElementCreationOptions
  ): any {
    const element = RawPrototypeMethods.rawCreateElementNS.call(
      this,
      namespaceURI,
      name,
      options
    );
    return markElement(element);
  };

  Document.prototype.createDocumentFragment =
    function createDocumentFragment(): DocumentFragment {
      const element = RawPrototypeMethods.rawCreateDocumentFragment.call(this);
      return markElement(element);
    };

  function querySelector(this: Document, selectors: string): any {
    const appName = getCurrAppName();
    return RawPrototypeMethods.rawQuerySelector.call(this, selectors); // TODO
  }

  function querySelectorAll(this: Document, selectors: string): any {
    const appName = getCurrAppName();
    if (!appName || !selectors || rawDocument !== this) {
      return RawPrototypeMethods.rawQuerySelectorAll.call(this, selectors);
    }
    return appCache.get(appName)?.container?.querySelectorAll(selectors) ?? [];
  }

  Document.prototype.querySelector = querySelector;
  Document.prototype.querySelectorAll = querySelectorAll;

  Document.prototype.getElementById = function getElementById(
    key: string
  ): HTMLElement | null {
    if (!getCurrAppName()) {
      return RawPrototypeMethods.rawGetElementById.call(this, key);
    }

    try {
      return querySelector.call(this, `#${key}`);
    } catch {
      return RawPrototypeMethods.rawGetElementById.call(this, key);
    }
  };
}

function releaseDocumentPrototypeMethods() {
  Document.prototype.createElement = RawPrototypeMethods.rawCreateElement;
  Document.prototype.createElementNS = RawPrototypeMethods.rawCreateElementNS;
  Document.prototype.createDocumentFragment =
    RawPrototypeMethods.rawCreateDocumentFragment;
  Document.prototype.querySelector = RawPrototypeMethods.rawQuerySelector;
  Document.prototype.querySelectorAll = RawPrototypeMethods.rawQuerySelectorAll;
  Document.prototype.getElementById = RawPrototypeMethods.rawGetElementById;
  Document.prototype.getElementsByClassName =
    RawPrototypeMethods.rawGetElementsByClassName;
  Document.prototype.getElementsByTagName =
    RawPrototypeMethods.rawGetElementsByTagName;
  Document.prototype.getElementsByName =
    RawPrototypeMethods.rawGetElementsByName;
}

const dynamicElementInMicroAppMap = new WeakMap<Node, Element | Comment>();

function getMappingNode(node: any): Node {
  return dynamicElementInMicroAppMap.get(node) ?? node;
}

function invokePrototypeMethod(
  app: IApp,
  rawMethod: Func,
  parent: any,
  targetChild: any,
  passiveChild?: any | null
): any {
  if (parent === document.head) {
    const appHead = app.container.querySelector('rm-app-head')!;
    if (passiveChild && !appHead.contains(passiveChild)) {
      return RawPrototypeMethods.rawAppendChild.call(appHead, targetChild);
    } else if (
      rawMethod === RawPrototypeMethods.rawRemoveChild &&
      !appHead.contains(targetChild)
    ) {
      if (parent.contains(targetChild)) {
        return rawMethod.call(parent, targetChild);
      }
      return targetChild;
    } else if (
      rawMethod === RawPrototypeMethods.rawAppend ||
      rawMethod === RawPrototypeMethods.rawPrepend
    ) {
      return rawMethod.call(appHead, targetChild);
    }
    return rawMethod.call(appHead, targetChild, passiveChild);
  } else if (parent === document.body) {
    const appBody = app.container.querySelector('rm-app-body')!;
    if (passiveChild && !appBody.contains(passiveChild)) {
      return RawPrototypeMethods.rawAppendChild.call(appBody, targetChild);
    } else if (
      rawMethod === RawPrototypeMethods.rawRemoveChild &&
      !appBody.contains(targetChild)
    ) {
      if (parent.contains(targetChild)) {
        return rawMethod.call(parent, targetChild);
      }
      return targetChild;
    } else if (
      rawMethod === RawPrototypeMethods.rawAppend ||
      rawMethod === RawPrototypeMethods.rawPrepend
    ) {
      return rawMethod.call(appBody, targetChild);
    }
    return rawMethod.call(appBody, targetChild, passiveChild);
  } else if (
    rawMethod === RawPrototypeMethods.rawAppend ||
    rawMethod === RawPrototypeMethods.rawPrepend
  ) {
    return rawMethod.call(parent, targetChild);
  }

  return rawMethod.call(parent, targetChild, passiveChild);
}

function handleNewNode(child: Node, app: IApp): Node {
  if (child instanceof HTMLStyleElement) {
    scopeStyleEle(child, app.name);
  }
  return child;
}

function commonElementHandler(
  parent: Node,
  newChild: Node | any,
  passiveChild: Node | null,
  rawMethod: Func
) {
  if (newChild?.__RM_APP_NAME) {
    const app = appCache.get(newChild.__RM_APP_NAME);
    if (app?.container) {
      return invokePrototypeMethod(
        app,
        rawMethod,
        parent,
        handleNewNode(newChild, app),
        passiveChild && getMappingNode(passiveChild)
      );
    } else if (
      rawMethod === RawPrototypeMethods.rawAppend ||
      rawMethod === RawPrototypeMethods.rawPrepend
    ) {
      return rawMethod.call(parent, newChild);
    }
    return rawMethod.call(parent, newChild, passiveChild);
  } else if (
    rawMethod === RawPrototypeMethods.rawAppend ||
    rawMethod === RawPrototypeMethods.rawPrepend
  ) {
    const appName = getCurrAppName();
    if (!(newChild instanceof Node) && appName) {
      const app = appCache.get(appName);
      if (app?.container) {
        if (parent === document.head) {
          return rawMethod.call(
            app.container.querySelector('micro-app-head'),
            newChild
          );
        } else if (parent === document.body) {
          return rawMethod.call(
            app.container.querySelector('micro-app-body'),
            newChild
          );
        }
      }
    }
    return rawMethod.call(parent, newChild);
  }

  return rawMethod.call(parent, newChild, passiveChild);
}
export function overridePrototypeMethods() {
  overrideDocumentPrototypeMethods();

  Element.prototype.appendChild = function appendChild<T extends Node>(
    newChild: T
  ): T {
    return commonElementHandler(
      this,
      newChild,
      null,
      RawPrototypeMethods.rawAppendChild
    );
  };

  Element.prototype.insertBefore = function insertBefore<T extends Node>(
    newChild: T,
    refChild: Node | null
  ): T {
    return commonElementHandler(
      this,
      newChild,
      refChild,
      RawPrototypeMethods.rawInsertBefore
    );
  };

  Element.prototype.replaceChild = function replaceChild<T extends Node>(
    newChild: Node,
    oldChild: T
  ): T {
    return commonElementHandler(
      this,
      newChild,
      oldChild,
      RawPrototypeMethods.rawReplaceChild
    );
  };

  Element.prototype.append = function append(
    ...nodes: (Node | string)[]
  ): void {
    let i = 0;
    const length = nodes.length;
    while (i < length) {
      commonElementHandler(
        this,
        nodes[i] as Node,
        null,
        RawPrototypeMethods.rawAppend
      );
      i++;
    }
  };

  Element.prototype.prepend = function prepend(
    ...nodes: (Node | string)[]
  ): void {
    let i = nodes.length;
    while (i > 0) {
      commonElementHandler(
        this,
        nodes[i - 1] as Node,
        null,
        RawPrototypeMethods.rawPrepend
      );
      i--;
    }
  };
}

export function releasePrototypeMethods() {
  setCurrAppName(null);
  releaseDocumentPrototypeMethods();

  Element.prototype.appendChild = RawPrototypeMethods.rawAppendChild;
  Element.prototype.insertBefore = RawPrototypeMethods.rawInsertBefore;
  Element.prototype.replaceChild = RawPrototypeMethods.rawReplaceChild;
  Element.prototype.removeChild = RawPrototypeMethods.rawRemoveChild;
  Element.prototype.append = RawPrototypeMethods.rawAppend;
  Element.prototype.prepend = RawPrototypeMethods.rawPrepend;
  Element.prototype.cloneNode = RawPrototypeMethods.rawCloneNode;
}
