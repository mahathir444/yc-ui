<template>
  <yc-trigger
    v-model:popup-visible="computedVisible"
    :position="position"
    :popup-container="popupContainer"
    :popup-offset="4"
    :unmount-on-close="unmountOnClose"
    :disabled="disabled || readonly"
    trigger="click"
    animation-name="slide-dynamic-origin"
    prevent-focus
    v-bind="triggerProps"
  >
    <div
      :class="[
        'yc-picker',
        `yc-picker-size-${size}`,
        {
          'yc-picker-disabled': disabled,
          'yc-picker-error': error,
          'yc-picker-focus': computedVisible,
          'yc-picker-has-prefix': $slots.prefix,
        },
      ]"
    >
      <div v-if="$slots.prefix" class="yc-picker-prefix">
        <slot name="prefix" />
      </div>
      <div class="yc-picker-input">
        <input
          :placeholder="isArray(placeholder) ? placeholder[0] : placeholder"
          :disabled="disabled"
          :readonly="readonly"
          class="yc-picker-start-time"
        />
      </div>
      <div class="yc-picker-suffix" @click.stop="">
        <icon-button
          v-if="showClearBtn"
          :size="14"
          class="yc-picker-clear-icon"
        />
        <span class="yc-picker-suffix-icon">
          <slot name="suffix-icon">
            <icon-time />
          </slot>
        </span>
      </div>
    </div>
    <template #content>
      <div class="yc-timepicker-container"></div>
    </template>
  </yc-trigger>
</template>

<script lang="ts" setup>
import { ref, toRefs, computed } from 'vue';
import { TimePickerProps, TimePickerEmits, TimePickerSlots } from './type';
import { getGlobalConfig, useControlValue, isArray } from '@shared/utils';
import { IconButton } from '@shared/components';
import { IconTime } from '@shared/icons';
import { default as YcTrigger } from '@/components/Trigger';

defineOptions({
  name: 'TimePicker',
});
defineSlots<TimePickerSlots>();
const props = withDefaults(defineProps<TimePickerProps>(), {
  type: 'time',
  modelValue: undefined,
  defaultValue: '',
  disabled: false,
  allowClear: true,
  readonly: false,
  error: false,
  format: 'HH:mm:ss',
  placeholder: '请选择时间',
  size: undefined,
  popupContainer: undefined,
  use12Hours: false,
  disabledHours: () => [],
  disabledMinutes: () => [],
  disabledSeconds: () => [],
  hideDisabledOptions: false,
  disabledConfirm: false,
  position: 'bl',
  popupVisible: undefined,
  defaultPopupVisible: false,
  triggerProps: () => {
    return {};
  },
  unmountOnClose: false,
});
const emits = defineEmits<TimePickerEmits>();
const {
  modelValue,
  defaultValue,
  popupVisible,
  defaultPopupVisible,
  disabled,
  readonly,
  allowClear,
} = toRefs(props);
// 获取全局注入配置
const { popupContainer, size } = getGlobalConfig(props);
// 计算的值
const computedValue = useControlValue(modelValue, defaultValue.value, (val) => {
  emits('update:modelValue', val);
});
// 计算的visible
const computedVisible = useControlValue<boolean>(
  popupVisible,
  defaultPopupVisible.value,
  (val) => {
    emits('update:popupVisible', val);
    emits('popup-visible-change', val);
  }
);
// 允许清除
const showClearBtn = computed(() => {
  const base = !disabled.value && !readonly.value && allowClear.value;
  if (isArray(computedValue.value)) {
    return computedValue.value[0] && computedValue.value[1] && base;
  } else {
    return computedValue.value && base;
  }
});
</script>

<style lang="less" scoped>
// container
@import './style/time-picker.less';
.yc-timepicker-container {
  overflow: hidden;
  background-color: #fff;
  border: 1px solid rgb(229, 230, 235);
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  height: 267px;
  width: 192px;
}
</style>
