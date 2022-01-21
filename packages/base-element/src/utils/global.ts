export function register(name: string, instance) {
  if (!window.customElements.get(name)) {
    window.customElements.define(name, instance);
  }
}

export function createTeamplate(getTeamplate: () => string): (obj) => string {
  const fn: (obj) => string = obj => {
    return getTeamplate.call(obj);
  };
  return fn;
}
