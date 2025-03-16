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
      <!-- tag-list -->
      <yc-tag
        v-for="(item, index) in computedValue"
        :key="item?.value ?? item"
        :value="item?.value ?? item"
        :closeable="item?.value ?? true"
        :bordered="item?.tagProps?.bordered ?? true"
        stop-propagation
        color="white"
        @close="(ev) => handleDel(ev, index)"
      >
        {{ item?.label ?? item }}
      </yc-tag>
      <div class="yc-input-tag-mirror" ref="mirrorRef">
        {{ computedInputValue || placeholder }}
      </div>
      <!-- input -->
      <input
        v-model="computedInputValue"
        :disabled="disabled"
        :readonly="readonly"
        :placeholder="computedValue.length ? '' : placeholder"
        :style="{
          width: `${width}px`,
        }"
        class="yc-input-tag-input"
        ref="inputRef"
        @input="(e) => $emit('input', e)"
        @change="(e) => $emit('inputValueChange', computedInputValue, e)"
        @focus="(e) => emits('focus', e)"
        @blur="handleBlur"
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
import { InputTagProps, InputTagValue, TagData } from './type';
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
  enterToCreate: true,
  formatTag: (data: TagData) => {
    return data.label ?? String(data);
  },
});
const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'update:inputValue', value: string): void;
  (e: 'inputValueChange', value: string, ev: Event): void;
  (e: 'pressEnter', ev: KeyboardEvent): void;
  (e: 'remove', ev: MouseEvent | KeyboardEvent): void;
  (e: 'clear', ev: MouseEvent): void;
  (e: 'input', ev: Event): void;
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
  enterToCreate,
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
  if (!computedInputValue.value?.trim() || !enterToCreate.value) return;
  const type =
    !computedValue.value.length || !isObject(computedValue.value[0])
      ? 'string'
      : 'object';
  if (type == 'string') {
    computedValue.value = [...computedValue.value, computedInputValue.value];
  } else {
    computedValue.value = [
      ...computedValue.value,
      {
        label: computedInputValue.value,
        value: computedInputValue.value,
        closeable: true,
        tagProps: {
          bordered: true,
        },
      },
    ];
  }
  computedInputValue.value = '';
  emits('pressEnter', e as KeyboardEvent);
};
// 处理删除
const handleDel = (e: MouseEvent | KeyboardEvent, index: number) => {
  if (computedInputValue.value.tirm()) return;
  computedValue.value = (computedValue.value as TagData[]).filter(
    (_, i: number) => i != index
  );
  emits('remove', e);
};
// 处理清除
const handleClear = (e: MouseEvent) => {
  computedValue.value = [];
  emits('clear', e);
};
// 处理失焦
const handleBlur = (e: FocusEvent) => {
  computedInputValue.value = '';
  emits('blur', e);
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
