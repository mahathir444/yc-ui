<template>
  <div
    :class="{
      'yc-textarea-wrapper': true,
      'yc-textarea-disabled': disabled,
      'yc-textarea-error': error,
      'yc-textarea-hoverable': !disabled,
      'yc-textarea-auto-size': autoSize,
    }"
  >
    <div v-if="autoSize" class="yc-textarea-mirror" ref="mirrorRef">
      {{ computedValue }}
    </div>
    <textarea
      v-model="computedValue"
      :disabled="disabled"
      :readonly="readonly"
      :maxlength="maxLength"
      :placeholder="placeholder"
      :style="heightRange"
      class="yc-textarea"
      @input="(e) => handleEvent('input', e)"
      @change="(e) => handleEvent('change', e)"
      @focus="(e) => emits('focus', e)"
      @blur="(e) => emits('blur', e)"
    ></textarea>

    <!-- wordlimit -->
    <span v-if="showLimit" class="yc-input-word-limit">
      {{ computedValue.length }}
      /
      {{ maxLength }}
    </span>
    <!-- clear -->
    <yc-icon-button
      v-if="showClearBtn"
      name="close"
      class="yc-textarea-clear-button"
      @click="(e) => handleEvent('clear', e)"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, toRefs, computed } from 'vue';
import useControlValue from '../_hooks/useControlValue';
import { TextareaProps, ResizeRange } from './type';
import { isNumber } from '@/components/_utils/is';
import YcIconButton from '@/components/_components/IconButton/index.vue';
import { useElementSize } from '@vueuse/core';
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
  autoSize: true,
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
const computedValue = useControlValue<string>(
  modelValue,
  defaultValue.value,
  (val) => {
    emits('update:modelValue', val);
  }
);
// 显示字数限制
const showLimit = computed(
  () => isNumber(maxLength.value) && showWordLimit.value
);
// 显示i清楚按钮
const showClearBtn = computed(
  () =>
    allowClear.value &&
    !disabled.value &&
    !readonly.value &&
    computedValue.value.length
);
// div的ref
const mirrorRef = ref<HTMLDivElement>();
// 用div动态获取textarea的高度
const { height } = useElementSize(mirrorRef, undefined, {
  box: 'border-box',
});
// 高度范围
const heightRange = computed(() => {
  const _calcHeight = (rows: number) => {
    return rows * 14 * 1.5715 + 8;
  };
  const resizeRange = autoSize.value as ResizeRange;
  if (!resizeRange) {
    return {
      minHeight: '',
      maxHeight: '',
    };
  }
  let minRows = resizeRange?.minRows ?? 1;
  minRows = minRows <= 1 ? 1 : minRows;
  let maxRows = resizeRange?.maxRows ?? 1;
  maxRows = maxRows < minRows ? minRows : maxRows;
  const minHeight = _calcHeight(minRows);
  if (resizeRange?.maxRows) {
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
</script>

<style lang="less" scoped>
.yc-textarea-wrapper {
  position: relative;
  cursor: text;
  width: 100%;
  height: fit-content;
  background-color: rgb(242, 243, 245);
  border: 1px solid transparent;
  border-radius: 2px;
  transition:
    color 0.1s cubic-bezier(0, 0, 1, 1),
    border-color 0.1s cubic-bezier(0, 0, 1, 1),
    background-color 0.1s cubic-bezier(0, 0, 1, 1);
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5715;
  color: rgb(29, 33, 41);
  overflow: hidden;
  &:focus-within {
    background-color: #fff !important;
    border-color: rgb(22, 93, 255) !important;
    box-shadow: 0 0 0 0 rgb(190, 218, 255);
  }
  .yc-input-word-limit {
    position: absolute;
    right: 10px;
    bottom: 6px;
    user-select: none;
    color: rgb(134, 144, 156);
    font-size: 12px;
  }
  .yc-textarea-clear-button {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
  }

  .yc-textarea,
  .yc-textarea-mirror {
    display: block;
    width: 100%;
    padding: 4px 12px;
    min-height: 32px;
    cursor: inherit;
    line-height: inherit;
    color: inherit;
    outline: none;
    border: none;
    border-radius: none;
    background-color: transparent;
  }
  .yc-textarea {
    resize: vertical;
    &::placeholder {
      color: rgb(134, 144, 156);
    }
  }
  .yc-textarea-mirror {
    position: absolute;
    top: 0;
    left: 0;
    visibility: hidden;
    font-family:
      Inter,
      -apple-system,
      BlinkMacSystemFont,
      PingFang SC,
      Hiragino Sans GB,
      noto sans,
      Microsoft YaHei,
      Helvetica Neue,
      Helvetica,
      Arial,
      sans-serif;
    font-variant: normal;
    letter-spacing: normal;
    text-indent: 0;
    text-rendering: auto;
    text-transform: none;
    white-space: pre-wrap;
    overflow-wrap: break-word;
  }
}
// hoverable
.yc-textarea-hoverable {
  &:hover {
    background-color: rgb(229, 230, 235);
    border-color: transparent;
  }
  &.yc-textarea-error {
    &:hover {
      background-color: rgb(253, 205, 197);
      border-color: transparent;
    }
  }
}
// disabled
.yc-textarea-disabled {
  cursor: not-allowed;
  border-color: transparent;
  background-color: rgb(242, 243, 245);
  color: rgb(201, 205, 212);
}
// error
.yc-textarea-error {
  background-color: rgb(255, 236, 232);
  &:focus-within {
    border-color: rgb(245, 63, 63) !important;
    box-shadow: 0 0 0 0 rgb(253, 205, 197);
  }
}
// auto-size
.yc-textarea-auto-size {
  .yc-textarea {
    resize: none;
  }
}
</style>
