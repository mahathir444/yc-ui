<template>
  <div class="yc-select-dropdown-list-wrapper" v-bind="containerProps">
    <!-- 选然正常列表 -->
    <div
      v-if="
        renderOptions.length <= (virtualListProps?.threshold as number) ||
        !virtualListProps?.itemHeight
      "
      class="yc-select-dropdown-list"
    >
      <yc-option
        v-for="v in renderOptions"
        :key="v[fieldKey.value]"
        :value="v[fieldKey.value]"
        :disabled="v[fieldKey.disabled]"
      >
        <component :is="renderLabel(v)" />
      </yc-option>
    </div>
    <!-- 渲染虚拟列表 -->
    <div v-else class="yc-select-dropdown-list" v-bind="wrapperProps">
      <yc-option
        v-for="{ data: v } in list"
        :key="v[fieldKey.value]"
        :value="v[fieldKey.value]"
        :disabled="v[fieldKey.disabled]"
      >
        <component :is="renderLabel(v)" />
      </yc-option>
    </div>
    <!-- 空插槽 -->
    <slot-render v-if="isEmpty" :render="slots.empty || renderEmpty">
      <yc-empty v-if="!slots.empty && !providerSlots.empty" />
    </slot-render>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs, watch } from 'vue';
import { useVirtualList, useScroll } from '@vueuse/core';
import { ObjectData } from '@shared/type';
import { getSlotFunction, getGlobalConfig } from '@shared/utils';
import useContext from './hooks/useContext';
import { Option as YcOption, VirtualListProps } from './index';
const props = defineProps<{
  virtualListProps: VirtualListProps;
}>();
const { virtualListProps } = toRefs(props);
// 接收注入
const { inject } = useContext();
const { fieldKey, isEmpty, renderOptions, slots, emits } = inject();
// configProvider
const { slots: providerSlots } = getGlobalConfig();
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
// 渲染empty
const renderEmpty = () => {
  return providerSlots.empty?.({
    component: 'Select',
  });
};
</script>

<style lang="less" scoped>
@import './style/select.less';
</style>
