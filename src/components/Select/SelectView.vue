<template>
  <yc-spin :loading="loading" class="yc-select-dropdown-loading">
    <template v-if="$slots['loading-icon']" #icon>
      <component v-if="slots['loading-icon']" :is="slots['loading-icon']" />
    </template>
    <!--dropdown -->
    <div class="yc-select-dropdown">
      <!-- header -->
      <div
        v-if="slots.header && (showHeaderOnEmpty || !isEmpty)"
        class="yc-select-dropdown-header"
      >
        <component :is="slots.header" />
      </div>
      <!-- 虚拟列表 -->
      <select-virtual-list
        v-if="virtualListProps"
        :virtual-list-props="virtualListProps"
      />
      <!-- list -->
      <select-list v-else :scrollbar="scrollbar" />
      <!-- footer -->
      <div
        v-if="slots.footer && (showFooterOnEmpty || !isEmpty)"
        class="yc-select-dropdown-footer"
      >
        <component :is="slots.footer" />
      </div>
    </div>
  </yc-spin>
</template>

<script lang="ts" setup>
import { VirtualListProps } from './type';
import useProvide from './hooks/useProvide';
import SelectVirtualList from './SelectVirtualList.vue';
import SelectList from './SelectList.vue';
import YcSpin from '@/components/Spin';
defineProps<{
  loading: boolean;
  scrollbar: boolean;
  showFooterOnEmpty: boolean;
  showHeaderOnEmpty: boolean;
  virtualListProps?: VirtualListProps;
}>();
// 接收注入
const { inject } = useProvide();
const { slots, isEmpty } = inject();
</script>

<style lang="less" scoped>
@import './style/select.less';
</style>
