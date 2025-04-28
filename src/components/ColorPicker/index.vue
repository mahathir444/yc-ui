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
import { PRESET_COLORS } from '@shared/constants';
import { ColorPickerProps, ColorPickerEmits } from './type';
import useProvide from './hooks/useProvide';
import ColorPanel from './component/ColorPanel.vue';
import ColorPreview from './component/ColorPreview.vue';
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
