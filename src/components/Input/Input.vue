<template>
  <div
    :class="[
      'yc-input-outer',
      isFocus ? 'yc-input-focus' : '',
      disabled ? 'yc-input-disabled' : 'yc-input-hoverable',
      error ? 'yc-input-error' : '',
      $slots.prepend ? 'yc-input-has-prepend' : '',
      $slots.append ? 'yc-input-has-append' : '',
      SIZE_CLASS[size],
    ]"
  >
    <!-- prepend -->
    <yc-prevent-focus v-if="$slots.prepend || prepend" class="yc-input-prepend">
      <slot name="prepend">
        {{ prepend }}
      </slot>
    </yc-prevent-focus>
    <!-- yc-input-wrapper"  -->
    <div
      class="yc-input-wrapper"
      :style="{
        height: `${SIZE_MAP[size]}px`,
      }"
    >
      <!-- prefix-icon -->
      <yc-prevent-focus v-if="$slots.prefix" class="yc-input-prefix">
        <slot name="prefix" />
      </yc-prevent-focus>
      <!-- input -->
      <input
        v-show="!$slots.label || ($slots.label && showInput)"
        v-model="computedValue"
        :type="type"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="_maxLength"
        :placeholder="placeholder"
        v-bind="inputAttrs"
        class="yc-input"
        ref="inputRef"
        @input="handleEvent('input', $event)"
        @change="handleEvent('change', $event)"
        @focus="handleEvent('focus', $event)"
        @blur="handleEvent('blur', $event)"
        @keydown.enter="handleEvent('keydown', $event)"
      />
      <!-- select模式下的label -->
      <yc-prevent-focus
        v-if="$slots.label"
        v-show="!showInput"
        :class="{
          'yc-input': true,
          'text-ellipsis': true,
        }"
      >
        <slot name="label" />
      </yc-prevent-focus>
      <!-- clear-btn -->
      <yc-icon-button
        v-if="showClearBtn"
        name="close"
        class="yc-input-clear-button"
        @click="handleEvent('clear', $event)"
      />
      <!-- suffix-icon -->
      <yc-prevent-focus
        v-if="$slots.suffix || $slots.extra || showLimited"
        class="yc-input-suffix"
      >
        <!-- word-limit -->
        <yc-prevent-focus
          v-if="showLimited"
          tag="span"
          class="yc-input-word-limit"
        >
          {{ curLength }}
          /
          {{ maxLength }}
        </yc-prevent-focus>
        <!-- extra -->
        <slot v-if="$slots.extra" name="extra" />
        <!-- suffix -->
        <slot name="suffix" />
      </yc-prevent-focus>
    </div>
    <!-- append -->
    <yc-prevent-focus v-if="$slots.append || append" class="yc-input-append">
      <slot name="append">
        {{ append }}
      </slot>
    </yc-prevent-focus>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, toRefs } from 'vue';
import { SIZE_CLASS } from './constants';
import { InputProps, InputEvent, InputEventType } from './type';
import { SIZE_MAP } from '@shared/constants';
import useLimitedInput from '@shared/hooks/useLimitedInput';
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
  prepend: '',
  append: '',
  wordLength: undefined,
  wordSlice: (value: string, maxLength: number) => {
    return value.slice(0, maxLength);
  },
  type: 'text',
  showInput: false,
});
const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'input', value: string, ev: Event): void;
  (e: 'change', value: string, ev: Event): void;
  (e: 'pressEnter', ev: KeyboardEvent): void;
  (e: 'keydown', ev: KeyboardEvent): void;
  (e: 'clear', ev: MouseEvent): void;
  (e: 'focus', ev: FocusEvent): void;
  (e: 'blur', ev: FocusEvent): void;
}>();
const {
  modelValue,
  defaultValue,
  size,
  showWordLimit,
  allowClear,
  disabled,
  readonly,
  maxLength,
} = toRefs(props);
const { wordLength, wordSlice } = props;
// 限制输入hooks
const {
  showLimited,
  computedValue,
  curLength,
  _maxLength,
  handleLimitedInput,
} = useLimitedInput({
  modelValue,
  defaultValue,
  maxLength,
  showWordLimit,
  wordLength,
  wordSlice,
  emits,
});
// 输入实例
const inputRef = ref<HTMLInputElement>();
// 是否聚焦
const isFocus = ref<boolean>(false);
// 是否展示清除按钮
const showClearBtn = computed(() => {
  return (
    allowClear.value &&
    !disabled.value &&
    !readonly.value &&
    computedValue.value.length
  );
});
// 处理输入，改变和清除
const handleEvent = async (type: InputEventType, e: InputEvent) => {
  // input
  if (['input', 'change'].includes(type)) {
    handleLimitedInput(e, type);
  }
  // focus
  else if (['focus', 'blur'].includes(type)) {
    isFocus.value = type == 'focus';
    emits(type as any, e as FocusEvent);
  }
  // clear
  else if (type == 'clear') {
    computedValue.value = '';
    emits('clear', e as MouseEvent);
  }
  //enter
  else if (type == 'keydown') {
    const ev = e as KeyboardEvent;
    ev.keyCode == 13 && emits('pressEnter', ev);
    emits('keydown', ev);
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
@import './style/input.less';
</style>
