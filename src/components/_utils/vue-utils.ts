import { Fragment, h, VNode } from 'vue';
import { RenderContent } from '../_type';
import { isFunction, isObject } from './is';
import { SHAPE_FLAGS } from '../_constants';

export const getSlotFunction = (param: RenderContent | undefined) => {
  if (param) {
    if (isFunction(param)) return param;
    return () => param;
  }
  return undefined;
};

// 包裹文本节点
function wrapTextContent(s: string | VNode) {
  return h(
    'span',
    {
      class: {
        'only-child__content': true,
      },
    },
    s
  );
}

// 在vnode数组中查找第一个合法的子元素
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
          return wrapTextContent(child);
        case Fragment:
          return findFirstLegitChild(child.children as VNode[]);
        default:
          return child;
      }
    }
    return wrapTextContent(child);
  }
  return null;
}

export function getVnodeFromChildren(node: VNode[]) {
  const nodeArr: VNode[] = [];
  const children = node as VNode[];
  for (const child of children) {
    if (child.shapeFlag == SHAPE_FLAGS.slot) {
      nodeArr.push(...getVnodeFromChildren(child.children as VNode[]));
    } else {
      nodeArr.push(child);
    }
  }
  return nodeArr;
}
