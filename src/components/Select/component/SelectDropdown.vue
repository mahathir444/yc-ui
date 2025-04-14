<template>
  <!-- loading -->
  <yc-spin :loading="loading" class="yc-select-dropdown-loading">
    <template v-if="$slots['loading-icon']" #icon>
      <slot name="loading-icon" />
    </template>
    <!--dropdown -->
    <div class="yc-select-dropdown">
      <!-- header -->
      <div
        v-if="$slots.header && (showHeaderOnEmpty || !isEmpty)"
        class="yc-select-dropdown-header"
      >
        <slot name="header" />
      </div>
      <!-- 虚拟列表 -->
      <select-virtual-list
        v-if="virtualListProps"
        :render-options="renderOptions"
        :is-empty="isEmpty"
        :virtual-list-props="virtualListProps"
      >
        <template v-if="$slots.empty" #empty>
          <slot name="empty" />
        </template>
      </select-virtual-list>
      <!-- list -->
      <select-list
        v-else
        :render-options="renderOptions"
        :field-key="fieldKey"
        :loading="loading"
        :scrollbar="scrollbar"
        :is-empty="isEmpty"
      >
        <slot />
        <template v-if="$slots.empty" #empty>
          <slot name="empty" />
        </template>
      </select-list>
      <!-- footer -->
      <div
        v-if="$slots.footer && (showFooterOnEmpty || !isEmpty)"
        class="yc-select-dropdown-footer"
      >
        <slot name="footer" />
      </div>
    </div>
  </yc-spin>
</template>

<script lang="ts" setup>
import { SelectOptions, VirtualListProps } from '../type';
import SelectVirtualList from './SelectVirtualList.vue';
import SelectList from './SelectList.vue';
defineProps<{
  renderOptions: SelectOptions;
  fieldKey: Record<string, string>;
  loading: boolean;
  scrollbar: boolean;
  isEmpty: boolean;
  showHeaderOnEmpty: boolean;
  showFooterOnEmpty: boolean;
  virtualListProps?: VirtualListProps;
}>();
const emits = defineEmits<{
  (e: 'dropdownScroll'): void;
  (e: 'dropdownReachBottom'): void;
}>();
</script>

<style lang="less" scoped>
@import '../style/select.less';
</style>
