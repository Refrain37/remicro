import { CommCenterForBase } from '.';

export function setGlobalEnv(key: string, val: any) {
  const win = window;
  win[key] = val;
}

export function formatName(name: string, fromBase = true) {
  if (!name && typeof name === 'string') return '';
  return fromBase ? `from_base_${name}` : `from_app_${name}`;
}

export async function setCommCenter(CommCenterForBase: CommCenterForBase) {
  const win: any = window;
  if (!win.CommCenterForBase) {
    console.log(CommCenterForBase);
    win.CommCenterForBase = CommCenterForBase;
  }

  return;
}

// override
const rawSetAttribute = Element.prototype.setAttribute;
export async function overrideSetAttribute() {
  Element.prototype.setAttribute = function setAttribute(key, value) {
    if (/^rm-app/i.test(this.tagName) && key === 'data') {
      if (toString.call(value) === '[object Object]') {
        const cloneValue = {};
        Object.getOwnPropertyNames(value).forEach(propertyKey => {
          if (
            !(
              typeof propertyKey === 'string' && propertyKey.indexOf('__') === 0
            )
          ) {
            cloneValue[propertyKey] = value[propertyKey];
          }
        });

        const win: any = window;
        const CommCenterForBase = win.CommCenterForBase;
        // 设置data属性时即为传输props
        CommCenterForBase?.setData(this.getAttribute('name'), cloneValue);
      }
    } else {
      rawSetAttribute.call(this, key, value);
    }
  };
}
