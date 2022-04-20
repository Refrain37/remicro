import prototypeMethods from '../global/prototypeMethods';

function overrideDocument() {
  const rawDoc = prototypeMethods.rawDocument;
}

export function overridePrototype() {
  console.log(prototypeMethods);
}

export function releasePrototype() {
  console.log(prototypeMethods);
}
