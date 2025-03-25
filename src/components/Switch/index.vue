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
        fontSize: '12px',
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
import { SIZE_MAP } from '@shared/constants';
import { isBoolean } from '@shared/utils/is';
import useControlValue from '@shared/hooks/useControlValue';
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
    cursor: disabled ? 'not-allowed' : 'pointer',
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
@import './style/switch.less';
</style>
