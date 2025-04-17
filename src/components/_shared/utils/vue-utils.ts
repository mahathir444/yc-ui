import { RenderContent } from '../type';
import { Comment, Fragment, Text, h, VNode } from 'vue';
import { isFunction, isObject } from './is';
import { Option } from '@/components/Select';
import { ObjectData } from '../type';

// 获取renderFunction
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

// 查找select中所有的option和option-group
export function flattenAndFindOptions(vnodes: VNode[]) {
  const result: ObjectData[] = [];
  // 是否是option
  const isOption = (vnode: ObjectData) => vnode?.type?.name == Option.name;
  const traverse = (nodes: ObjectData | ObjectData[]) => {
    if (!nodes) return;
    const nodeArray = Array.isArray(nodes) ? nodes : [nodes];
    for (const node of nodeArray) {
      if (!node || typeof node !== 'object') continue;
      if (isOption(node)) {
        node.props && result.push(node.props);
      } else if (Array.isArray(node.children)) {
        traverse(node.children);
      } else if (isObject(node.children) && !Array.isArray(node.children)) {
        for (let key of Object.keys(node.children)) {
          if (!isFunction(node.children[key])) continue;
          traverse(node.children[key]?.() || []);
        }
      }
    }
  };
  traverse(vnodes);
  return result;
}
