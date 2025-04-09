import { isString, isObject } from './is';
// 获取html元素
export const getElement = (el: string | HTMLElement | Window) => {
  if (isString(el)) {
    return document.querySelector(el) as HTMLElement;
  } else if (isObject(el)) {
    return el;
  }
  return null;
};
