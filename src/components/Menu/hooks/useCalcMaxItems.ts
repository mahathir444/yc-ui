import { ref, Ref } from 'vue';
import { useResizeObserver } from '@vueuse/core';
import { MenuItemData } from './useProvide';
import { throttle } from '@/components/_shared/utils';
export default (menuRef: Ref<HTMLDivElement | undefined>) => {
  // 顺序
  const index = ref<number>(0);
  // 最大能展示元素的个数
  const max = ref<number>(0);
  // menuItemData
  const menuItemData = ref<MenuItemData[]>([]);
  // 计算最大能展示元素的个数
  useResizeObserver(
    menuRef,
    throttle(() => {
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
  return {
    index,
    max,
    menuItemData,
  };
};
