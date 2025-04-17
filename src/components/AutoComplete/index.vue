<template>
  <yc-select
    :popup-visible="popupVisible"
    :options="curOptions"
    :popup-container="popupContainer"
    :trigger-props="triggerProps"
    :virtual-list-props="vistualListProps"
    hotkeys
    @dropdown-scroll="(ev) => $emit('dropdown-scroll', ev)"
    @select="(v) => handleEvent('select', null, v as string)"
    ref="selectRef"
  >
    <template #trigger>
      <slot name="trigger">
        <div class="yc-auto-complete">
          <yc-input
            v-if="type == 'input'"
            v-model="computedValue"
            :disabled="disabled"
            :allow-clear="allowClear"
            ref="inputRef"
            v-bind="$attrs"
            @change="(v) => $emit('change', v)"
            @input="(v, ev) => handleEvent('input', ev, v)"
            @clear="(ev) => handleEvent('clear', ev)"
            @focus="(ev) => handleEvent('focus', ev)"
            @blur="(ev) => handleEvent('blur', ev)"
          />
          <yc-textarea
            v-else
            v-model="computedValue"
            :disabled="disabled"
            :allow-clear="allowClear"
            enter-prevent
            show-mirror
            ref="inputRef"
            v-bind="$attrs"
            @input="(v, ev) => handleEvent('input', ev, v)"
            @focus="(ev) => handleEvent('focus', ev)"
            @blur="(ev) => handleEvent('blur', ev)"
          >
          </yc-textarea>
        </div>
      </slot>
    </template>
    <template v-if="$slots.prefix" #prefix>
      <slot name="prefix" />
    </template>
    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
  </yc-select>
</template>

<script lang="ts" setup>
import { ref, toRefs } from 'vue';
import { AutoCompleteProps } from './type';
import { sleep } from '@shared/utils';
import { useControlValue } from '@shared/hooks';
import {
  default as YcSelect,
  SelectOptionData,
  SelectOptions,
  SelectInstance,
} from '@/components/Select';
import YcTextarea, { TextareaInstance } from '@/components/Textarea';
import YcInput, { InputInstance } from '@/components/Input';
defineOptions({
  name: 'AutoComplete',
});
const props = withDefaults(defineProps<AutoCompleteProps>(), {
  modelValue: undefined,
  defaultValue: '',
  disabled: false,
  data: () => [],
  popupContainer: 'body',
  strict: false,
  filterOption: undefined,
  triggerProps: () => {
    return {};
  },
  allowClear: true,
  isSelectSetValue: true,
  isSearch: true,
  type: 'input',
});
const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'change', value: string): void;
  (e: 'search', value: string): void;
  (e: 'clear', ev?: Event): void;
  (e: 'dropdown-scroll', ev?: Event): void;
  (e: 'select', value: string): void;
  (e: 'input', value: string, ev: Event): void;
  (e: 'blur', ev: FocusEvent): void;
  (e: 'focus', ev: FocusEvent): void;
}>();
const { modelValue, defaultValue, data, strict, isSelectSetValue, isSearch } =
  toRefs(props);
const { filterOption } = props;
// inputRef
const inputRef = ref<InputInstance | TextareaInstance>();
// 选择ref
const selectRef = ref<SelectInstance>();
// visible
const popupVisible = ref<boolean>(false);
// 计算
const computedValue = useControlValue<string>(
  modelValue,
  defaultValue.value,
  (val) => {
    emits('update:modelValue', val);
  }
);
//当前的选项
const curOptions = ref<SelectOptions>(data.value);
// 默认过滤函数
const defaultFilter = (inputValue: string, option: SelectOptionData) => {
  const label = strict.value
    ? option.label
    : (option.label as string).toLowerCase();
  const value = strict.value ? inputValue : inputValue.toLowerCase();
  return label?.includes(value);
};
// 获取过滤结果
const getFilterResult = (value: string) => {
  return data.value.filter((option) => {
    return filterOption
      ? filterOption(value, option)
      : defaultFilter(value, option);
  });
};
// 处理事件
const handleEvent = async (
  type: string,
  ev: Event | FocusEvent | MouseEvent | null,
  value: string = ''
) => {
  // 输入
  if (type == 'input') {
    if (!value) {
      popupVisible.value = false;
      return;
    }
    emits('input', value, ev as Event);
    const filterOptions = getFilterResult(value);
    popupVisible.value = !!filterOptions.length;
    if (popupVisible.value && isSearch.value) {
      curOptions.value = filterOptions;
    }
    await sleep(500);
    emits('search', value);
  }
  // 选择
  else if (type == 'select') {
    popupVisible.value = false;
    if (isSelectSetValue.value) {
      computedValue.value = value;
    }
    emits('select', value);
  }
  // 聚焦
  else if (type == 'focus') {
    emits('focus', ev as FocusEvent);
  }
  // 失焦
  else if (type == 'blur') {
    popupVisible.value = false;
    emits('blur', ev as FocusEvent);
  }
  // 清空
  else if (type == 'clear') {
    computedValue.value = '';
    emits('clear', ev as MouseEvent);
  }
};

defineExpose({
  focus() {
    inputRef.value?.focus();
  },
  blur() {
    inputRef.value?.blur();
  },
  getInputRef() {
    return inputRef.value?.getInputRef();
  },
  getMirrorRef() {
    return (inputRef.value as TextareaInstance)?.getMirrorRef();
  },
  updatePosition(x: number, y: number) {
    selectRef.value?.getPopupRef()?.updatePosition(x, y);
  },
});
</script>

<style>
@import './style/auto-complete.less';
</style>
