<template>
  <div
    :class="[
      'yc-input-outer',
      disabled ? 'yc-input-outer-disabled' : '',
      OUTER_SIZE_CLASS[size],
    ]"
  >
    <!-- prepend -->
    <div v-if="$slots.prepend" class="yc-input-prepend">
      <slot name="prepend" />
    </div>
    <!-- yc-input-wrapper"  -->
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
        :type="type"
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
        <span v-if="showLimit" class="yc-input-word-limit">
          {{ modelValue.length }}
          /
          {{ maxLength }}
        </span>
        <slot name="extra" />
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
import { SIZE_CLASS, OUTER_SIZE_CLASS } from './constants';
import { SIZE_MAP } from '@/constants';
import { isUndefined } from '@/utils/is';
import { InputProps } from './type';
import YcIconButton from '@/components/IconButton/index.vue';
const props = withDefaults(defineProps<InputProps>(), {
  modelValue: undefined,
  defaultValue: undefined,
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
.yc-input-outer {
  display: flex;
  &.yc-input-outer-disabled {
    cursor: not-allowed;
  }
  .yc-input-wrapper {
    flex: 1;
    border-radius: 0;
  }
  .yc-input-prepend,
  .yc-input-append {
    flex-shrink: 0;
    padding: 0 12px;
    color: rgb(29, 33, 41);
    font-weight: 400;
    white-space: nowrap;
    background-color: rgb(242, 243, 245);
    display: flex;
    align-items: center;

    &.yc-input-prepend {
      border-right: 1px solid rgb(229, 230, 235);
      border-top-left-radius: 2px;
      border-bottom-left-radius: 2px;
    }
    &.yc-input-append {
      border-left: 1px solid rgb(229, 230, 235);
      border-top-right-radius: 2px;
      border-bottom-right-radius: 2px;
    }
  }
  .yc-input-wrapper {
    cursor: text;
    padding: 0 12px;
    background-color: rgb(242, 243, 245);
    border: 1px solid transparent;
    border-radius: 2px;
    transition:
      color 0.1s cubic-bezier(0, 0, 1, 1),
      border-color 0.1s cubic-bezier(0, 0, 1, 1),
      background-color 0.1s cubic-bezier(0, 0, 1, 1);
    color: rgb(29, 33, 41);
    display: flex;
    align-items: center;
    &:focus-within {
      background-color: #fff !important;
      border-color: rgb(22, 93, 255) !important;
      box-shadow: 0 0 0 0 rgb(190, 218, 255);
    }
    .yc-input-prefix,
    .yc-input-suffix {
      flex-shrink: 0;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: rgb(78, 89, 105);
      font-size: 14px;

      .yc-input-word-limit {
        color: rgb(134, 144, 156);
        font-size: 12px;
      }

      &.yc-input-prefix {
        padding-right: 12px;
      }
      &.yc-input-suffix {
        padding-left: 12px;
      }
    }
    .yc-input-clear-button {
      visibility: hidden;
      &::before {
        background-color: rgb(201, 205, 212);
      }
    }
    .yc-input {
      flex: 1;
      cursor: inherit;
      outline: none;
      border: none;
      border-radius: 0;
      background-color: transparent;
      color: inherit;
      font-weight: 400;
      &::placeholder {
        color: rgb(134, 144, 156);
      }
    }
  }
}

.yc-input-outer-size-mini {
  font-size: 12px;
}
.yc-input-outer-size-small,
.yc-input-outer-size-medium,
.yc-input-outer-size-large {
  font-size: 14px;
}
</style>
