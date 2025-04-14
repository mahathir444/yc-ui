<template>
  <div
    class="yc-select-dropdown-list-wrapper"
    v-bind="containerProps"
    ref="scrollRef"
  >
    <div class="yc-select-dropdown-list" v-bind="wrapperProps">
      <yc-option
        v-for="{ data } in list"
        :key="(data as ObjectData).value"
        v-bind="data"
      />
      <slot v-if="isEmpty" name="empty">
        <yc-empty description="暂无数据" />
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs, watch, computed, CSSProperties } from 'vue';
import { ObjectData } from '@shared/type';
import { Option as YcOption, OptionProps, VirtualListProps } from '../index';
import { useVirtualList, useScroll } from '@vueuse/core';
const props = defineProps<{
  renderOptions: OptionProps[];
  computedVisible: boolean;
  virtualListProps: VirtualListProps;
  isEmpty: boolean;
}>();
const emits = defineEmits<{
  (e: 'dropdownScroll'): void;
  (e: 'dropdownReachBottom'): void;
}>();
const { renderOptions, virtualListProps, computedVisible } = toRefs(props);
const scrollRef = ref<HTMLDivElement>();
// 初始化虚拟滚动
const { list, wrapperProps, containerProps } = initVirtualList();
// 滚动状态
const { arrivedState } = useScroll(scrollRef);
// 判断是否触底
watch(arrivedState, () => {
  if (scrollRef.value?.scrollTop && arrivedState.bottom) {
    emits('dropdownReachBottom');
  }
});
// 初始化list
function initVirtualList() {
  const threshold = virtualListProps.value?.threshold as number;
  const itemHeight = virtualListProps.value?.itemHeight;
  const buffer = virtualListProps.value?.buffer;
  if (
    threshold > renderOptions.value.length ||
    !itemHeight ||
    !computedVisible.value
  ) {
    return {
      list: computed(() =>
        renderOptions.value.map((item) => {
          return { data: item };
        })
      ),
      wrapperProps: {
        style: {
          overflowY: 'auto',
          maxHeight: '200px',
        } as CSSProperties,
      },
      containerProps: {},
    };
  }
  return useVirtualList(renderOptions.value, {
    overscan: buffer ?? 10,
    itemHeight: itemHeight,
  });
}
</script>

<style lang="less" scoped>
@import '../style/select.less';
</style>
