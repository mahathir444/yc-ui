<template>
  <yc-trigger
    v-model:popup-visible="computedVisible"
    trigger="click"
    position="bl"
    animation-name="slide-dynamic-origin"
    :popup-offset="4"
    :unmount-on-close="unmountonClose"
    :popup-container="popupContainer"
    :disabled="disabled"
    auto-fit-popup-width
    :click-out-side-ingore-fn="isCloseButton"
    v-bind="triggerProps"
    :content-style="{
      transformOrigin: TRANSFORM_ORIGIN_MAP[triggerPostion],
      ...triggerProps.contentStyle,
    }"
    @position-change="(v) => (triggerPostion = v)"
    @popup-visible-change="(v) => $emit('popupVisibleChange', v)"
  >
    <slot name="trigger">
      <div
        :class="[
          'yc-select-wrapper',
          allowSearch ? 'yc-select-allow-search' : '',
          showClearBtn ? 'yc-select-allow-clear' : '',
        ]"
        @click="handleClick"
      >
        <yc-input
          v-model="computedInputValue"
          mode="select"
          :show-input="computedVisible"
          :label-value="computedLabel"
          :placeholder="placeholder"
          :input-placeholder="computedLabel"
          :readonly="!allowSearch || loading"
          :disabled="disabled"
          :size="size"
          :error="error"
          ref="inputRef"
          class="yc-select"
          @blur="computedInputValue = ''"
          @input="handleSearch"
        >
          <!-- prefix -->
          <template v-if="$slots.prefix" #prefix>
            <slot name="prefix" />
          </template>
          <!-- suffix -->
          <template #suffix>
            <!-- loading -->
            <yc-spin
              v-if="loading"
              :size="12"
              style="color: inherit"
              class="yc-select-loading-icon"
            >
              <template v-if="$slots['loading-icon']" #icon>
                <slot name="loading-icon" />
              </template>
            </yc-spin>
            <template v-else>
              <!-- default -->
              <div class="yc-select-suffix-icon">
                <slot name="arrow-icon">
                  <yc-icon name="arrow-right" />
                </slot>
              </div>
              <!-- search -->
              <div v-if="allowSearch" class="yc-select-search-icon">
                <slot name="search-icon">
                  <yc-icon name="search" />
                </slot>
              </div>
              <!-- clear -->
              <yc-icon-button
                v-if="showClearBtn"
                name="close"
                style="color: inherit"
                class="yc-select-clear-icon"
                @click.stop="handleClear"
              />
            </template>
          </template>
        </yc-input>
      </div>
    </slot>
    <template #content>
      <!-- loading -->
      <yc-spin :loading="loading" class="yc-select-dropdown-loading">
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
          <yc-scrollbar style="max-height: 200px">
            <div class="yc-select-dropdown-list">
              <slot />
              <yc-option
                v-for="item in options"
                :key="<string>item.value"
                :value="item.value"
                :label="item.label"
                :disabled="item.disabled"
              />
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
  </yc-trigger>
</template>

<script lang="ts" setup>
import { ref, computed, toRefs, provide } from 'vue';
import { TRANSFORM_ORIGIN_MAP } from '@/components/Trigger/constants';
import { SELECT_PROVIDE_KEY } from './constants';
import { TriggerPostion } from '@/components/Trigger';
import {
  SelectProps,
  SelectValue,
  SelectOptionData,
  ProvideType,
} from './type';
import useSeletValue from '../_hooks/useSeletValue';
import { sleep } from '@/components/_utils/fn';
import YcInput, { InputInstance } from '@/components/Input';
import YcTrigger from '@/components/Trigger/index.vue';
import YcScrollbar from '@/components/Scrollbar/Scrollbar.vue';
import YcSpin from '@/components/Spin/index.vue';

import YcEmpty from '@/components/Empty/index.vue';
import YcOption from './Option.vue';
defineOptions({
  name: 'Select',
});
const props = withDefaults(defineProps<SelectProps>(), {
  multiple: false,
  modelValue: undefined,
  defaultValue: '',
  inputValue: undefined,
  defaultInputValue: '',
  size: 'medium',
  placeholder: '',
  loading: false,
  disabled: false,
  error: false,
  allowClear: false,
  allowSearch: true,
  popupContainer: 'body',
  defaultActivefirstOption: false,
  popupVisible: undefined,
  defaultPopupVisible: false,
  unmountOnClose: false,
  filterOption: (inputValue: string, option: SelectOptionData) => {
    return option?.label?.includes(inputValue);
  },
  options: () => [],
  formatLabel: (option: SelectOptionData[]) => {
    return option.map((item) => item.value).join('、');
  },
  triggerProps: () => {
    return {
      contentStyle: {},
    };
  },
  limit: 0,
  searchDelay: 500,
  showHeaderOnEmpty: false,
  showFooterOnEmpty: false,
});
const emits = defineEmits<{
  (e: 'change', value: SelectValue): void;
  (e: 'clear'): void;
  (e: 'search', value: string): void;
  (e: 'input-value-change', value: string): void;
  (e: 'update:modelValue', value: SelectValue): void;
  (e: 'update:inputValue', value: SelectValue): void;
  (e: 'update:popupVisible', value: boolean): void;
  (e: 'popupVisibleChange', value: boolean): void;
  (e: 'exceed-limit', value: SelectValue, ev?: MouseEvent): void;
}>();
const {
  modelValue,
  defaultValue,
  inputValue,
  defaultInputValue,
  allowClear,
  disabled,
  loading,
  defaultPopupVisible,
  popupVisible,
  searchDelay,
  options,
  showFooterOnEmpty,
  showHeaderOnEmpty,
  limit,
  multiple,
} = toRefs(props);
const { filterOption, formatLabel } = props;
// 当前的位置
const triggerPostion = ref<TriggerPostion>('bl');
// 输入实例
const inputRef = ref<InputInstance>();
// 处理值
const {
  computedLabel,
  computedVisible,
  computedInputValue,
  computedValue,
  optionList,
  isEmpty,
} = useSeletValue({
  popupVisible,
  defaultPopupVisible,
  modelValue,
  defaultValue,
  defaultInputValue,
  inputValue,
  formatLabel,
  emits,
});
// 是否展示清除按钮
const showClearBtn = computed(
  () =>
    allowClear.value &&
    !disabled.value &&
    !loading.value &&
    String(computedValue.value).length
);
// 提供值
provide<ProvideType>(SELECT_PROVIDE_KEY, {
  computedVisible,
  computedValue,
  computedInputValue,
  optionList,
  limit,
  multiple,
  filterOption,
  emits,
});
// 判断是否是关闭按钮,从而不关闭选项
const isCloseButton = (el: HTMLElement): boolean => {
  const classList = el.classList;
  if (classList.contains('yc-select-clear-icon')) {
    return true;
  } else if (el.tagName == 'BODY') {
    return false;
  } else {
    return isCloseButton(el.parentElement as HTMLElement);
  }
};
// 处理点击
const handleClick = async () => {
  computedVisible.value = !computedVisible.value;
  if (computedVisible.value) {
    await sleep(0);
    inputRef.value?.focus();
  } else {
    inputRef.value?.blur();
  }
};
// 处理清除
const handleClear = () => {
  computedValue.value = '';
  emits('clear');
};
//处理搜索
const handleSearch = async (v: string) => {
  await sleep(searchDelay.value);
  emits('search', v);
};
</script>

<style lang="less" scoped>
@import '../Input/style/input.less';
@import './style/select.less';
</style>
