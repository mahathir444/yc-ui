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
        :closeable="item?.closeable ?? true"
        :bordered="item?.tagProps?.bordered ?? true"
        stop-propagation
        color="white"
        @close="(e) => handleEvent('close', e, index)"
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
        @blur="(e) => handleEvent('blur', e)"
        @keydown.enter="(e) => handleEvent('create', e)"
        @keydown.delete="(e) => handleEvent('del', e, computedValue.length - 1)"
      />
    </div>
    <!-- clear-btn -->
    <yc-icon-button
      v-if="showClearBtn"
      name="close"
      class="yc-input-tag-clear-button"
      @click="(e) => handleEvent('clear', e)"
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
// 处理inputTag的事件
const handleEvent = (
  type: string,
  e: MouseEvent | KeyboardEvent | FocusEvent,
  index: number = 0
) => {
  const inputVal = computedInputValue.value?.trim();
  if (type == 'create') {
    if (!inputVal || !enterToCreate.value) {
      return;
    }
    // 处理添加tag的类型
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
  } else if (type == 'close' || type == 'del') {
    if ((type == 'del' && inputVal) || index == -1) {
      return;
    }
    computedValue.value = (computedValue.value as TagData[]).filter(
      (_, i: number) => i != index
    );
    emits('remove', e as MouseEvent);
  } else if (type == 'clear') {
    computedValue.value = [];
    emits('clear', e as MouseEvent);
  } else if (type == 'blur') {
    computedInputValue.value = '';
    emits('blur', e as FocusEvent);
  }
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
@import './style/index.less';
</style>
