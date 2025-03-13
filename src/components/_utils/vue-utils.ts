import { RenderContent } from '../_type';
import { isFunction, isObject } from './is';
import { Fragment, h, VNode } from 'vue';

export const getSlotFunction = (param: RenderContent | undefined) => {
  if (param) {
    if (isFunction(param)) return param;
    return () => param;
  }
  return undefined;
};

export function findFirstLegitChild(node: VNode[] | undefined): VNode | null {
  if (!node) return null;
  const children = node as VNode[];
  for (const child of children) {
    if (isObject(child)) {
      switch (child.type) {
        case Comment:
          continue;
        case Text:
        case 'svg':
          return h(
            'span',
            {
              class: {
                'trigger-wrapper-span': true,
              },
            },
            child
          );
        case Fragment:
          return findFirstLegitChild(child.children as VNode[]);
        default:
          return child;
      }
    }
    return h('span', child);
  }
  return null;
}
