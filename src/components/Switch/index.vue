<template>
  <button
    :class="{
      'yc-switch': true,
      'yc-switch-unchecked': !compuedChecked,
      'yc-switch-checked': compuedChecked,
      'yc-switch-loading': loading,
      'yc-switch-disabled': disabled,
      'yc-switch-type-line': type == 'line',
      'yc-switch-size-small': size == 'small',
      'yc-switch-size-medium': size == 'medium',
    }"
    :aria-checked="compuedChecked"
    :style="switchCss"
    role="switch"
    @focus="$emit('focus', $event)"
    @blur="$emit('blur', $event)"
    @click="handleClick"
  >
    <span
      class="yc-switch-handle"
      :style="{
        borderRadius: ['circle', 'line'].includes(type) ? '50%' : '2px',
      }"
    >
      <span class="yc-switch-handle-icon">
        <yc-spin v-if="loading" style="font-size: inherit; color: inherit" />
        <slot
          v-else
          :name="compuedChecked ? 'checked-icon' : 'unchecked-icon'"
        />
      </span>
    </span>
    <!-- placeholder -->
    <span
      v-if="showText"
      :style="{
        margin: compuedChecked ? '0 26px 0 8px' : '0 8px 0 26px',
        visibility: 'hidden',
      }"
    >
      {{ compuedChecked ? checkedText : uncheckedText }}
    </span>
    <!-- text -->
    <span v-if="showText" class="yc-switch-text">
      <slot :name="compuedChecked ? 'checked-text' : 'unchecked-text'">
        {{ compuedChecked ? checkedText : uncheckedText }}
      </slot>
    </span>
  </button>
</template>

<script lang="ts" setup>
import { toRefs, computed, CSSProperties } from 'vue';
import { SwitchProps, SwitchValue } from './type';
import { SIZE_MAP } from '@/components/_constants';
import { isBoolean, isUndefined } from '@/components/_utils/is';
import useControlValue from '@/components/_hooks/useControlValue';
import YcSpin from '@/components/Spin';
defineOptions({
  name: 'Switch',
});
const props = withDefaults(defineProps<SwitchProps>(), {
  modelValue: undefined,
  defaultValue: false,
  disabled: false,
  loading: false,
  type: 'circle',
  size: 'medium',
  checkedValue: true,
  uncheckedValue: false,
  checkedColor: '',
  uncheckedColor: '',
  checkedText: '',
  uncheckedText: '',
  beforeChange: () => {
    return true;
  },
});
const emits = defineEmits<{
  (e: 'update:modelValue', value: SwitchValue): void;
  (e: 'change', value: SwitchValue, ev: Event): void;
  (e: 'focus', ev: FocusEvent): void;
  (e: 'blur', ev: FocusEvent): void;
}>();
const {
  modelValue,
  defaultValue,
  checkedValue,
  uncheckedValue,
  loading,
  disabled,
  type,
  size,
  checkedText,
  uncheckedText,
  checkedColor,
  uncheckedColor,
} = toRefs(props);
const { beforeChange } = props;
// 计算值
const computedValue = useControlValue<SwitchValue>(
  modelValue,
  defaultValue.value,
  (val) => {
    emits('update:modelValue', val);
  }
);
// 是否选中
const compuedChecked = computed(() => {
  return computedValue.value == checkedValue.value;
});
// 是否展示text
const showText = computed(() => {
  const showCheckedText = compuedChecked.value && checkedText.value;
  const showUncheckedText = !compuedChecked.value && uncheckedText.value;
  return (
    type.value != 'line' &&
    size.value != 'small' &&
    (showCheckedText || showUncheckedText)
  );
});
// switchCss
const switchCss = computed(() => {
  let backgroundColor;
  if (checkedColor.value && compuedChecked.value) {
    backgroundColor = checkedColor.value;
  } else if (uncheckedColor.value && !compuedChecked.value) {
    backgroundColor = uncheckedColor.value;
  } else {
    backgroundColor = '';
  }
  return {
    backgroundColor,
    borderRadius: type.value == 'round' ? '2px' : `${SIZE_MAP[size.value]}px`,
  } as CSSProperties;
});
// 处理beforeChange
const handleBeforeChange = async (newValue: SwitchValue) => {
  let isChange = true;
  const changeResult = beforeChange(newValue);
  if (isBoolean(changeResult)) {
    isChange = changeResult;
  } else if (changeResult instanceof Promise) {
    try {
      const _isChange = await changeResult;
      if (isBoolean(_isChange)) {
        isChange = _isChange;
      }
    } catch {
      isChange = false;
    }
  }
  return isChange;
};
// 处理点击
const handleClick = async (e: Event) => {
  if (loading.value || disabled.value) return;
  const newValue = compuedChecked.value
    ? uncheckedValue.value
    : checkedValue.value;
  // 处理是否发生改变
  const isChange = await handleBeforeChange(newValue);
  if (!isChange) return;
  computedValue.value = newValue;
  emits('change', newValue, e);
};
</script>

