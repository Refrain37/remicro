export function register(name: string, instance) {
  if (!window.customElements.get(name)) {
    window.customElements.define(name, instance);
  }
}
