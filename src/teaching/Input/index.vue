<template>
  <a-input
    v-model="computedValue"
    :size="size"
    :allow-clear="allowClear"
    :disabled="disabled"
    :readonly="readonly"
    :error="error"
    :max-length="maxLength"
    :show-word-limit="showWordLimit"
    :placeholder="placeholder"
    :input-attrs="inputAttrs"
    :word-length="wordLength"
    :word-slice="wordSlice"
    @input="(v, e) => $emit('input', v, e)"
    @change="(v, e) => $emit('change', v, e)"
    @press-enter="(e) => $emit('pressEnter', e)"
    @clear="(e) => $emit('clear', e)"
    @focus="(e) => $emit('focus', e)"
    @blur="(e) => $emit('blur', e)"
    class="cx-input"
  >
    <template v-if="$slots.prefix" #prefix>
      <slot name="prefix" />
    </template>
    <template v-if="$slots.suffix" #prefix>
      <slot name="suffix" />
    </template>
  </a-input>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue';
import { InputProps } from './type';
import useControlValue from '@shared/hooks/useControlValue';
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
  wordLength: undefined,
  wordSlice: undefined,
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
const { modelValue, defaultValue } = toRefs(props);
const computedValue = useControlValue<string>(
  modelValue,
  defaultValue.value,
  (val) => {
    emits('update:modelValue', val);
  }
);
</script>

<style lang="less">
.cx-input {
  padding: 0 9px;
  border-radius: 8px;
  border: 1px solid #e1e5eb;
  background: #fff;

  &:focus-visible {
    border: 1px solid #0065ff;
  }
  &:hover {
    border: 1px solid #0065ff;
    background: #fff;
    box-shadow: 0px 0px 2px 0px rgba(0, 101, 255, 0.5);
  }
  .arco-input {
    caret-color: #0065ff;
    color: #474f59;
    font-family: 'PingFang SC';
    font-size: 14px;
    font-weight: 400;
    &::placeholder {
      color: #c9ced6;
    }
  }
  .arco-input-clear-btn {
    flex-shrink: 0;
    width: 12px;
    height: 12px;
    background: url('../_shared/icons/close.svg') no-repeat;
    svg {
      display: none;
    }
    &::before {
      display: none;
    }
  }
  .arco-input-suffix {
    padding-left: 4px;
    .arco-input-word-limit {
      color: #79828f;
      font-family: 'PingFang SC';
      font-size: 12px;
      font-weight: 400;
    }
  }
}
</style>
