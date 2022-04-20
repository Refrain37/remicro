import { isBrowser } from '../utils';

const prototypeMethods: Record<string, any> = {};

export function getPrototypeMethods() {
  const win: any = window || {};
  if (isBrowser() === true && !win.__RM_prototype) {
    win.__RM_prototype = true;

    const rawWindow = Function('return window')();
    const rawDocument = Function('return document')();

    // element
    const rawSetAttribute = Element.prototype.setAttribute;
    const rawAppendChild = Element.prototype.appendChild;
    const rawInsertBefore = Element.prototype.insertBefore;
    const rawReplaceChild = Element.prototype.replaceChild;
    const rawRemoveChild = Element.prototype.removeChild;
    const rawAppend = Element.prototype.append;
    const rawPrepend = Element.prototype.prepend;
    const rawCloneNode = Element.prototype.cloneNode;

    // document
    const rawCreateElement = Document.prototype.createElement;
    const rawCreateElementNS = Document.prototype.createElementNS;
    const rawCreateDocumentFragment = Document.prototype.createDocumentFragment;
    const rawQuerySelector = Document.prototype.querySelector;
    const rawQuerySelectorAll = Document.prototype.querySelectorAll;
    const rawGetElementById = Document.prototype.getElementById;
    const rawGetElementsByClassName = Document.prototype.getElementsByClassName;
    const rawGetElementsByTagName = Document.prototype.getElementsByTagName;
    const rawGetElementsByName = Document.prototype.getElementsByName;

    // window
    const rawWindowAddEventListener = rawWindow.addEventListener;
    const rawWindowRemoveEventListener = rawWindow.removeEventListener;
    const rawSetInterval = rawWindow.setInterval;
    const rawSetTimeout = rawWindow.setTimeout;
    const rawClearInterval = rawWindow.clearInterval;
    const rawClearTimeout = rawWindow.clearTimeout;

    // document env
    const rawDocumentAddEventListener = rawDocument.addEventListener;
    const rawDocumentRemoveEventListener = rawDocument.removeEventListener;

    Object.assign(prototypeMethods, {
      rawWindow,
      rawDocument,
      rawSetAttribute,
      rawAppendChild,
      rawInsertBefore,
      rawReplaceChild,
      rawRemoveChild,
      rawAppend,
      rawPrepend,
      rawCloneNode,
      rawCreateElement,
      rawCreateElementNS,
      rawCreateDocumentFragment,
      rawQuerySelector,
      rawQuerySelectorAll,
      rawGetElementById,
      rawGetElementsByClassName,
      rawGetElementsByTagName,
      rawGetElementsByName,
      rawWindowAddEventListener,
      rawWindowRemoveEventListener,
      rawSetInterval,
      rawSetTimeout,
      rawClearInterval,
      rawClearTimeout,
      rawDocumentAddEventListener,
      rawDocumentRemoveEventListener,
    });
  }
}

export default prototypeMethods;
