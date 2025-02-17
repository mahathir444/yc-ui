<template>
  <div
    :class="[
      'yc-input-outer',
      disabled ? 'yc-input-disabled' : 'yc-input-hoverable',
      error ? 'yc-input-error' : '',
      SIZE_CLASS[size],
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
        height: sizeToPx,
      }"
    >
      <!-- prefix-icon -->
      <div v-if="$slots.prefix" class="yc-input-prefix">
        <slot name="prefix" />
      </div>
      <!-- input -->
      <input
        :value="isControl ? computedValue : controlValue"
        :type="type"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="wordMaxLength"
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
          {{ modelValue.length }}
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
import { ref, computed, toRefs, watch } from 'vue';
import { SIZE_CLASS } from './constants';
import { SIZE_MAP } from '@/constants';
import { isUndefined, isFunction } from '@/utils/is';
import { InputProps } from './type';
import YcIconButton from '@/components/IconButton/index.vue';
const props = withDefaults(defineProps<InputProps>(), {
  modelValue: undefined,
  defaultValue: undefined,
  size: 'medium',
  allowClear: true,
  disabled: false,
  readonly: false,
  error: true,
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
const { wordLength } = props;
// 输入实例
const inputRef = ref<HTMLInputElement>();
// 计算值
const computedValue = computed(() => {
  if (!isUndefined(modelValue.value)) return modelValue.value;
  if (!isUndefined(defaultValue.value)) return defaultValue.value;
  return '';
});
//是否受控
const isControl = computed(() => !isUndefined(modelValue.value));
// 受控制的值
const controlValue = ref<string>('');
// size到px
const sizeToPx = computed(() => SIZE_MAP[size.value] + 'px');
// 是否展示字数限制
const showLimit = computed(
  () => isFunction(maxLength.value) && showWordLimit.value
);
// 是否展示清除按钮
const showClearBtn = computed(
  () =>
    allowClear.value &&
    !disabled.value &&
    !readonly.value &&
    computedValue.value.length
);
// 最大长度
const wordMaxLength = computed(() => {
  if (isUndefined(maxLength.value)) {
    return maxLength.value;
  }
  if (wordLength) {
    return wordLength(new Array(maxLength.value).fill('1').join(''));
  }
  return maxLength.value;
});
// 是否展示
const showLength = computed(() => {
  return wordLength
    ? wordLength(computedValue.value)
    : computedValue.value.length;
});
// 处理输入
const handleInput = (e: Event) => {
  const { value } = e.target as HTMLInputElement;
  emits('input', value, e);
  if (isControl.value) {
    emits('update:modelValue', value);
  } else {
    controlValue.value = value;
  }
};
// 处理改变
const handleChange = (e: Event) => {
  const { value } = e.target as HTMLInputElement;
  emits('change', value, e);
  if (isControl.value) {
    emits('update:modelValue', value);
  } else {
    controlValue.value = value;
  }
};
// 处理清除
const handleClear = (e: MouseEvent) => {
  emits('clear', e);
  if (isControl.value) {
    emits('update:modelValue', '');
  } else {
    controlValue.value = '';
  }
};
// 赋予初始值
watch(
  computedValue,
  (v) => {
    controlValue.value = v;
  },
  {
    immediate: true,
  }
);
// 暴露方法
defineExpose({
  focus() {
    inputRef.value?.focus();
  },
  blur() {
    inputRef.value?.blur();
  },
  getValue() {
    return isControl.value ? computedValue.value : controlValue.value;
  },
});
</script>

<style lang="less" scoped>
@import './index.less';
</style>