<style lang="less" scoped>
.yc-switch {
  cursor: pointer;
  overflow: hidden;
  position: relative;
  padding: 0;
  vertical-align: middle;
  outline: none;
  border: none;
  transition: background-color 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
  .yc-switch-handle {
    z-index: 1;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    transition: all 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    .yc-switch-handle-icon {
      font-size: inherit;
    }
  }
  .yc-switch-text {
    position: absolute;
  }
}
// unchecked
.yc-switch-unchecked {
  background-color: rgb(201, 205, 212);
  &::after {
    background-color: rgb(201, 205, 212);
  }
  .yc-switch-handle {
    background-color: #fff;
    color: rgb(229, 230, 235);
  }
  .yc-switch-text {
    left: 26px;
    color: #fff;
  }
}
// checked
.yc-switch-checked {
  background-color: rgba(22, 93, 255);
  &::after {
    background-color: rgba(22, 93, 255);
  }
  .yc-switch-handle {
    background-color: #fff;
    color: rgb(22, 93, 255);
  }
  .yc-switch-text {
    left: 8px;
    color: #fff;
  }
}
// loading disabled
.yc-switch-loading,
.yc-switch-disabled {
  &.yc-switch-disabled {
    cursor: not-allowed;
  }
  &.yc-switch-unchecked {
    background-color: rgb(242, 243, 245);
    &::after {
      background-color: rgb(242, 243, 245);
    }
    .yc-switch-handle {
      color: rgb(229, 230, 235);
    }
    .yc-switch-text {
      color: #fff;
    }
  }
  &.yc-switch-checked {
    background-color: rgb(148, 191, 255);
    &::after {
      background-color: rgb(148, 191, 255);
    }
    .yc-switch-handle {
      color: rgb(148, 191, 255);
    }
    .yc-switch-text {
      color: rgb(232, 243, 255);
    }
  }
}
// size
.yc-switch-size-small {
  min-width: 28px;
  height: 16px;
  line-height: 16px;
  .yc-switch-handle {
    left: 2px;
    width: 12px;
    height: 12px;
    font-size: 8px;
  }
  &.yc-switch-checked {
    .yc-switch-handle {
      left: calc(100% - 14px);
    }
  }
}
.yc-switch-size-medium {
  min-width: 40px;
  height: 24px;
  line-height: 24px;
  .yc-switch-handle {
    left: 4px;
    width: 16px;
    height: 16px;
    font-size: 12px;
  }
  &.yc-switch-checked {
    .yc-switch-handle {
      left: calc(100% - 20px);
    }
  }
}

.yc-switch-type-line {
  background: transparent;
  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 6px;
    border-radius: 3px;
  }
  .yc-switch-handle {
    box-shadow: 0 1px 3px rgb(134, 144, 156);
  }
  &.yc-switch-size-small {
    min-width: 28px;
    height: 16px;
    line-height: 16px;
    .yc-switch-handle {
      width: 16px;
      height: 16px;
    }
    &.yc-switch-type-line {
      .yc-switch-handle {
        left: calc(100% - 16px);
      }
    }
  }
  &.yc-switch-size-medium {
    min-width: 36px;
    overflow: unset;
    .yc-switch-handle {
      left: 0;
      width: 20px;
      height: 20px;
    }
    &.yc-switch-type-line {
      .yc-switch-handle {
        left: calc(100% - 20px);
      }
    }
  }
}
</style>
