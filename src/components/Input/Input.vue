<template>
  <div
    :class="[
      'yc-input-outer',
      disabled ? 'yc-input-disabled' : 'yc-input-hoverable',
      error ? 'yc-input-error' : '',
      SIZE_CLASS[size],
      $slots.prepend ? 'yc-input-has-prepend' : '',
      $slots.append ? 'yc-input-has-append' : '',
    ]"
  >
    <!-- prepend -->
    <div v-if="$slots.prepend" class="yc-input-prepend">
      <slot name="prepend" />
    </div>
    <!-- yc-input-wrapper"  -->
    <div
      class="yc-input-wrapper"
      :style="{
        height: `${SIZE_MAP[size]}px`,
      }"
    >
      <!-- prefix-icon -->
      <div v-if="$slots.prefix" class="yc-input-prefix">
        <slot name="prefix" />
      </div>
      <!-- input -->
      <input
        v-model="computedValue"
        :type="type"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="maxLength"
        :placeholder="placeholder"
        class="yc-input"
        ref="inputRef"
        v-bind="inputAttrs"
        @input="handleEvent('input', $event)"
        @change="handleEvent('change', $event)"
        @focus="(e) => emits('focus', e)"
        @blur="(e) => emits('blur', e)"
        @keydown.enter="(e) => emits('press-enter', e)"
      />
      <!-- clear-btn -->
      <yc-icon-button
        v-if="showClearBtn"
        name="close"
        class="yc-input-clear-button"
        @click="handleEvent('clear', $event)"
      />
      <!-- suffix-icon -->
      <div
        v-if="$slots.suffix || $slots.extra || showLimit"
        class="yc-input-suffix"
      >
        <!-- word-limit -->
        <span v-if="showLimit" class="yc-input-word-limit">
          {{ computedValue.length }}
          /
          {{ maxLength }}
        </span>
        <!-- extra -->
        <slot v-if="$slots.extra" name="extra" />
        <!-- suffix -->
        <slot name="suffix" />
      </div>
    </div>
    <!-- append -->
    <div v-if="$slots.append" class="yc-input-append">
      <slot name="append" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, toRefs } from 'vue';
import { SIZE_CLASS } from './constants';
import { InputProps, EventType } from './type';
import { SIZE_MAP } from '@/components/_constants';
import { isNumber } from '@/components/_utils/is';
import useControlValue from '../_hooks/useControlValue';
import YcIconButton from '@/components/_components/IconButton/index.vue';
defineOptions({
  name: 'Input',
});
const props = withDefaults(defineProps<InputProps>(), {
  modelValue: undefined,
  defaultValue: '',
  size: 'medium',
  allowClear: false,
  disabled: false,
  readonly: false,
  error: false,
  maxLength: undefined,
  showWordLimit: false,
  placeholder: '',
  inputAttrs: () => {
    return {};
  },
  type: 'text',
});
const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'input', value: string, ev: Event): void;
  (e: 'change', value: string, ev: Event): void;
  (e: 'press-enter', ev: KeyboardEvent): void;
  (e: 'clear', ev: MouseEvent): void;
  (e: 'focus', ev: FocusEvent): void;
  (e: 'blur', ev: FocusEvent): void;
}>();
const {
  size,
  showWordLimit,
  maxLength,
  allowClear,
  modelValue,
  defaultValue,
  disabled,
  readonly,
} = toRefs(props);
const computedValue = useControlValue<string>(
  modelValue,
  defaultValue.value,
  (val) => emits('update:modelValue', val)
);
// 是否展示字数限制
const showLimit = computed(
  () => isNumber(maxLength.value) && showWordLimit.value
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
// 处理输入，改变和清除
const handleEvent = (type: string, e: Event | MouseEvent) => {
  if (['input', 'change'].includes(type)) {
    const target = e.target as HTMLInputElement;
    const { value } = target;
    emits(type as any, value, e);
    if (computedValue.value == value) return;
    target.value = computedValue.value;
  } else {
    computedValue.value = '';
    emits('clear', e as MouseEvent);
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
@import './index.less';
</style>
