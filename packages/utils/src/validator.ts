export enum TYPES {
  num = 'num',
  TEL = 'tel',
  EMAIL = 'email',
}

export interface IRules {
  type: TYPES;
  range?: string[];
  minlength?: number;
  maxlength?: number;
}

export function validate(val: any, rules: IRules) {
  console.log(val);
}

function validateNum(val) {
  console.log(val);
}
