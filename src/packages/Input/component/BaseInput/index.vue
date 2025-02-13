<template>
  <div
    class="yc-input-wrapper"
    :class="{
      'yc-input-disabled': disabled,
      'yc-input-hoverable': !disabled,
      'yc-input-error': error,
    }"
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
      :value="computedValue"
      type="text"
      :class="['yc-input', SIZE_CLASS[size]]"
      :disabled="disabled"
      :readonly="readonly"
      :maxlength="wordMaxLength"
      :placeholder="placeholder"
      v-bind="inputAttrs"
      ref="inputRef"
      @input="handleInput"
      @change="handleChange"
      @focus="(e) => emits('focus', e)"
      @blur="(e) => emits('blur', e)"
      @keydown.enter="(e) => emits('press-enter', e)"
    />
    <!-- clear-btn -->
    <clear-button
      v-if="showClearBtn"
      class="yc-input-clear-button"
      @click="handleClear"
    />
    <!-- suffix-icon -->
    <div v-if="$slots.suffix || showLimit" class="yc-input-suffix">
      <span v-if="showLimit" class="yc-input-word-limit">
        {{}}
        /
        {{ maxLength }}
      </span>
      <slot name="suffix" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, toRefs } from 'vue';
import { SIZE_CLASS } from '../../constants';
import { SIZE_MAP } from '@/constants';
import { isUndefined } from '@/utils/is';
import { InputProps } from '../../type';
import ClearButton from '@/components/CloseButton/index.vue';
const props = withDefaults(defineProps<InputProps>(), {
  modelValue: undefined,
  defaultValue: undefined,
  size: 'medium',
  allowClear: true,
  disabled: false,
  readonly: false,
  error: false,
  showWordLimit: false,
  placeholder: '',
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
// size到px
const sizeToPx = computed(() => SIZE_MAP[size.value] + 'px');
// 是否展示字数限制
const showLimit = computed(
  () => showWordLimit.value && !isUndefined(maxLength.value)
);
// 是否展示清除按钮
const showClearBtn = computed(
  () =>
    allowClear &&
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
//
const showLength = computed(() => {
  return wordLength
    ? wordLength(computedValue.value)
    : computedValue.value.length;
});
// 处理输入
const handleInput = (e: Event) => {
  const { value } = e.target as HTMLInputElement;
  emits('input', value, e);
  emits('update:modelValue', value);
};
// 处理改变
const handleChange = (e: Event) => {
  const { value } = e.target as HTMLInputElement;
  emits('change', value, e);
  emits('update:modelValue', value);
};
// 处理清除
const handleClear = (e: MouseEvent) => {
  emits('update:modelValue', '');
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
});
</script>

<style lang="less" scoped>
@import './index.less';
</style>
