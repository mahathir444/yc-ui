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
    <color-preview :color="computedColor" :size="size" :show-text="showText" />
    <template #content>
      <color-panel />
    </template>
  </yc-trigger>
  <color-panel v-else />
</template>

<script lang="ts" setup>
import { ref, toRefs, provide } from 'vue';
import { PRESET_COLORS } from '@shared/constants';
import { ColorPickerProps, ColorPickerEmits, ColorPickerProvide } from './type';
import { parseColor } from '@shared/utils';
import { COLOR_PICKER_PROVIDE_KEY } from '@shared/constants';
import { useControlValue, useConfigProvder } from '@shared/hooks';
import ColorPanel from './component/ColorPanel.vue';
import ColorPreview from './component/ColorPreview.vue';
import YcTrigger from '@/components/Trigger';
defineOptions({
  name: 'ColorPicker',
});
const props = withDefaults(defineProps<ColorPickerProps>(), {
  modelValue: void 0,
  defaultValue: '#FF0000',
  format: 'hex',
  size: void 0,
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
const { modelValue, defaultValue, format: _format } = toRefs(props);
// 获取全局配置
const { size } = useConfigProvder(props);
// 当前的format
const format = useControlValue<string>(ref(undefined), _format.value);
// 透明度
const alpha = ref<number>(100);
// 控制值
const computedColor = useControlValue<string>(
  modelValue,
  defaultValue.value,
  (val) => {
    emits('update:modelValue', val);
    emits('change', val);
  },
  (val) => {
    const color = parseColor(val);
    const a = color.getAlpha();
    if (a != alpha.value) {
      alpha.value = a * 100;
    }
    if (format.value == 'hex') {
      return a == 1 ? color.toHexString() : color.toHex8String();
    } else {
      return color.toRgbString();
    }
  }
);
// 基础颜色
const baseColor = ref<string>(computedColor.value);
// visible
const popupVisible = ref<boolean>(false);
// 提供属性
provide<ColorPickerProvide>(COLOR_PICKER_PROVIDE_KEY, {
  props,
  emits,
  popupVisible,
  computedColor,
  baseColor,
  alpha,
  format,
});
</script>
