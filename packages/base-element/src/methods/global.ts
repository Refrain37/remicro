export function register(name: string, instance) {
  if (!window.customElements.get(name)) {
    window.customElements.define(name, instance);
  }
}

export function createTemplate(
  getTemplate: (props?: any) => string
): (obj, props?: any) => string {
  const fn: (obj, props?: any) => string = (obj, props = {}) => {
    return getTemplate.call(obj, props);
  };
  return fn;
}
