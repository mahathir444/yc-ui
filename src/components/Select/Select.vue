<template>
  <!-- :click-out-side-ingore-fn="ingoreFn" -->
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
        :class="{
          'yc-select': true,
          'yc-select-allow-search': allowSearch,
          'yc-select-allow-clear': showClearBtn,
          'yc-select-no-border': !bordered,
          'yc-select-multiple': multiple,
          'yc-select-multiple-focus': multiple && computedVisible,
        }"
        :group-id="groupId"
        @click="handleClick"
      >
        <!-- single  -->
        <yc-input
          v-if="!multiple"
          :show-input="computedVisible"
          v-model="computedInputValue"
          :placeholder="selectOptions?.[0]?.label"
          :readonly="!allowSearch || loading"
          :disabled="disabled"
          :size="size"
          :error="error"
          ref="inputRef"
          @blur="computedInputValue = ''"
          @input="handleSearch"
        >
          <!-- prefix -->
          <template v-if="$slots.prefix" #prefix>
            <slot name="prefix" />
          </template>
          <template #label>
            <span
              :style="{
                color: selectOptions?.[0]?.label ? '' : 'rgb(134, 144, 156)',
              }"
            >
              {{ selectOptions?.[0]?.label || placeholder }}
            </span>
          </template>
          <!-- suffix -->
          <template #suffix>
            <select-icon
              :show-clear-btn="showClearBtn"
              :allow-clear="allowClear"
              :allow-search="allowSearch"
              :loading="loading"
              @clear="handleClear"
            >
              <template v-if="$slots['loading-icon']" #loading-icon>
                <slot name="loading-icon" />
              </template>
            </select-icon>
          </template>
        </yc-input>
        <!-- multiple -->
        <yc-input-tag
          v-else
          v-model:input-value="computedInputValue"
          :model-value="selectOptions"
          :placeholder="placeholder"
          :readonly="!allowSearch || loading"
          :disabled="disabled"
          :size="size"
          :error="error"
          :max-tag-count="maxTagCount"
          :tag-nowrap="tagNowrap"
          :enter-to-create="false"
          :stop-propagation="false"
          ref="inputRef"
          @update:model-value="
            (v) => (computedValue = v.map((item) => (item as TagData).value))
          "
          @input="(v) => handleSearch(v)"
          @remove="focus"
        >
          <!-- prefix -->
          <template v-if="$slots.prefix" #prefix>
            <slot name="prefix" />
          </template>
          <!-- suffix -->
          <template #suffix>
            <select-icon
              :show-clear-btn="showClearBtn"
              :allow-clear="allowClear"
              :allow-search="allowSearch"
              :loading="loading"
              @clear="handleClear"
            >
              <template v-if="$slots['loading-icon']" #loading-icon>
                <slot name="loading-icon" />
              </template>
            </select-icon>
          </template>
        </yc-input-tag>
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
          <yc-scrollbar
            style="max-height: 200px"
            :scrollbar-type="scrollbar ? 'virtual' : 'real'"
            @scroll="$emit('dropdownScroll')"
          >
            <div class="yc-select-dropdown-list">
              <slot />
              <render-option
                v-for="option in renderOptions"
                :key="option.id"
                :option="option"
                :field-key="fieldKey"
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
import { SELECT_PROVIDE_KEY } from '@/components/_constants';
import { TriggerPostion } from '@/components/Trigger';
import { ObjectData } from '@/components/_type';
import {
  SelectProps,
  SelectValue,
  SelectOptionData,
  ProvideType,
} from './type';
import { nanoid } from 'nanoid';
import { TagData } from '@/components/InputTag';
import useSeletValue from '../_hooks/useSeletValue';
import { sleep } from '@/components/_utils/fn';
import YcInput, { InputInstance } from '@/components/Input';
import YcTrigger from '@/components/Trigger/index.vue';
import YcScrollbar from '@/components/Scrollbar/Scrollbar.vue';
import YcSpin from '@/components/Spin/index.vue';
import YcInputTag from '@/components/InputTag/index.vue';
import YcEmpty from '@/components/Empty/index.vue';
import SelectIcon from './component/SelectIcon.vue';
import RenderOption from './component/RenderOption.vue';
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
  allowClear: true,
  allowSearch: true,
  maxTagCount: 0,
  popupContainer: 'body',
  bordered: true,
  defaultActivefirstOption: false,
  popupVisible: undefined,
  defaultPopupVisible: false,
  unmountOnClose: false,
  filterOption: (inputValue: string, option: SelectOptionData) => {
    return option?.label?.includes(inputValue);
  },
  options: () => [],
  formatLabel: undefined,
  valueKey: '',
  triggerProps: () => {
    return {
      contentStyle: {},
    };
  },
  limit: 0,
  fieldNames: () => {
    return {
      label: 'label',
      value: 'value',
      disabled: 'disabled',
      tagProps: 'tagProps',
    };
  },
  scrollbar: true,
  searchDelay: 500,
  showHeaderOnEmpty: false,
  showFooterOnEmpty: false,
  tagNowrap: false,
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
  (e: 'exceedLimit', value: SelectValue, ev?: MouseEvent): void;
  (e: 'dropdownScroll'): void;
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
  showFooterOnEmpty,
  showHeaderOnEmpty,
  limit,
  multiple,
  fieldNames,
  allowSearch,
  valueKey,
  options: _options,
} = toRefs(props);
const { filterOption, formatLabel } = props;
// 当前的位置
const triggerPostion = ref<TriggerPostion>('bl');
// 输入实例
const inputRef = ref<InputInstance>();
// groupId
const groupId = nanoid();
// 处理值
const {
  renderOptions,
  fieldKey,
  selectOptions,
  isEmpty,
  computedVisible,
  computedInputValue,
  computedValue,
} = useSeletValue({
  popupVisible,
  defaultPopupVisible,
  modelValue,
  defaultValue,
  defaultInputValue,
  inputValue,
  multiple,
  _options,
  fieldNames,
  formatLabel,
  emits,
  getValue,
});
// 是否展示清除按钮
const showClearBtn = computed(
  () =>
    allowClear.value &&
    !disabled.value &&
    !loading.value &&
    !!String(computedValue.value).length
);
// 提供值
provide<ProvideType>(SELECT_PROVIDE_KEY, {
  computedVisible,
  computedValue,
  computedInputValue,
  limit,
  multiple,
  focus,
  filterOption,
  emits,
  getValue,
});
// 获取value
function getValue(value: string | ObjectData) {
  return (value as ObjectData)[valueKey.value] ?? value;
}
async function focus() {
  if (!allowSearch.value) return;
  await sleep(0);
  inputRef.value?.focus();
}
// 判断是否是关闭按钮,从而不关闭选项
const ingoreFn = (el: HTMLElement): boolean => {
  const _groupId = el.getAttribute('group-id');
  if (groupId == _groupId) {
    return true;
  } else if (el.tagName == 'BODY') {
    return false;
  } else {
    return ingoreFn(el.parentElement as HTMLElement);
  }
};
// 处理点击
const handleClick = async () => {
  computedVisible.value = multiple.value ? true : !computedVisible.value;
  await sleep(0);
  if (computedVisible.value) {
    inputRef.value?.focus();
  } else {
    inputRef.value?.blur();
  }
};
// 处理清除
const handleClear = () => {
  computedValue.value = multiple.value ? [] : '';
  emits('clear');
  focus();
};
//处理搜索
const handleSearch = async (v: string) => {
  await sleep(searchDelay.value);
  emits('search', v);
};
</script>

<style lang="less" scoped>
@import './style/select.less';
</style>
