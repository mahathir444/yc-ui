<template>
  <yc-trigger
    v-if="!hideTrigger"
    v-model:popup-visible="popupVisible"
    :popup-offset="4"
    need-transform-origin
    animation-name="slide-dynamic-origin"
    trigger="click"
    position="bl"
    v-bind="triggerProps"
    @popupVisibleChange="(v: boolean) => $emit('popupVisibleChange', v)"
  >
    <div :class="['yc-color-picker', COLOR_PICKER_SIZE_CLASS[size]]">
      <div
        class="yc-color-picker-preview"
        :style="{
          backgroundColor: computedColor,
        }"
      ></div>
      <span v-if="showText" class="yc-color-picker-value">
        {{ computedColor }}
      </span>
    </div>
    <template #content>
      <color-panel />
    </template>
  </yc-trigger>
  <color-panel v-else />
</template>

<script lang="ts" setup>
import { PRESET_COLORS } from '@shared/constants';
import { ColorPickerProps, ColorPickerEmits } from './type';
import { COLOR_PICKER_SIZE_CLASS } from '@shared/constants';
import useProvide from './hooks/useProvide';
import ColorPanel from './ColorPanel.vue';
import YcTrigger from '@/components/Trigger';

defineOptions({
  name: 'ColorPicker',
});
const props = withDefaults(defineProps<ColorPickerProps>(), {
  modelValue: undefined,
  defaultValue: '#FF0000',
  format: 'hex',
  size: undefined,
  showText: false,
  showHistory: false,
  showPreset: false,
  disabled: false,
  disabledAlpha: false,
  hideTrigger: false,
  triggerProps: () => {
    return {};
  },
  historyColors: () => [],
  presetColors: () => PRESET_COLORS,
});
const emits = defineEmits<ColorPickerEmits>();
// 注入
const { provide } = useProvide();
const { popupVisible, computedColor, size } = provide(props, emits);
</script>

<style lang="less" scoped>
@import './style/color-panel.less';
</style>
