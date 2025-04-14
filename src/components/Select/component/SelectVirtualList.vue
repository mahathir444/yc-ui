<template>
  <div class="yc-select-dropdown-list-wrapper" v-bind="containerProps">
    <div
      v-if="
        renderOptions.length <= (virtualListProps?.threshold as number) ||
        !virtualListProps?.itemHeight
      "
      class="yc-select-dropdown-list"
    >
      <yc-option
        v-for="item in renderOptions"
        :key="(item as ObjectData).value"
        v-bind="item"
      />
    </div>
    <div v-else class="yc-select-dropdown-list" v-bind="wrapperProps">
      <yc-option
        v-for="{ data } in list"
        :key="(data as ObjectData).value"
        v-bind="data"
      />
    </div>
    <slot v-if="isEmpty" name="empty">
      <yc-empty description="暂无数据" />
    </slot>
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
const { renderOptions, virtualListProps } = toRefs(props);
// 滚动ref
const scrollRef = ref<HTMLDivElement>();
// 初始化虚拟滚动
const { list, wrapperProps, containerProps } = useVirtualList(renderOptions, {
  overscan: virtualListProps.value?.buffer ?? 10,
  itemHeight: virtualListProps.value?.itemHeight || 36,
});
// 滚动状态
const { arrivedState } = useScroll(scrollRef);
// 判断是否触底
watch(arrivedState, () => {
  if (scrollRef.value?.scrollTop && arrivedState.bottom) {
    emits('dropdownReachBottom');
  }
});
</script>

<style lang="less" scoped>
@import '../style/select.less';
</style>
