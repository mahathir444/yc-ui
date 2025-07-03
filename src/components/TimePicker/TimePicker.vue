<template>
  <yc-trigger
    :popup-visible="computedVisible"
    :position="position"
    :popup-container="popupContainer"
    :popup-offset="4"
    :unmount-on-close="unmountOnClose"
    :disabled="disabled || readonly"
    :on-click-out-side="() => (computedVisible = false)"
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
          'yc-picker-allow-clear': showClearBtn,
        },
      ]"
    >
      <!-- prefix -->
      <div v-if="$slots.prefix" class="yc-picker-prefix">
        <slot name="prefix" />
      </div>
      <!-- input -->
      <div class="yc-picker-input" @click.stop="handleOpenPicker(0)">
        <input
          :value="isArray(computedValue) ? computedValue[0] : computedValue"
          :placeholder="isArray(placeholder) ? placeholder[0] : placeholder"
          :disabled="disabled"
          :readonly="readonly"
          :ref="(el) => (inputRefs[0] = el as HTMLInputElement)"
          class="yc-picker-start-time"
        />
      </div>
      <template v-if="type == 'time-range'">
        <!-- separator -->
        <span class="yc-picker-separator"> - </span>
        <!-- input -->
        <div class="yc-picker-input" @click.stop="handleOpenPicker(1)">
          <input
            :value="isArray(computedValue) ? computedValue[1] : computedValue"
            :placeholder="isArray(placeholder) ? placeholder[1] : placeholder"
            :disabled="disabled"
            :readonly="readonly"
            :ref="(el) => (inputRefs[1] = el as HTMLInputElement)"
            class="yc-picker-start-time"
          />
        </div>
      </template>
      <!-- suffix -->
      <div class="yc-picker-suffix">
        <icon-button
          v-if="showClearBtn"
          :size="14"
          class="yc-picker-clear-icon"
          @click="handleClear"
        />
        <span class="yc-picker-suffix-icon">
          <slot name="suffix-icon">
            <icon-time />
          </slot>
        </span>
      </div>
    </div>
    <template #content>
      <time-picker-panel ref="panelRef" />
    </template>
  </yc-trigger>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { TimePickerProps, TimePickerEmits, TimePickerSlots } from './type';
import { getGlobalConfig, isArray } from '@shared/utils';
import useContext from './hooks/useContext';
import { IconButton } from '@shared/components';
import { IconTime } from '@shared/icons';
import { default as YcTrigger } from '@/components/Trigger';
import TimePickerPanel from './TimePickerPanel.vue';
defineOptions({
  name: 'TimePicker',
});
defineSlots<TimePickerSlots>();
const props = withDefaults(defineProps<TimePickerProps>(), {
  type: 'time',
  modelValue: undefined,
  defaultValue: (props) => {
    return props.type == 'time-range' ? [] : '';
  },
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
// 获取全局注入配置
const { popupContainer, size } = getGlobalConfig(props);
// 注入数据
const {
  type,
  computedValue,
  computedVisible,
  showClearBtn,
  readonly,
  disabled,
  curIndex,
  inputRefs,
} = useContext().provide(props, emits);
// panelRef
const panelRef = ref<InstanceType<typeof TimePickerPanel>>();
// 处理清除
const handleClear = () => {
  computedValue.value = type.value == 'time-range' ? [] : '';
  emits('clear');
};
// 处理打开
const handleOpenPicker = (i: number) => {
  curIndex.value = i;
  computedVisible.value = true;
  panelRef.value?.scroll(
    isArray(computedValue.value) ? computedValue.value[i] : computedValue.value
  );
};
</script>

<style lang="less" scoped>
// container
@import './style/time-picker.less';
</style>
