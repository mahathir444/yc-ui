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
        <component :is="getLabelRender(v)" />
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
        <component :is="getLabelRender(v)" />
      </yc-option>
    </div>
    <!-- 空插槽 -->
    <component v-if="isEmpty" :is="getEmptyRender" />
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs, watch, h } from 'vue';
import { ObjectData } from '@shared/type';
import { getSlotFunction } from '@shared/utils';
import useProvide from './hooks/useProvide';
import { Option as YcOption, VirtualListProps } from './index';
import { useVirtualList, useScroll } from '@vueuse/core';
import YcEmpty from '@/components/Empty';
const props = defineProps<{
  virtualListProps: VirtualListProps;
}>();
const { virtualListProps } = toRefs(props);
// 接收注入
const { inject } = useProvide();
const { fieldKey, isEmpty, renderOptions, slots, emits } = inject();
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
const getLabelRender = (option: ObjectData) => {
  if (slots.option) {
    return () =>
      slots.option?.({
        data: option,
      }) || [];
  }
  const { render, label } = fieldKey.value;
  return option[render] ?? getSlotFunction(option[label]);
};
// 渲染emtpy
const getEmptyRender = () => {
  return slots.empty
    ? slots.empty
    : h(YcEmpty, {
        description: '暂无数据',
      });
};
</script>

<style lang="less" scoped>
@import './style/select.less';
</style>
