import { RenderContent } from '../type';
import { isFunction } from './is';

// 获取renderFunction
export const getSlotFunction = (param: RenderContent | undefined) => {
  if (param) {
    if (isFunction(param)) return param;
    return () => param;
  }
  return undefined;
};
