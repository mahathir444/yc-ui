import { computed, ref, Ref } from 'vue';
import { useResizeObserver } from '@vueuse/core';
import { MenuItemData } from './useProvide';
import { ChlidTreeNode } from './useMenuLevel';
import { throttle } from '@/components/_shared/utils';
import { MenuMode } from '../type';
//将树形结构数据扁平化
function flattenTree(treeData: ChlidTreeNode[]): ChlidTreeNode[] {
  const result: ChlidTreeNode[] = [];
  const traverse = (node: ChlidTreeNode) => {
    const { children, ...rest } = node;
    result.push(rest);
    if (children && children.length > 0) {
      children.forEach((child) => traverse(child));
    }
  };
  if (Array.isArray(treeData)) {
    treeData.forEach((node) => traverse(node));
  } else if (treeData) {
    traverse(treeData);
  }
  return result;
}
export default (menuRef: Ref<HTMLDivElement | undefined>, mode: MenuMode) => {
  // 顺序
  const index = ref<number>(0);
  // 最大能展示元素的个数
  const max = ref<number>(10000);
  // menuItemData
  const menuItemData = ref<MenuItemData[]>([]);
  // 扁平化的数据
  const flattenData = computed(() =>
    flattenTree(menuItemData.value.map((item) => item.childTree).flat(1))
  );
  // 计算最大能展示元素的个数
  if (mode == 'horizontal') {
    useResizeObserver(
      menuRef,
      throttle(() => {
        console.log(menuItemData.value);
        const menuWidth = menuRef.value!.offsetWidth - 52;
        let maxCount = 0;
        let totalWidth = 0;
        for (let i = 0; i < menuItemData.value.length; i++) {
          const gap = i > 0 ? 4 : 0;
          const curWidth = totalWidth + gap + menuItemData.value[i].width;
          if (curWidth > menuWidth) {
            break;
          }
          totalWidth = curWidth;
          maxCount++;
        }
        max.value = maxCount;
      }, 200)
    );
  }
  return {
    index,
    max,
    menuItemData,
    flattenData,
  };
};
