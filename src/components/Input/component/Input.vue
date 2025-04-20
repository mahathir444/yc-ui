<template>
  <div
    :class="[
      'yc-input-wrapper',
      disabled ? 'yc-input-disabled' : '',
      error ? 'yc-input-error' : '',
      INPUT_SIZE_CLASS[size],
    ]"
  >
    <!-- prefix-icon -->
    <yc-prevent-focus
      v-if="$slots.prefix"
      class="yc-input-prefix"
      ref="prefixRef"
    >
      <slot name="prefix" />
    </yc-prevent-focus>
    <!-- input -->
    <!---->
    <input
      v-show="!$slots.label || ($slots.label && showInput)"
      :value="computedValue"
      :type="type"
      :disabled="disabled"
      :readonly="readonly"
      :placeholder="placeholder"
      v-bind="inputAttrs"
      class="yc-input"
      ref="inputRef"
      @input="handleEvent('input', $event)"
      @change="handleEvent('change', $event)"
      @focus="handleEvent('focus', $event)"
      @blur="handleEvent('blur', $event)"
      @compositionstart="handleComposition"
      @compositionupdate="handleComposition"
      @compositionend="handleComposition"
      @keydown.enter="handleEvent('keydown', $event)"
    />
    <!-- select模式下的label -->
    <yc-prevent-focus
      v-if="$slots.label"
      v-show="!showInput"
      class="yc-input text-ellipsis"
    >
      <slot name="label" />
    </yc-prevent-focus>
    <!-- suffixIcon -->
    <input-suffix
      v-if="
        $slots.suffix ||
        showWordLimit ||
        showClearBtn ||
        (isSearch && showClearBtn) ||
        (isPassword && invisibleButton)
      "
      :cur-length="curLength"
      :max-length="maxLength"
      :computed-value="computedValue"
      :computed-visibility="computedVisibility"
      :invisible-button="invisibleButton"
      :is-password="isPassword"
      :search-button="showClearBtn"
      :is-search="isSearch"
      :show-clear-btn="showClearBtn"
      :show-word-limit="showWordLimit"
      @clear="(ev) => handleEvent('clear', ev)"
      @search="$emit('search', computedValue)"
      @visibility-change="(v) => (computedVisibility = v)"
    >
      <template v-if="$slots.suffix" #suffix>
        <slot name="suffix" />
      </template>
    </input-suffix>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs, computed, inject } from 'vue';
import { InputProps, InputProvide } from '../type';
import { INPUT_PROVIDE_KEY } from '@shared/constants';
import { RequiredDeep } from '@shared/type';
import { INPUT_SIZE_CLASS } from '@shared/constants';
import {
  useControlValue,
  useLimitedInput,
  useConfigProvder,
} from '@shared/hooks';
import InputSuffix from './InputSuffix.vue';
import { YcPreventFocus } from '@shared/components';
const { props, emits } = inject<InputProvide>(INPUT_PROVIDE_KEY, {
  props: {} as any,
  emits: () => {},
});
const {
  visibility,
  defaultVisibility,
  inputAttrs,
  disabled,
  readonly,
  showInput,
  placeholder,
  isSearch,
  isPassword,
  invisibleButton,
} = toRefs(props as RequiredDeep<InputProps>);
// 获取全局属性
const { size } = useConfigProvder(props);
// 输入实例
const inputRef = ref<HTMLInputElement>();
// 非受控的vis
const computedVisibility = useControlValue<boolean>(
  visibility,
  defaultVisibility.value,
  (val) => {
    emits('update:visibility', val);
    emits('visibilityChange', val);
  }
);
// 输入框类型
const type = computed(() => {
  return computedVisibility.value ? 'password' : 'text';
});
// 限制输入hooks
const {
  computedValue,
  showWordLimit,
  showClearBtn,
  curLength,
  maxLength,
  error,
  handleInput,
  handleComposition,
} = useLimitedInput({
  props,
  emits,
  inputRef,
});
// 处理输入，改变和清除
const handleEvent = async (
  type: 'input' | 'change' | 'clear' | 'focus' | 'blur' | 'keydown',
  e: Event | MouseEvent | FocusEvent
) => {
  // focus,blur
  if (['focus', 'blur'].includes(type)) {
    emits(type as any, e as FocusEvent);
  }
  // input
  else if (type == 'input') {
    handleInput(e);
  }
  // change
  else if (type == 'change') {
    emits('change', computedValue.value, e);
  }
  // clear
  else if (type == 'clear') {
    computedValue.value = '';
    emits('clear', e as MouseEvent);
  }
  //enter
  else if (type == 'keydown') {
    const ev = e as KeyboardEvent;
    emits('keydown', ev);
    if (ev.keyCode != 13) return;
    emits('pressEnter', ev);
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
  getInputRef() {
    return inputRef.value;
  },
  getInputValue() {
    return computedValue.value;
  },
});
</script>

<style lang="less" scoped>
@import '../style/input.less';
</style>
