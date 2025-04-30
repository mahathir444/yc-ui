import { ref, Ref } from 'vue';
import { useResizeObserver } from '@vueuse/core';
import { MenuItemData } from './useProvide';
import { debounce, throttleByRaf } from '@shared/utils';
export default (menuRef: Ref<HTMLDivElement | undefined>) => {
  // 顺序
  const order = ref<number>(0);
  const max = ref<number>(1000);
  const menuItemData = ref<MenuItemData[]>([]);
  const calcFn = throttleByRaf(() => {
    const width = menuRef.value!.offsetWidth;
    let maxCount = 0;
    let totalWidth = 0;
    let gap = 4;
    for (let item of menuItemData.value) {
      if (totalWidth - gap > width) {
        maxCount--;
        break;
      }
      totalWidth += item.width;
      maxCount++;
    }
    max.value = maxCount;
    console.log(maxCount, 'max');
  });
  // menu的宽度
  useResizeObserver(menuRef, () => {
    calcFn();
  });
  return {
    order,
    max,
    menuItemData,
  };
};
