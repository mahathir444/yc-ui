// 谓词函数，用于检测变量类型
/* ---------------------------------------------------------------------------------------------------- */
const objProto = Object.prototype;

const objToString = objProto.toString;

// 检查给定的值是否是 dom 元素
export function isElement(value: any): value is Element {
  return !!(value && value.nodeType === 1);
}

// 检查给定的值是否是 null
export function isNull(value: any): value is null {
  return value === null;
}

// 检查给定的值是否是 undefined
export function isUndefined(value: any): value is undefined {
  return typeof value == 'undefined';
}

// 检查给定的值是否是 NaN，这和原生的 isNaN 函数不一样，如果变量是 undefined，原生的 isNaN 函数也会返回 true
export function isNaN(value: any): value is number {
  return window.isNaN(value) && value !== value;
}

// 检查给定的值是否是数值
export function isNumber(value: any): value is number {
  return typeof value == 'number' && !isNaN(value);
}

// 检查给定的值是否是字符串
export function isString(value: any): value is string {
  return typeof value == 'string';
}

// 检查给定的值是否是布尔值
export function isBoolean(value: any): value is boolean {
  return typeof value == 'boolean';
}

// 检查给定的值是否是正则表达式
export function isRegExp(value: any): value is RegExp {
  return objToString.call(value) === '[object RegExp]';
}

// 检查给定的值是否是日期对象
export function isDate(value: any): value is Date {
  return objToString.call(value) === '[object Date]' && !isNaN(value.getTime());
}

// 检查给定的值是否是函数
export function isFunction(value: any) {
  return (
    objToString.call(value) === '[object Function]' ||
    typeof value === 'function'
  );
}

// 检查给定的值是否是数组
export function isArray(value: any): value is Array<any> {
  return Array.isArray(value);
}

// 检查给定的值是否是对象
export function isObject(value: any): value is object {
  return !!value && typeof value === 'object';
}

// 以默认导出的形式导出所有谓词函数
/* ---------------------------------------------------------------------------------------------------- */
export default {
  element: isElement,
  null: isNull,
  undefined: isUndefined,
  nan: isNaN,
  number: isNumber,
  string: isString,
  boolean: isBoolean,
  regexp: isRegExp,
  date: isDate,
  function: isFunction,
  array: isArray,
  object: isObject,
};
