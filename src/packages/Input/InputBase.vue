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
        @input="handleInput"
        @change="handleChange"
        @focus="(e) => emits('focus', e)"
        @blur="(e) => emits('blur', e)"
        @keydown.enter="(e) => emits('press-enter', e)"
      />
      <!-- clear-btn -->
      <yc-icon-button
        v-if="showClearBtn"
        name="close"
        class="yc-input-clear-button"
        @click="handleClear"
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
import { SIZE_MAP } from '../_constants';
import { isUndefined, isNumber } from '@/utils/is';
import { InputProps } from './type';
import YcIconButton from '../_components/IconButton/index.vue';
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
  showWordLimit: false,
  placeholder: '',
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
// 受控制的值
const controlValue = ref<string>(defaultValue.value);
// 计算值
const computedValue = computed({
  get() {
    return !isUndefined(modelValue.value)
      ? modelValue.value
      : controlValue.value;
  },
  set(val) {
    if (!isUndefined(modelValue.value)) {
      emits('update:modelValue', val);
    } else {
      controlValue.value = val;
    }
  },
});
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
// 处理输入
const handleInput = async (e: Event) => {
  const target = e.target as HTMLInputElement;
  const { value } = target;
  emits('input', value, e);
  if (computedValue.value != value) {
    target.value = computedValue.value;
  }
};
// 处理改变
const handleChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const { value } = target;
  emits('change', value, e);
  if (computedValue.value != value) {
    target.value = computedValue.value;
  }
};
// 处理清除
const handleClear = (e: MouseEvent) => {
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
