import { asyncCall } from '.';

let currAppName: string | null = null;

export function setCurrAppName(name: string) {
  currAppName = name;
}

export function asyncSetCurrAppName(name: string) {
  if (currAppName !== name) {
    setCurrAppName(name);
  }
  asyncCall(() => setCurrAppName(name));
}

export function getCurrAppName() {
  return currAppName;
}
