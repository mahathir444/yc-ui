const objProto = Object.prototype;
const objToString = objProto.toString;
function isElement(value) {
  return !!(value && value.nodeType === 1);
}
function isNull(value) {
  return value === null;
}
function isUndefined(value) {
  return value === void 0;
}
function isNaN(value) {
  return window.isNaN(value) && value !== value;
}
function isNumber(value) {
  return objToString.call(value) === "[object Number]" && !isNaN(value);
}
function isString(value) {
  return objToString.call(value) === "[object String]";
}
function isBoolean(value) {
  return value === true || value === false || objToString.call(value) === "[object Boolean]";
}
function isRegExp(value) {
  return objToString.call(value) === "[object RegExp]";
}
function isDate(value) {
  return objToString.call(value) === "[object Date]" && !isNaN(value.getTime());
}
function isFunction(value) {
  return objToString.call(value) === "[object Function]" || typeof value === "function";
}
function isArray(value) {
  return objToString.call(value) === "[object Array]";
}
function isObject(value) {
  return !!value && typeof value === "object";
}
const is = {
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
  object: isObject
};
export {
  is as default,
  isArray,
  isBoolean,
  isDate,
  isElement,
  isFunction,
  isNaN,
  isNull,
  isNumber,
  isObject,
  isRegExp,
  isString,
  isUndefined
};
