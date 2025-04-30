<template>
  <div class="yc-select-dropdown-list-wrapper" v-bind="containerProps">
    <!-- 定义通用模板 -->
    <define-template v-slot="{ options }">
      <yc-option
        v-for="v in options"
        :key="v[fieldKey.value]"
        :value="v[fieldKey.value]"
        :disabled="v[fieldKey.disabled]"
      >
        <slot name="option" :data="v">
          <component :is="getRender(v)" />
        </slot>
      </yc-option>
    </define-template>
    <!-- 选然正常列表 -->
    <div
      v-if="
        renderOptions.length <= (virtualListProps?.threshold as number) ||
        !virtualListProps?.itemHeight
      "
      class="yc-select-dropdown-list"
    >
      <reuse-template :options="renderOptions" />
    </div>
    <!-- 渲染虚拟列表 -->
    <div v-else class="yc-select-dropdown-list" v-bind="wrapperProps">
      <reuse-template :options="list" />
    </div>
    <slot v-if="isEmpty" name="empty">
      <yc-empty description="暂无数据" />
    </slot>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs, watch } from 'vue';
import { ObjectData } from '@shared/type';
import { getSlotFunction } from '@shared/utils';
import { Option as YcOption, VirtualListProps } from '../index';
import { useVirtualList, useScroll } from '@vueuse/core';
import { createReusableTemplate } from '@vueuse/core';
const props = defineProps<{
  renderOptions: ObjectData[];
  virtualListProps: VirtualListProps;
  fieldKey: Record<string, string>;
  isEmpty: boolean;
}>();
const emits = defineEmits<{
  (e: 'dropdownScroll'): void;
  (e: 'dropdownReachBottom'): void;
}>();
const { renderOptions, virtualListProps, fieldKey } = toRefs(props);
const { define: DefineTemplate, reuse: ReuseTemplate } =
  createReusableTemplate();
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
// 渲染
const getRender = (option: ObjectData) => {
  const { render, label } = fieldKey.value;
  return option[render] ?? getSlotFunction(option[label]);
};
</script>

<style lang="less" scoped>
@import '../style/select.less';
</style>
