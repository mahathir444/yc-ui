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
      <!-- list -->
      <yc-scrollbar
        v-if="!scrollbar || !virtualListProps"
        class="yc-select-dropdown-list-wrapper"
        @scroll="emits('dropdownScroll')"
        @reach-bottom="emits('dropdownReachBottom')"
      >
        <div class="yc-select-dropdown-list">
          <slot />
          <slot v-if="isEmpty" name="empty">
            <yc-empty description="暂无数据" />
          </slot>
          <render-options
            :render-options="renderOptions"
            :fieldKey="fieldKey"
          />
        </div>
      </yc-scrollbar>
      <!-- 虚拟列表 -->
      <div
        v-else
        class="yc-select-dropdown-list-wrapper"
        v-bind="containerProps"
      >
        <div class="yc-select-dropdown-list" v-bind="wrapperProps">
          <yc-option v-for="{ data } in list" :key="data.value" v-bind="data" />
          <slot v-if="isEmpty" name="empty">
            <yc-empty description="暂无数据" />
          </slot>
        </div>
      </div>
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
import { toRefs, watch } from 'vue';
import { SelectOptions, VirtualListProps } from '../type';
import { useVirtualList } from '@vueuse/core';
import RenderOptions from './RenderOptions.vue';
const props = defineProps<{
  options: SelectOptions;
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
const { virtualListProps, options, renderOptions } = toRefs(props);
// 初始化虚拟滚动
let wrapperProps = {};
let containerProps = {};
let list: any = {};
watch(
  () => options.value.length,
  async (val) => {
    if (val <= 0 || !virtualListProps.value) {
      return;
    }
    const threshold = virtualListProps?.value?.threshold as number;
    if (val < threshold) {
      return;
    }
    const {
      list: _list,
      containerProps: _containerProps,
      wrapperProps: _wrapperProps,
      scrollTo: _scrollTo,
    } = useVirtualList(options, {
      overscan: virtualListProps.value.overscan ?? 10,
      itemHeight: virtualListProps.value.itemHeight ?? 36,
    });
    list = _list;
    containerProps = _containerProps;
    wrapperProps = _wrapperProps;
  }
);
</script>

<style lang="less" scoped>
@import '../style/select.less';
</style>
