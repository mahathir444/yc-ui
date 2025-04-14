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
        v-if="!scrollbar || !virtualListProps.itemHeight"
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
          <slot />
          <render-options
            :render-options="renderOptions"
            :fieldKey="fieldKey"
          />
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
import { toRefs, watch, ref } from 'vue';
import { SelectOptions, VirtualListProps } from '../type';
import { Fn } from '@shared/type';
import { useVirtualList } from '@vueuse/core';
import RenderOptions from './RenderOptions.vue';
const props = defineProps<{
  options: SelectOptions;
  renderOptions: SelectOptions;
  fieldKey: Record<string, string>;
  loading: boolean;
  scrollbar: boolean;
  isEmpty: boolean;
  virtualListProps: VirtualListProps;
  showHeaderOnEmpty: boolean;
  showFooterOnEmpty: boolean;
}>();
const emits = defineEmits<{
  (e: 'dropdownScroll'): void;
  (e: 'dropdownReachBottom'): void;
}>();
const { options, virtualListProps } = toRefs(props);
// 初始化虚拟滚动
const wrapperProps = ref<Record<string, any>>({});
const containerProps = ref<Record<string, any>>({});
let scrollTo: Fn;
watch(
  () => options.value.length,
  (val) => {
    console.log(val, virtualListProps.value);
    // if (val <= 0 || !virtualListProps.value?.itemHeight) return;
    const {
      // list,
      containerProps: _containerProps,
      wrapperProps: _wrapperProps,
      scrollTo: _scrollTo,
    } = useVirtualList(options, {
      overscan: virtualListProps.value.overscan ?? 10,
      itemHeight: virtualListProps.value.itemHeight ?? 36,
    });
    console.log(_containerProps, _wrapperProps, 'aa');
    containerProps.value = _containerProps;
    wrapperProps.value = _wrapperProps;
    scrollTo = _scrollTo;
  },
  {
    immediate: true,
  }
);
</script>

<style lang="less" scoped>
@import '../style/select.less';
</style>
