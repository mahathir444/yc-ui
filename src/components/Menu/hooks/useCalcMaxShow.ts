import { ref, Ref } from 'vue';
import { useResizeObserver } from '@vueuse/core';
import { MenuItemData } from './useProvide';
export default (menuRef: Ref<HTMLDivElement | undefined>) => {
  // 顺序
  const order = ref<number>(0);
  const max = ref<number>(1000);
  const menuItemData = ref<MenuItemData[]>([]);
  // menu的宽度
  useResizeObserver(menuRef, () => {
    const width = menuRef.value!.offsetWidth;
    console.log(width, 'width');
    let maxCount = 0;
    let totalWidth = 52;
    let gap = 4;
    for (let item of menuItemData.value) {
      if (totalWidth - gap > width) {
        maxCount--;
        break;
      }
      totalWidth += item.width;
      maxCount++;
    }
    console.log(maxCount, 'max');
    max.value = maxCount;
  });
  return {
    order,
    max,
    menuItemData,
  };
};
