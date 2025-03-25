<template>
  <div
    :class="{
      'yc-textarea-wrapper': true,
      'yc-textarea-disabled': disabled,
      'yc-textarea-error': error,
      'yc-textarea-focus': isFocus,
      'yc-textarea-hoverable': !disabled,
      'yc-textarea-auto-size': autoSize,
    }"
  >
    <!-- moirror获取 -->
    <div v-if="autoSize" class="yc-textarea-mirror" ref="mirrorRef">
      {{ computedValue }}
    </div>
    <!-- textarea -->
    <textarea
      v-model="computedValue"
      :disabled="disabled"
      :readonly="readonly"
      :maxlength="_maxLength"
      :placeholder="placeholder"
      :style="heightRange"
      class="yc-textarea"
      @input="handleEvent('input', $event)"
      @change="handleEvent('change', $event)"
      @focus="handleEvent('focus', $event)"
      @blur="handleEvent('blur', $event)"
    ></textarea>
    <!-- wordlimit -->
    <yc-prevent-focus
      v-if="showLimited"
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
      name="close"
      class="yc-textarea-clear-button"
      @click="handleEvent('clear', $event)"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs, computed, nextTick } from 'vue';
import {
  TextareaProps,
  ResizeRange,
  TextareaEvent,
  TextareaEventType,
} from './type';
import { useElementSize } from '@vueuse/core';
import useLimitedInput from '../_/hooks/useLimitedInput';
defineOptions({
  name: 'Textarea',
});
const props = withDefaults(defineProps<TextareaProps>(), {
  modelValue: undefined,
  defaultValue: '',
  placeholder: '',
  disabled: false,
  readonly: false,
  error: false,
  maxLength: undefined,
  showWordLimit: false,
  allowClear: false,
  autoSize: false,
  wordLength: undefined,
  wordSlice: (value: string, maxLength: number) => {
    return value.slice(0, maxLength + 1);
  },
});
const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'input', value: string, ev: Event): void;
  (e: 'change', value: string, ev: Event): void;
  (e: 'clear', ev: MouseEvent): void;
  (e: 'focus', ev: FocusEvent): void;
  (e: 'blur', ev: FocusEvent): void;
}>();
const {
  modelValue,
  defaultValue,
  maxLength,
  showWordLimit,
  allowClear,
  disabled,
  readonly,
  autoSize,
} = toRefs(props);
const { wordLength, wordSlice } = props;
// 限制输入hooks
const {
  showLimited,
  computedValue,
  _maxLength,
  curLength,
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
// 是否聚焦
const isFocus = ref<boolean>(false);
// 显示i清楚按钮
const showClearBtn = computed(
  () =>
    allowClear.value &&
    !disabled.value &&
    !readonly.value &&
    !!computedValue.value.length
);
// div的ref
const mirrorRef = ref<HTMLDivElement>();
// 用div动态获取textarea的高度
const { height } = useElementSize(mirrorRef, undefined, {
  box: 'border-box',
});
// 高度范围
const heightRange = computed(() => {
  const resizeRange = autoSize.value as ResizeRange;
  if (!resizeRange) {
    return {
      minHeight: '',
      maxHeight: '',
    };
  }
  const _calcHeight = (rows: number) => {
    return rows * 14 * 1.5715 + 8;
  };
  let minRows = resizeRange?.minRows ?? 1;
  minRows = minRows <= 1 ? 1 : minRows;
  const minHeight = _calcHeight(minRows);
  if (resizeRange?.maxRows) {
    let maxRows = resizeRange?.maxRows ?? 1;
    maxRows = maxRows < minRows ? minRows : maxRows;
    const maxHeight = _calcHeight(maxRows);
    return {
      minHeight: minHeight + 'px',
      height: (height.value > maxHeight ? maxHeight : height.value) + 'px',
    };
  }
  return {
    minHeight: minHeight + 'px',
    height: (height.value < minHeight ? minHeight : height.value) + 'px',
  };
});
// 处理输入，改变和清除
const handleEvent = async (type: TextareaEventType, e: TextareaEvent) => {
  // 输入
  if (['input', 'change'].includes(type)) {
    handleLimitedInput(e, type);
  }
  // 聚焦
  else if (['focus', 'blur'].includes(type)) {
    isFocus.value = type == 'focus';
    emits(type as any, e as FocusEvent);
  }
  // 清除
  else if (type == 'clear') {
    console.log('11');

    computedValue.value = '';
    emits('clear', e as MouseEvent);
  }
};
</script>

<style lang="less" scoped>
@import './style/textarea.less';
</style>
