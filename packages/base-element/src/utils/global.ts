export function register(name: string, instance) {
  if (!window.customElements.get(name)) {
    window.customElements.define(name, instance);
  }
}

export function createTeamplate(
  getTeamplate: (props?: any) => string
): (obj, props?: any) => string {
  const fn: (obj, props?: any) => string = (obj, props = {}) => {
    return getTeamplate.call(obj, props);
  };
  return fn;
}
