export function createEvent(
  name: string,
  data?: any,
  bubbles?: boolean,
  cancelable?: boolean
) {
  const options = {
    detail: {
      ...data,
    },
    bubbles,
    cancelable,
  };
  return new CustomEvent(name, options);
}
