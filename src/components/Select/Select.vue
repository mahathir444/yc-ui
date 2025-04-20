<template>
  <yc-trigger
    v-model:popup-visible="computedVisible"
    :unmount-on-close="unmountonClose"
    :popup-container="popupContainer"
    :disabled="disabled"
    :popup-offset="4"
    trigger="focus"
    position="bl"
    animation-name="slide-dynamic-origin"
    need-transform-origin
    auto-fit-popup-width
    prevent-focus
    v-bind="triggerProps"
    ref="popupRef"
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
        <!-- 定义重用icon模板 -->
        <icon-define>
          <!-- loading -->
          <yc-spin
            v-if="loading"
            :size="12"
            prevent-focus
            class="yc-select-loading-icon"
          >
            <template v-if="$slots['loading-icon']" #icon>
              <slot name="loading-icon" />
            </template>
          </yc-spin>
          <template v-else>
            <!-- default -->
            <yc-prevent-focus class="yc-select-suffix-icon">
              <slot name="arrow-icon">
                <icon-arrow-down v-if="!popupVisible" />
                <icon-arrow-up v-else />
              </slot>
            </yc-prevent-focus>
            <!-- search -->
            <yc-prevent-focus v-if="allowSearch" class="yc-select-search-icon">
              <slot name="search-icon">
                <icon-search />
              </slot>
            </yc-prevent-focus>
            <!-- clear -->
            <yc-icon-button
              v-if="showClearBtn"
              class="yc-select-clear-icon"
              @click="$emit('clear')"
            />
          </template>
        </icon-define>
        <!-- single  -->
        <yc-input
          v-if="!multiple"
          v-model="computedInputValue"
          :show-input="computedVisible"
          :readonly="!allowSearch || loading"
          :disabled="disabled"
          :size="size"
          :error="error"
          :placeholder="selectOptions?.[0]?.label"
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
          <template #label>
            <slot name="label" :data="selectOptions[0]">
              <span
                :class="{
                  'yc-input-placeholder': !selectOptions?.[0]?.label,
                }"
              >
                {{ selectOptions?.[0]?.label || placeholder }}
              </span>
            </slot>
          </template>
          <!-- suffix -->
          <template #suffix>
            <icon-reuse />
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
          @blur="handleEvent('blur')"
          @input="(v) => handleEvent('search', v)"
          @remove="$emit('remove')"
          @update:model-value="(v) => handleEvent('updateValue', v)"
        >
          <!-- prefix -->
          <template v-if="$slots.prefix" #prefix>
            <slot name="prefix" />
          </template>
          <!-- suffix -->
          <template #suffix>
            <icon-reuse />
          </template>
        </yc-input-tag>
      </div>
    </slot>
    <!-- dropdown -->
    <template #content>
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
            :field-key="fieldKey"
            @dropdown-scroll="$emit('dropdownScroll')"
            @dropdown-reach-bottom="$emit('dropdownReachBottom')"
          >
            <template v-if="$slots.option" #option="{ data }">
              <slot name="option" :data="data" />
            </template>
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
            @dropdown-scroll="$emit('dropdownScroll')"
            @dropdown-reach-bottom="$emit('dropdownReachBottom')"
          >
            <slot />
            <template v-if="$slots.option" #option="{ data }">
              <slot name="option" :data="data" />
            </template>
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
  </yc-trigger>
</template>

<script lang="ts" setup>
import { ref, computed, toRefs, provide } from 'vue';
import {
  SelectProps,
  SelectValue,
  SelectOptionData,
  SelectProvide,
} from './type';
import { ObjectData } from '@shared/type';
import { SELECT_PROVIDE_KEY } from '@shared/constants';
import { sleep } from '@shared/utils';
import { useSelectHotkeys, useSeletValue } from '@shared/hooks';
import SelectVirtualList from './component/SelectVirtualList.vue';
import SelectList from './component//SelectList.vue';
import YcInput, { InputInstance } from '@/components/Input';
import YcInputTag, { TagData, InputTagValue } from '@/components/InputTag';
import YcTrigger, { TriggerInstance } from '@/components/Trigger';
import { YcIconButton, YcPreventFocus } from '@shared/components';
import { createReusableTemplate } from '@vueuse/core';
defineOptions({
  name: 'Select',
});
const props = withDefaults(defineProps<SelectProps>(), {
  multiple: false,
  modelValue: void 0,
  defaultValue: '',
  inputValue: void 0,
  defaultInputValue: '',
  size: void 0,
  placeholder: '',
  loading: false,
  disabled: false,
  error: false,
  allowClear: false,
  allowSearch: false,
  allowCreate: false,
  maxTagCount: 0,
  popupContainer: void 0,
  bordered: true,
  defaultActivefirstOption: false,
  popupVisible: void 0,
  defaultPopupVisible: false,
  unmountOnClose: false,
  filterOption: (inputValue: string, option: SelectOptionData) => {
    return !!option?.label?.includes(inputValue);
  },
  options: () => [],
  formatLabel: void 0,
  fallbackOption: void 0,
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
  hotKeys: false,
  virtualListProps: void 0,
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
  (e: 'select', value: SelectValue): void;
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
  virtualListProps,
  hotkeys,
} = toRefs(props);
const { filterOption, formatLabel, fallbackOption } = props;
const { reuse: IconReuse, define: IconDefine } = createReusableTemplate();
// 输入实例
const inputRef = ref<InputInstance>();
// triggerRef
const popupRef = ref<TriggerInstance>();
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
  popupRef,
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
// 初始化快捷键
const { curIndex } = useSelectHotkeys({
  computedValue,
  computedVisible,
  hotkeys,
  limit,
  multiple,
  options,
  blur,
  emits,
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
  type: 'clear' | 'search' | 'updateValue' | 'blur' | 'focus' | 'click',
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
      return inputRef.value?.blur();
    }
    computedVisible.value = true;
    await sleep(0);
    inputRef.value?.focus();
  }
  // 失焦
  else if (type == 'blur') {
    computedVisible.value = false;
    computedInputValue.value = '';
  } else if (type == 'updateValue') {
    computedValue.value = (value as InputTagValue).map(
      (item) => (item as TagData).value
    );
  }
};
// 提供值
provide<SelectProvide>(SELECT_PROVIDE_KEY, {
  computedValue,
  computedInputValue,
  limit,
  multiple,
  curIndex,
  options,
  blur,
  filterOption,
  getValue,
  emits,
});

defineExpose({
  focus() {
    inputRef.value?.focus();
  },
  blur() {
    inputRef.value?.blur();
  },
  getPopupRef() {
    return popupRef.value;
  },
});
</script>

<style lang="less" scoped>
@import './style/select.less';
</style>
