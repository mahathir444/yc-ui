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
        :scrollbar-type="scrollbar ? 'virtual' : 'real'"
        @scroll="emits('dropdownScroll')"
        @reach-bottom="emits('dropdownReachBottom')"
      >
        <div class="yc-select-dropdown-list" ref="dropListRef">
          <!-- 默认插槽 -->
          <slot />
          <!-- 自己渲染的options -->
          <template v-for="option in renderOptions" :key="option.id">
            <template v-if="(option as ObjectData).isGroup">
              <yc-optgroup :label="option.label">
                <yc-option
                  v-for="v in (option as ObjectData).options"
                  :key="(v as ObjectData)[fieldKey.value]"
                  :value="(v as ObjectData)[fieldKey.value]"
                  :label="(v as ObjectData)[fieldKey.label]"
                  :disabled="(v as ObjectData)[fieldKey.disabled]"
                />
              </yc-optgroup>
            </template>
            <template v-else>
              <yc-option
                :value="(option as ObjectData)[fieldKey.value]"
                :label="(option as ObjectData)[fieldKey.label]"
                :disabled="(option as ObjectData)[fieldKey.disabled]"
              />
            </template>
          </template>
          <!-- empty -->
          <slot v-if="isEmpty" name="empty">
            <yc-empty description="暂无数据" />
          </slot>
        </div>
      </yc-scrollbar>
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
import { ref } from 'vue';
import { SelectOptions } from '../type';
import { ObjectData } from '@shared/type';
import YcOption from '../Option.vue';
import YcOptgroup from '../Optgroup.vue';
const props = defineProps<{
  options: SelectOptions;
  renderOptions: SelectOptions;
  fieldKey: Record<string, string>;
  loading: boolean;
  scrollbar: boolean;
  isEmpty: boolean;
  showHeaderOnEmpty: boolean;
  showFooterOnEmpty: boolean;
}>();
const emits = defineEmits<{
  (e: 'dropdownScroll'): void;
  (e: 'dropdownReachBottom'): void;
}>();
// const { options } = toRefs(props);
// 虚拟列表
// const {
//   containerProps,
//   wrapperProps,
//   scrollTo: scrollToTop,
// } = useVirtualList(options, {
//   overscan: 5,
//   itemHeight: 72,
// });
</script>

<style lang="less" scoped>
@import '../style/select.less';
</style>
