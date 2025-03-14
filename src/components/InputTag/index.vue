<template>
  <div
    :class="[
      'yc-input-tag',
      disabled ? 'yc-input-tag-disabled' : 'yc-input-tag-hoverable',
      error ? 'yc-input-tag-error' : '',
      SIZE_CLASS[size],
    ]"
    :style="{
      minHeight: `${SIZE_MAP[size]}px`,
    }"
    @click="inputRef?.focus()"
  >
    <!-- prefix-icon -->
    <div v-if="$slots.prefix" class="yc-input-tag-prefix">
      <slot name="prefix" />
    </div>
    <!-- input -->
    <div class="yc-input-tag-inner">
      <yc-tag
        v-for="(item, index) in computedValue"
        :key="item?.value ?? item"
        :value="item?.value ?? item"
        :closeable="item?.value ?? true"
        :bordered="item?.tagProps?.bordered ?? true"
        color="white"
        @close="(ev) => handleDel(ev, index)"
      >
        {{ item?.label ?? item }}
      </yc-tag>
      <div class="yc-input-tag-mirror" ref="mirrorRef">
        {{ computedInputValue }}
      </div>
      <input
        v-model="computedInputValue"
        :disabled="disabled"
        :readonly="readonly"
        :placeholder="placeholder"
        :style="{
          width: `${width}px`,
        }"
        class="yc-input-tag-input"
        ref="inputRef"
        @change="(e) => $emit('inputValueChange', computedInputValue, e)"
        @focus="(e) => emits('focus', e)"
        @blur="
          (e) => {
            computedInputValue = '';
            emits('blur', e);
          }
        "
        @keydown.enter="handleAdd"
        @keydown.delete="(e) => handleDel(e, computedValue.length - 1)"
      />
    </div>
    <!-- clear-btn -->
    <yc-icon-button
      v-if="showClearBtn"
      name="close"
      class="yc-input-tag-clear-button"
      @click="handleClear"
    />
    <!-- suffix-icon -->
    <div v-if="$slots.suffix" class="yc-input-tag-suffix">
      <slot name="suffix" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, toRefs } from 'vue';
import { SIZE_CLASS } from './constants';
import { InputTagProps, InputTagValue } from './type';
import { SIZE_MAP } from '@/components/_constants';
import { isObject } from '@/components/_utils/is';
import { useElementSize } from '@vueuse/core';
import useControlValue from '../_hooks/useControlValue';
import YcTag from '@/components/Tag/index.vue';

defineOptions({
  name: 'InputTag',
});
const props = withDefaults(defineProps<InputTagProps>(), {
  modelValue: undefined,
  defaultValue: () => [],
  inputValue: undefined,
  defaultInputValue: '',
  size: 'medium',
  allowClear: false,
  disabled: false,
  readonly: false,
  error: false,
  placeholder: '',
});
const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'update:inputValue', value: string): void;
  (e: 'inputValueChange', value: string, ev: Event): void;
  (e: 'pressEnter', ev: KeyboardEvent): void;
  (e: 'remove', ev: MouseEvent | KeyboardEvent): void;
  (e: 'clear', ev: MouseEvent): void;
  (e: 'focus', ev: FocusEvent): void;
  (e: 'blur', ev: FocusEvent): void;
}>();
const {
  modelValue,
  defaultValue,
  inputValue,
  defaultInputValue,
  size,
  allowClear,
  disabled,
  readonly,
} = toRefs(props);
// div的ref
const mirrorRef = ref<HTMLDivElement>();
const { width } = useElementSize(mirrorRef, undefined, {
  box: 'border-box',
});
// 受控值
const computedValue = useControlValue<InputTagValue>(
  modelValue,
  defaultValue.value,
  (val) => emits('update:modelValue', val)
);
const computedInputValue = useControlValue<string>(
  inputValue,
  defaultInputValue.value,
  (val) => emits('update:inputValue', val)
);
// 是否展示清除按钮
const showClearBtn = computed(
  () =>
    allowClear.value &&
    !disabled.value &&
    !readonly.value &&
    computedValue.value.length
);
// 输入实例
const inputRef = ref<HTMLInputElement>();
// 处理新增
const handleAdd = (e: KeyboardEvent) => {
  if (computedInputValue.value == '') return;
  const type =
    !computedValue.value.length || !isObject(computedValue.value[0])
      ? 'string'
      : 'object';
  if (type == 'string') {
    computedValue.value.push(computedInputValue.value);
  } else {
    computedValue.value.push({
      label: computedInputValue.value,
      value: computedInputValue.value,
      closeable: true,
      tagProps: {
        bordered: true,
      },
    });
  }
  computedInputValue.value = '';
  emits('pressEnter', e as KeyboardEvent);
};
// 处理删除
const handleDel = (e: MouseEvent | KeyboardEvent, index: number) => {
  computedValue.value.splice(index, 1);
  emits('remove', e);
};
// 处理清除
const handleClear = (e: MouseEvent) => {
  computedValue.value = [];
  emits('clear', e);
};

// 暴露方法
defineExpose({
  focus() {
    inputRef.value?.focus();
  },
  blur() {
    inputRef.value?.blur();
  },
  getValue() {
    return computedValue.value;
  },
});
</script>

<style lang="less" scoped>
@import './index.less';
</style>
