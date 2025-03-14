import "../../../node_modules/vue/dist/vue.runtime.esm-bundler.js";
import { isFunction, isObject } from "./is.js";
import { Fragment, h } from "../../../node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js";
const getSlotFunction = (param) => {
  if (param) {
    if (isFunction(param))
      return param;
    return () => param;
  }
  return void 0;
};
function findFirstLegitChild(node) {
  if (!node)
    return null;
  const children = node;
  for (const child of children) {
    if (isObject(child)) {
      switch (child.type) {
        case Comment:
          continue;
        case Text:
        case "svg":
          return wrapTextContent(child);
        case Fragment:
          return findFirstLegitChild(child.children);
        default:
          return child;
      }
    }
    return wrapTextContent(child);
  }
  return null;
}
function wrapTextContent(s) {
  return h(
    "span",
    {
      class: {
        "only-child__content": true
      }
    },
    s
  );
}
export {
  findFirstLegitChild,
  getSlotFunction
};
