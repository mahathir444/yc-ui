<template>
  <div
    :class="{
      'yc-textarea-wrapper': true,
      'yc-textarea-disabled': disabled,
      'yc-textarea-error': error,
      'yc-textarea-auto-size': autoSize,
    }"
  >
    <!-- moirror获取 -->
    <div
      v-if="autoSize || showMirror"
      class="yc-textarea-mirror"
      ref="mirrorRef"
    >
      {{ computedValue }}
    </div>
    <!-- textarea -->
    <textarea
      :value="computedValue"
      :disabled="disabled"
      :readonly="readonly"
      :placeholder="placeholder"
      :style="style"
      class="yc-textarea"
      ref="inputRef"
      @keydown.enter="(ev) => enterPrevent && ev.preventDefault()"
      @compositionstart="handleComposition"
      @compositionupdate="handleComposition"
      @compositionend="handleComposition"
      @input="handleEvent('input', $event)"
      @change="handleEvent('change', $event)"
      @focus="handleEvent('focus', $event)"
      @blur="handleEvent('blur', $event)"
    ></textarea>
    <!-- wordlimit -->
    <yc-prevent-focus
      v-if="showWordLimit"
      tag="span"
      class="yc-textarea-word-limit"
    >
      {{ curLength }}
      /
      {{ maxLength }}
    </yc-prevent-focus>
    <!-- clear -->
    <yc-icon-button
      v-if="showClearBtn"
      class="yc-textarea-clear-button"
      @click="handleEvent('clear', $event)"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs } from 'vue';
import {
  TextareaProps,
  ResizeRange,
  TextareaEvent,
  TextareaEventType,
} from './type';
import { useLimitedInput, useTextareaHeight } from '@shared/hooks';
import { YcPreventFocus, YcIconButton } from '@shared/components';
defineOptions({
  name: 'Textarea',
});
const props = withDefaults(defineProps<TextareaProps>(), {
  modelValue: undefined,
  defaultValue: '',
  placeholder: '',
  disabled: false,
  readonly: false,
  error: undefined,
  maxLength: undefined,
  showWordLimit: false,
  allowClear: false,
  autoSize: false,
  wordLength: (value: string) => {
    return value.length;
  },
  wordSlice: (value: string, maxLength: number) => {
    return value.slice(0, maxLength);
  },
  enterPrevent: false,
  showMirror: false,
});
const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'input', value: string, ev: Event): void;
  (e: 'change', value: string, ev: Event): void;
  (e: 'clear', ev: MouseEvent): void;
  (e: 'focus', ev: FocusEvent): void;
  (e: 'blur', ev: FocusEvent): void;
}>();
const { autoSize } = toRefs(props);
// 输入实例
const inputRef = ref<HTMLTextAreaElement>();
// div的ref
const mirrorRef = ref<HTMLDivElement>();
// 限制输入hooks
const {
  error,
  computedValue,
  showWordLimit,
  showClearBtn,
  curLength,
  handleInput,
  handleComposition,
} = useLimitedInput({
  props,
  emits,
  inputRef,
});
// 计算textare高度
const { style } = useTextareaHeight(mirrorRef, autoSize.value as ResizeRange);
// 处理输入，改变和清除
const handleEvent = async (type: TextareaEventType, e: TextareaEvent) => {
  // 聚焦
  if (['focus', 'blur'].includes(type)) {
    emits(type as any, e as FocusEvent);
  }
  // 输入
  else if (type == 'input') {
    handleInput(e);
  } else if (type == 'change') {
    emits('change', computedValue.value, e);
  }
  // 清除
  else if (type == 'clear') {
    computedValue.value = '';
    emits('clear', e as MouseEvent);
  }
};
// 暴露方法
defineExpose({
  getInputRef() {
    return inputRef.value;
  },
  getMirrorRef() {
    return mirrorRef.value as HTMLDivElement;
  },
  focus() {
    inputRef.value?.focus();
  },
  blur() {
    inputRef.value?.blur();
  },
});
</script>

<style lang="less" scoped>
@import './style/textarea.less';
</style>
