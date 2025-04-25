<template>
  <yc-select
    :popup-visible="popupVisible"
    :options="curOptions"
    :popup-container="popupContainer"
    :trigger-props="triggerProps"
    :virtual-list-props="vistualListProps"
    hotkeys
    ref="selectRef"
    @dropdown-scroll="(ev) => $emit('dropdown-scroll', ev)"
    @dropdown-reach-bottom="(ev) => $emit('dropdown-reach-bottom', ev)"
    @select="(v) => handleEvent('select', null, v as string)"
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
            @input="(v, ev) => handleEvent('input', ev, v)"
            @change="(v) => $emit('change', v)"
            @focus="(ev) => handleEvent('focus', ev)"
            @keydown="(ev) => handleEvent('keydown', ev)"
            @blur="(ev) => handleEvent('blur', ev)"
            @clear="(ev) => handleEvent('clear', ev)"
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
            @change="(v) => $emit('change', v)"
            @clear="(ev) => handleEvent('clear', ev)"
            @keydown="(ev) => $emit('keydown', ev)"
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
    <template v-if="$slots.option" #option>
      <slot name="option" />
    </template>
    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
  </yc-select>
</template>

<script lang="ts" setup>
import { ref, toRefs } from 'vue';
import { AutoCompleteProps, AutoCompleteEmits } from './type';
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
  popupContainer: undefined,
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
const emits = defineEmits<AutoCompleteEmits>();
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
  ev: Event | null,
  value: string = ''
) => {
  switch (type) {
    case 'input':
      {
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
      break;
    case 'select':
      {
        popupVisible.value = false;
        if (isSelectSetValue.value) {
          computedValue.value = value;
        }
        emits('select', value);
      }
      break;
    case 'focus':
      {
        emits('focus', ev as FocusEvent);
      }
      break;
    case 'blur':
      {
        popupVisible.value = false;
        emits('blur', ev as FocusEvent);
      }
      break;
    case 'clear':
      {
        computedValue.value = '';
        emits('clear', ev as MouseEvent);
      }
      break;
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
