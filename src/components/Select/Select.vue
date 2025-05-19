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
    ref="popupRef"
    v-bind="triggerProps"
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
          :placeholder="selectOptions?.[0]?.label"
          v-bind="$attrs"
          ref="inputRef"
          @click="handleEvent('focus')"
          @blur="handleEvent('blur')"
          @input="(v) => handleEvent('search', v)"
        >
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
            <select-icon
              :popup-visible="computedVisible"
              :allow-search="allowSearch"
              :loading="loading"
              :show-clear-btn="showClearBtn"
            />
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
          <!-- suffix -->
          <template #suffix>
            <select-icon
              :popup-visible="computedVisible"
              :allow-search="allowSearch"
              :loading="loading"
              :show-clear-btn="showClearBtn"
            />
          </template>
        </yc-input-tag>
      </div>
    </slot>
    <!-- dropdown -->
    <template #content>
      <select-view
        :loading="loading"
        :scrollbar="scrollbar"
        :virtual-list-props="virtualListProps"
        :show-footer-on-empty="showFooterOnEmpty"
        :show-header-on-empty="showHeaderOnEmpty"
      />
    </template>
  </yc-trigger>
</template>

<script lang="ts" setup>
import { ref, computed, toRefs } from 'vue';
import {
  SelectProps,
  SelectEmits,
  SelectSlots,
  SelectExpose,
  SelectOptionData,
} from './type';
import { sleep } from '@shared/utils';
import useContext from './hooks/useContext';
import SelectIcon from './SelectIcon.vue';
import SelectView from './SelectView.vue';
import { default as YcInput, InputInstance } from '@/components/Input';
import {
  default as YcInputTag,
  TagData,
  InputTagValue,
} from '@/components/InputTag';
import { default as YcTrigger, TriggerInstance } from '@/components/Trigger';
defineOptions({
  name: 'Select',
});
defineSlots<SelectSlots>();
const props = withDefaults(defineProps<SelectProps>(), {
  multiple: false,
  modelValue: undefined,
  defaultValue: '',
  inputValue: undefined,
  defaultInputValue: '',
  size: undefined,
  placeholder: '',
  loading: false,
  disabled: false,
  error: false,
  allowClear: false,
  allowSearch: false,
  allowCreate: false,
  maxTagCount: 0,
  popupContainer: undefined,
  bordered: true,
  defaultActivefirstOption: false,
  popupVisible: undefined,
  defaultPopupVisible: false,
  unmountOnClose: false,
  filterOption: (inputValue: string, option: SelectOptionData) => {
    return !!option?.label?.includes(inputValue);
  },
  options: () => [],
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
  virtualListProps: undefined,
});
const emits = defineEmits<SelectEmits>();
const {
  allowClear,
  disabled,
  loading,
  searchDelay,
  showFooterOnEmpty,
  showHeaderOnEmpty,
  multiple,
  allowSearch,
  virtualListProps,
} = toRefs(props);
// 输入实例
const inputRef = ref<InputInstance>();
// triggerRef
const popupRef = ref<TriggerInstance>();
// 注入值
const { provide } = useContext();
const { computedVisible, computedValue, computedInputValue, selectOptions } =
  provide(props, emits, {
    popupRef,
    inputRef,
  });
// 是否展示清除按钮
const showClearBtn = computed(() => {
  const hasValue = multiple.value
    ? computedValue.value.length
    : String(computedValue.value).length;
  return allowClear.value && !disabled.value && !loading.value && !!hasValue;
});
// 处理事件
const handleEvent = async (
  type: string,
  value: string | InputTagValue = ''
) => {
  switch (type) {
    case 'clear':
      {
        computedValue.value = multiple.value ? [] : '';
        emits('clear');
      }
      break;
    case 'search':
      {
        await sleep(searchDelay.value);
        emits('search', value as string);
      }
      break;
    case 'focus':
      {
        if (computedVisible.value) {
          return inputRef.value?.blur();
        }
        computedVisible.value = true;
        await sleep(0);
        inputRef.value?.focus();
      }
      break;
    case 'blur':
      {
        computedVisible.value = false;
        computedInputValue.value = '';
      }
      break;
    case 'updateValue':
      {
        computedValue.value = (value as InputTagValue).map(
          (item) => (item as TagData).value
        );
      }
      break;
  }
};

defineExpose<SelectExpose>({
  focus() {
    inputRef.value?.focus();
  },
  blur() {
    inputRef.value?.blur();
  },
  getPopupRef() {
    return popupRef.value as TriggerInstance;
  },
});
</script>

<style lang="less" scoped>
@import './style/select.less';
</style>
