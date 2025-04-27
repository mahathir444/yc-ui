import { ref, watch, Ref } from 'vue';
import { useElementSize } from '@vueuse/core';
import { sleep } from '@shared/utils';
import { MenuItemData } from './useProvide';
export default (menuRef: Ref<HTMLDivElement | undefined>) => {
  // 顺序
  const order = ref<number>(0);
  const max = ref<number>(1000);
  const menuItemData = ref<MenuItemData[]>([]);
  // menu的宽度
  const { width } = useElementSize(menuRef, undefined, { box: 'border-box' });
  watch(
    () => width.value,
    async () => {
      await sleep(0);
      let maxCount = 0;
      let totalWidth = 0;
      let gap = 4;
      for (let item of menuItemData.value) {
        if (totalWidth - gap > width.value) {
          maxCount--;
          break;
        }
        totalWidth += item.width;
        maxCount++;
      }
      max.value = maxCount;
    }
  );
  return {
    order,
    max,
    menuItemData,
  };
};
