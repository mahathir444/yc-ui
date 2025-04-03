<template>
  <yc-trigger
    v-model:popup-visible="popupVisible"
    :popup-offset="4"
    trigger="click"
    position="bl"
    v-bind="triggerProps"
    @popupVisibleChange="(v: boolean) => $emit('popupVisibleChange', v)"
  >
    <color-trigger :color="computedColor" :show-text="showText" />
    <template #content>
      <div
        class="yc-color-picker-panel"
        :class="{
          'yc-color-picker-panel-disabled': disabled,
        }"
      >
        <color-palette
          v-model:color="computedColor"
          :base-color="baseColor"
          :popup-visible="popupVisible"
          :disabled="disabled"
        />
        <div class="yc-color-picker-panel-control">
          <div class="yc-color-picker-control-wrapper">
            <div style="display: flex; flex-direction: column; gap: 12px">
              <color-control-bar
                v-model:color="computedColor"
                v-model:base-color="baseColor"
                :popup-visible="popupVisible"
                :disabled="disabled"
                ref="colorBarRef"
              />
              <alpha-control-bar
                v-model:color="computedColor"
                v-model:alpha="alpha"
                :base-color="baseColor"
                :popup-visible="popupVisible"
                :disabled="disabled"
                ref="alphaBarRef"
              />
            </div>
            <color-preview :color="computedColor" />
          </div>
          <color-input
            v-model:color="computedColor"
            v-model:base-color="baseColor"
            v-model:alpha="alpha"
            v-model:format="format"
            :disabled="disabled"
            :disabled-alpha="disabledAlpha"
            @change="handleChange"
          />
        </div>
        <div class="yc-color-picker-panel-colors">
          <color-list
            v-if="showHistory"
            label="最近使用的颜色"
            :colors="historyColors"
            @color-click="handleColorClick"
          />
          <color-list
            v-if="showPreset"
            label="系统预设的颜色"
            :colors="presetColors"
            @color-click="handleColorClick"
          />
        </div>
      </div>
    </template>
  </yc-trigger>
</template>

<script lang="ts" setup>
import { ref, toRefs } from 'vue';
import { PRESET_COLORS } from './constants';
import { ColorPickerProps } from './type';
import useControlValue from '@shared/hooks/useControlValue';
import tinycolor from 'tinycolor2';
import AlphaControlBar from './component/AlphaControlBar.vue';
import ColorControlBar from './component/ColorControlBar.vue';
import ColorPreview from './component/ColorPreview.vue';
import ColorTrigger from './component/ColorTrigger.vue';
import ColorPalette from './component/ColorPalette.vue';
import ColorInput from './component/ColorInput.vue';
import ColorList from './component/ColorList.vue';
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
  showPreset: true,
  disabled: true,
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
  showText,
  disabled,
} = toRefs(props);
// 组件实例
const colorBarRef = ref<InstanceType<typeof ColorControlBar>>();
const alphaBarRef = ref<InstanceType<typeof AlphaControlBar>>();
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
// 处理color点击
const handleColorClick = (color: string) => {
  if (disabled.value) return;
  computedColor.value = color;
  baseColor.value = color;
  colorBarRef.value?.setPosition(color);
  alphaBarRef.value?.setPosition(color);
};
// 处理改变
const handleChange = (color: string, type: 'color' | 'alpha') => {
  if (type == 'alpha') {
    alphaBarRef.value?.setPosition(color);
  } else {
    colorBarRef.value?.setPosition(color);
  }
};
</script>

<style lang="less" scoped>
.yc-color-picker-panel {
  overflow: hidden;
  width: 260px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 8px 20px #0000001a;

  .yc-color-picker-panel-control {
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    .yc-color-picker-control-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  .yc-color-picker-panel-colors {
    padding: 12px;
    border-top: 1px solid rgb(229, 230, 235);
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
}
.yc-color-picker-panel-disabled {
  cursor: not-allowed;
}
</style>
