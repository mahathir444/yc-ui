<template>
  <yc-trigger
    trigger="focus"
    position="bl"
    animation-name="slide-dynamic-origin"
    v-model:popup-visible="computedVisible"
    :popup-offset="4"
    :unmount-on-close="unmountonClose"
    :popup-container="popupContainer"
    :disabled="disabled"
    prevent-focus
    auto-fit-popup-width
    need-transform-origin
    v-bind="triggerProps"
    @popup-visible-change="(v) => $emit('popupVisibleChange', v)"
  >
    <slot name="trigger">
      <div
        :class="{
          'yc-select': true,
          'yc-select-allow-search': allowSearch,
          'yc-select-allow-clear': showClearBtn,
          'yc-select-no-border': !bordered,
        }"
      >
        <!-- single  -->
        <yc-input
          v-if="!multiple"
          v-model="computedInputValue"
          :show-input="computedVisible"
          :readonly="!allowSearch || loading"
          :disabled="disabled"
          :size="size"
          :error="error"
          :placeholder="
            isAutoCompleteMode ? placeholder : selectOptions?.[0]?.label
          "
          :allow-clear="isAutoCompleteMode && allowClear"
          v-bind="$attrs"
          ref="inputRef"
          @click="handleEvent('focus')"
          @blur="handleEvent('blur')"
          @input="(v) => handleEvent('search', v)"
        >
          <!-- prefix -->
          <template v-if="$slots.prefix" #prefix>
            <slot name="prefix" />
          </template>
          <template v-if="!isAutoCompleteMode" #label>
            <span
              :style="{
                color: selectOptions?.[0]?.label ? '' : 'rgb(134, 144, 156)',
              }"
            >
              {{ selectOptions?.[0]?.label || placeholder }}
            </span>
          </template>
          <!-- suffix -->
          <template v-if="!isAutoCompleteMode" #suffix>
            <select-icon
              :popup-visible="computedVisible"
              :show-clear-btn="showClearBtn"
              :allow-clear="allowClear"
              :allow-search="allowSearch"
              :loading="loading"
              @clear="handleEvent('clear')"
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
          :allow-create="allowCreate"
          v-bind="$attrs"
          ref="inputRef"
          @focus="handleEvent('focus')"
          @input="(v) => handleEvent('search', v)"
          @blur="handleEvent('blur')"
          @remove="() => $emit('remove')"
          @update:model-value="(v) => handleEvent('updateValue', v)"
        >
          <!-- prefix -->
          <template v-if="$slots.prefix" #prefix>
            <slot name="prefix" />
          </template>
          <!-- suffix -->
          <template #suffix>
            <select-icon
              :popup-visible="computedVisible"
              :show-clear-btn="showClearBtn"
              :allow-clear="allowClear"
              :allow-search="allowSearch"
              :loading="loading"
              @clear="handleEvent('clear')"
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
      <select-dropdown
        :options="options"
        :render-options="renderOptions"
        :field-key="fieldKey"
        :loading="loading"
        :scrollbar="scrollbar"
        :is-empty="isEmpty"
        :is-auto-complete-mode="isAutoCompleteMode"
        :show-footer-on-empty="showFooterOnEmpty"
        :show-header-on-empty="showHeaderOnEmpty"
      >
        <!-- loading -->
        <template v-if="$slots['loading-icon']" #loading-icon>
          <slot name="loading-icon" />
        </template>
        <!-- header -->
        <template v-if="$slots.header" #header>
          <slot name="header" />
        </template>
        <!-- header -->
        <template v-if="$slots.footer" #footer>
          <slot name="footer" />
        </template>
        <!-- empty -->
        <template v-if="$slots.empty" #empty>
          <slot name="empty" />
        </template>
        <slot />
      </select-dropdown>
    </template>
  </yc-trigger>
</template>

