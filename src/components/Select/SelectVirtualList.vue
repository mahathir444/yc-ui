<template>
  <div class="yc-select-dropdown-virtual-list" v-bind="containerProps">
    <!-- 渲染虚拟列表 -->
    <div class="yc-select-dropdown-list" v-bind="wrapperProps">
      <yc-option
        v-for="{ data: v } in list"
        :key="v[fieldKey.value]"
        :value="v[fieldKey.value]"
        :disabled="v[fieldKey.disabled]"
      >
        <component :is="renderLabel(v)" />
      </yc-option>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs, watch } from 'vue';
import { useVirtualList, useScroll } from '@vueuse/core';
import { ObjectData } from '@shared/type';
import { getSlotFunction } from '@shared/utils';
import useContext from './hooks/useContext';
import { Option as YcOption, VirtualListProps } from './index';
const props = defineProps<{
  virtualListProps: VirtualListProps;
}>();
const { virtualListProps } = toRefs(props);
// 接收注入
const { inject } = useContext();
const { fieldKey, renderOptions, slots, emits } = inject();

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
// 渲染label
const renderLabel = (option: ObjectData) => {
  if (slots.option) {
    return () =>
      slots.option?.({
        data: option,
      }) || [];
  }
  const { render, label } = fieldKey.value;
  return option[render]
    ? getSlotFunction(option[render])
    : getSlotFunction(option[label]);
};
</script>

<style lang="less" scoped>
@import './style/select.less';
</style>
