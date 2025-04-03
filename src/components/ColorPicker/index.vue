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
    <color-trigger :color="computedColor" :size="size" :show-text="showText" />
    <template #content>
      <color-panel />
    </template>
  </yc-trigger>
  <color-panel v-else />
</template>

<script lang="ts" setup>
import { ref, toRefs, provide } from 'vue';
import { PRESET_COLORS } from './constants';
import { ColorPickerProps, ProvideType } from './type';
import { COLOR_PICKER_PROVIDE_KEY } from '@shared/constants';
import useControlValue from '@shared/hooks/useControlValue';
import tinycolor from 'tinycolor2';
import ColorPanel from './component/ColorPanel/index.vue';
import ColorTrigger from './component/ColorTrigger.vue';
import YcTrigger from '@/components/Trigger';
defineOptions({
  name: 'ColorPicker',
});
const props = withDefaults(defineProps<ColorPickerProps>(), {
  modelValue: undefined,
  defaultValue: '#FF0000',
  format: 'hex',
  size: 'medium',
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
const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'change', value: boolean): void;
  (e: 'popupVisibleChange', value: boolean): void;
}>();
const {
  modelValue,
  defaultValue,
  format: _format,
  disabled,
  disabledAlpha,
  showText,
  showHistory,
  showPreset,
  historyColors,
  presetColors,
} = toRefs(props);
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
    const color = tinycolor(val);
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
const popupVisible = ref<boolean>(true);
// 提供属性
provide<ProvideType>(COLOR_PICKER_PROVIDE_KEY, {
  computedColor,
  baseColor,
  alpha,
  format,
  disabled,
  disabledAlpha,
  showPreset,
  presetColors,
  showHistory,
  historyColors,
  popupVisible,
});
</script>