<script lang="ts" setup>
import { ref, computed, toRefs, provide } from 'vue';
import {
  SelectProps,
  SelectValue,
  SelectOptionData,
  ProvideType,
  SelectEventType,
} from './type';
import { ObjectData } from '@shared/type';
import { SELECT_PROVIDE_KEY } from '@shared/constants';
import { sleep } from '@shared/utils/fn';
import useSeletValue from '@shared/hooks/useSeletValue';
import SelectIcon from './component/SelectIcon.vue';
import SelectDropdown from './component/SelectDropdown.vue';
import YcInput, { InputInstance } from '@/components/Input';
import YcInputTag, { TagData, InputTagValue } from '@/components/InputTag';
import YcTrigger from '@/components/Trigger';
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
  allowSearch: false,
  allowCreate: false,
  maxTagCount: 0,
  popupContainer: 'body',
  bordered: true,
  defaultActivefirstOption: false,
  popupVisible: undefined,
  defaultPopupVisible: false,
  unmountOnClose: false,
  filterOption: (
    inputValue: string,
    option: SelectOptionData,
    strict: boolean = false
  ) => {
    const label = strict ? option?.label : option?.label?.toLowerCase();
    const value = strict ? inputValue : inputValue.toLowerCase();
    return label?.includes(value);
  },
  options: () => [],
  formatLabel: undefined,
  fallbackOption: undefined,
  showExtraOptions: true,
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
  isAutoCompleteMode: false,
  strict: false,
});
const emits = defineEmits<{
  (e: 'update:modelValue', value: SelectValue): void;
  (e: 'update:inputValue', value: SelectValue): void;
  (e: 'change', value: SelectValue): void;
  (e: 'input-value-change', value: string): void;
  (e: 'clear'): void;
  (e: 'remove'): void;
  (e: 'search', value: string): void;
  (e: 'update:popupVisible', value: boolean): void;
  (e: 'popupVisibleChange', value: boolean): void;
  (e: 'dropdownScroll'): void;
  (e: 'dropdownReachBottom'): void;
  (e: 'exceedLimit', value: SelectValue, ev?: MouseEvent): void;
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
  options: provideOptions,
  showExtraOptions,
  isAutoCompleteMode,
  strict,
} = toRefs(props);
const { filterOption, formatLabel, fallbackOption } = props;
// 输入实例
const inputRef = ref<InputInstance>();
// 处理值
const {
  computedVisible,
  computedValue,
  computedInputValue,
  renderOptions,
  selectOptions,
  fieldKey,
  isEmpty,
  options,
} = useSeletValue({
  popupVisible,
  defaultPopupVisible,
  modelValue,
  defaultValue,
  defaultInputValue,
  inputValue,
  multiple,
  provideOptions,
  fieldNames,
  showExtraOptions,
  fallbackOption,
  formatLabel,
  emits,
  getValue,
});
// 是否展示清除按钮
const showClearBtn = computed(() => {
  const hasValue = multiple.value
    ? computedValue.value.length
    : String(computedValue.value).length;
  return allowClear.value && !disabled.value && !loading.value && !!hasValue;
});
// 提供值
provide<ProvideType>(SELECT_PROVIDE_KEY, {
  computedValue,
  computedInputValue,
  limit,
  multiple,
  strict,
  blur,
  filterOption,
  emits,
  getValue,
});
// 获取value
function getValue(value: string | ObjectData) {
  return (value as ObjectData)?.[valueKey.value] ?? value;
}
// 失焦
function blur() {
  inputRef.value?.blur();
}
// 处理事件
const handleEvent = async (
  type: SelectEventType,
  value: string | InputTagValue = ''
) => {
  // 清除
  if (type == 'clear') {
    computedValue.value = multiple.value ? [] : '';
    emits('clear');
  }
  // 搜索
  else if (type == 'search') {
    await sleep(searchDelay.value);
    emits('search', value as string);
  }
  // 聚焦
  else if (type == 'focus') {
    if (computedVisible.value) {
      return blur();
    }
    computedVisible.value = true;
  }
  // 失焦
  else if (type == 'blur') {
    computedVisible.value = false;
    if (isAutoCompleteMode.value) {
      return;
    }
    computedInputValue.value = '';
  } else if (type == 'updateValue') {
    computedValue.value = (value as InputTagValue).map(
      (item) => (item as TagData).value
    );
  }
};

defineExpose({
  focus() {
    inputRef.value?.focus();
  },
  blur() {
    inputRef.value?.blur();
  },
});
</script>

<style lang="less" scoped>
@import './style/select.less';
</style>
