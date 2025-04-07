<template>
  <div
    :class="[
      'yc-input-wrapper',
      disabled ? 'yc-input-disabled' : '',
      error ? 'yc-input-error' : '',
      SIZE_CLASS[size as Size],
    ]"
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
    <!-- suffix-icon -->
    <yc-prevent-focus
      v-if="$slots.suffix || showWordLimit || showClearBtn"
      class="yc-input-suffix"
    >
      <!-- clear-btn -->
      <yc-icon-button
        v-if="showClearBtn"
        class="yc-input-clear-button"
        @click="handleEvent('clear', $event)"
      />
      <!-- word-limit -->
      <yc-prevent-focus
        v-if="showWordLimit"
        tag="span"
        class="yc-input-word-limit"
      >
        {{ curLength }}
        /
        {{ maxLength }}
      </yc-prevent-focus>
      <!-- password -->
      <yc-icon-button
        v-if="isPassword && invisibleButton"
        size="14px"
        @click="computedVisibility = !computedVisibility"
      >
        <template #icon>
          <icon-eye-open v-if="computedVisibility" />
          <icon-eye-close v-else />
        </template>
      </yc-icon-button>
      <!-- search -->
      <yc-icon-button
        v-if="isSearch && !searchButton"
        font-size="14px"
        @click="emits('search', computedValue)"
      >
        <template #icon>
          <icon-search />
        </template>
      </yc-icon-button>
      <!-- suffix -->
      <slot name="suffix" />
    </yc-prevent-focus>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs, computed } from 'vue';
import { InputEvent, InputEventType, InputProps } from './type';
import { Size } from '@shared/type';
import { SIZE_CLASS } from './constants';
import useControlValue from '@shared/hooks/useControlValue';
import useLimitedInput from '@shared/hooks/useLimitedInput';
import { IconSearch, IconEyeOpen, IconEyeClose } from '@shared/icons';
import YcPreventFocus from '@shared/components/PreventFocus';
import YcIconButton from '@shared/components/IconButton';
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
  wordLength: (value: string) => {
    return value.length;
  },
  wordSlice: (value: string, maxLength: number) => {
    return value.slice(0, maxLength);
  },
  // password
  isPassword: false,
  visibility: undefined,
  defaultVisibility: false,
  invisibleButton: true,
  // search
  isSearch: false,
  searchButton: false,
  loading: false,
  buttonText: '',
  buttonProps: () => {
    return {};
  },
  // select
  showInput: false,
});
const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'update:visibility', value: boolean): void;
  (e: 'input', value: string, ev: Event): void;
  (e: 'change', value: string, ev: Event): void;
  (e: 'pressEnter', ev: KeyboardEvent): void;
  (e: 'keydown', ev: KeyboardEvent): void;
  (e: 'clear', ev: MouseEvent): void;
  (e: 'focus', ev: FocusEvent): void;
  (e: 'blur', ev: FocusEvent): void;
  (e: 'visibilityChange', value: boolean): void;
  (e: 'search', value: string): void;
}>();
const { visibility, defaultVisibility } = toRefs(props);
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
  if (!computedVisibility.value) {
    return 'text';
  } else {
    return 'password';
  }
});
// 限制输入hooks
const {
  computedValue,
  showWordLimit,
  showClearBtn,
  curLength,
  handleLimitedInput,
  handleComposition,
} = useLimitedInput({
  props,
  emits,
  inputRef,
});
// 处理输入，改变和清除
const handleEvent = async (type: InputEventType, e: InputEvent) => {
  // focus,blur,change
  if (['focus', 'blur', 'change'].includes(type)) {
    emits(type as any, e as FocusEvent);
  }
  // input
  else if (type == 'input') {
    handleLimitedInput(e);
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
  getInputRef() {
    return inputRef.value;
  },
  getInputValue() {
    return computedValue.value;
  },
});
</script>

<style lang="less" scoped>
@import './style/input.less';
</style>
