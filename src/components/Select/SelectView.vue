<template>
  <yc-spin :loading="loading" class="yc-select-dropdown-loading">
    <template v-if="$slots['loading-icon']" #icon>
      <component :is="renderSlots('loading-icon')" />
    </template>
    <!--dropdown -->
    <div class="yc-select-dropdown">
      <!-- header -->
      <div
        v-if="slots.header && (showHeaderOnEmpty || !isEmpty)"
        class="yc-select-dropdown-header"
      >
        <component :is="renderSlots('header')" />
      </div>
      <!-- 虚拟列表 -->
      <select-virtual-list
        v-if="isVirtualList"
        :virtual-list-props="virtualListProps!"
      />
      <!-- list -->
      <select-real-list v-else :scrollbar="scrollbar" />
      <!-- empty -->
      <slot-render
        v-if="isEmpty"
        :render="slots.empty || renderEmpty('Select')"
      >
        <yc-empty v-if="!slots.empty && !configSlots.empty" />
      </slot-render>
      <!-- footer -->
      <div
        v-if="slots.footer && (showFooterOnEmpty || !isEmpty)"
        class="yc-select-dropdown-footer"
      >
        <component :is="renderSlots('footer')" />
      </div>
    </div>
  </yc-spin>
</template>

<script lang="ts" setup>
import { toRefs, computed } from 'vue';
import { VirtualListProps } from './type';
import { getGlobalConfig } from '@shared/utils';
import useContext from './hooks/useContext';
import SelectVirtualList from './SelectVirtualList.vue';
import SelectRealList from './SelectRealList.vue';
import YcSpin from '@/components/Spin';
import YcEmpty from '@/components/Empty';
import { SlotRender } from '@shared/components';
const props = defineProps<{
  loading: boolean;
  scrollbar: boolean;
  showFooterOnEmpty: boolean;
  showHeaderOnEmpty: boolean;
  virtualListProps?: VirtualListProps;
}>();
const { virtualListProps } = toRefs(props);
// 接收注入
const { slots, isEmpty, options } = useContext().inject();
// configProvider
const { slots: configSlots, renderEmpty } = getGlobalConfig();
// 是否是虚拟列表
const isVirtualList = computed(() => {
  if (!virtualListProps.value) {
    return false;
  }
  return (
    virtualListProps.value.itemHeight &&
    (!virtualListProps.value.threshold ||
      (virtualListProps.value.threshold as number) > options.value.length)
  );
});
// 渲染插槽
const renderSlots = (name: string) => {
  return slots[name];
};
</script>

<style lang="less" scoped>
@import './style/select.less';
</style>
