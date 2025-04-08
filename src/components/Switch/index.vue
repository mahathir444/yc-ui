<template>
  <button
    :class="[
      'yc-switch',
      compuedChecked ? 'yc-switch-checked' : 'yc-switch-unchecked',
      loading ? 'yc-switch-loading' : '',
      disabled ? 'yc-switch-disabled' : '',
      SHAPE_CLASS[type],
      SIZE_CLASS[size],
    ]"
    :aria-checked="compuedChecked"
    role="switch"
    @focus="$emit('focus', $event)"
    @blur="$emit('blur', $event)"
    @click="handleClick"
  >
    <span class="yc-switch-handle">
      <span class="yc-switch-handle-icon">
        <yc-spin v-if="loading" color="inherit" size="inherit" />
        <slot
          v-else
          :name="compuedChecked ? 'checked-icon' : 'unchecked-icon'"
        />
      </span>
    </span>
    <!-- placeholder -->
    <span v-if="showText" class="yc-switch-placeholder">
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
import { toRefs, computed } from 'vue';
import { SwitchProps, SwitchValue } from './type';
import { SIZE_CLASS, SHAPE_CLASS } from './constants';
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
  type: 'line',
  size: 'medium',
  checkedValue: true,
  uncheckedValue: false,
  checkedColor: 'rgba(22, 93, 255)',
  uncheckedColor: 'rgb(201, 205, 212)',
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
// switch样式
const background = computed(() =>
  compuedChecked.value ? checkedColor.value : uncheckedColor.value
);
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
  background-color: v-bind(background);
  &::after {
    background-color: v-bind(background);
  }
}
@import './style/switch.less';
</style>
