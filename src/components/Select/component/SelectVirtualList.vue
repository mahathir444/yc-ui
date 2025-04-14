<template>
  <div class="yc-select-dropdown-list-wrapper" v-bind="containerProps">
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
import { toRefs } from 'vue';
import { ObjectData } from '@shared/type';
import { Option as YcOption, OptionProps, VirtualListProps } from '../index';
import { useVirtualList } from '@vueuse/core';
const props = defineProps<{
  renderOptions: OptionProps[];
  virtualListProps?: VirtualListProps;
  isEmpty: boolean;
}>();
const { renderOptions, virtualListProps } = toRefs(props);
// 初始化虚拟滚动
const { list, containerProps, wrapperProps } = useVirtualList(
  renderOptions.value,
  {
    overscan: virtualListProps.value?.overscan ?? 10,
    itemHeight: virtualListProps.value?.itemHeight ?? 36,
  }
);
</script>

<style lang="less" scoped>
@import '../style/select.less';
</style>
