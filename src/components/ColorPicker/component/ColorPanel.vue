<template>
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
      ref="paletteRef"
    />
    <div class="yc-color-picker-panel-control">
      <div class="yc-color-picker-control-wrapper">
        <div style="display: flex; flex-direction: column; gap: 12px">
          <color-control-bar
            mode="color"
            v-model:color="computedColor"
            v-model:base-color="baseColor"
            :popup-visible="popupVisible"
            :disabled="disabled"
            ref="colorBarRef"
            @change="(v) => paletteRef?.setPosition(v)"
          />
          <div class="yc-color-picker-control-bar-bg">
            <color-control-bar
              mode="alpha"
              v-model:color="computedColor"
              v-model:alpha="alpha"
              :base-color="baseColor"
              :popup-visible="popupVisible"
              :disabled="disabled"
              ref="alphaBarRef"
            />
          </div>
        </div>
        <div
          class="yc-color-picker-preview"
          :style="{
            backgroundColor: computedColor,
          }"
        ></div>
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
    <div v-if="showHistory || showPreset" class="yc-color-picker-panel-colors">
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

<script lang="ts" setup>
import { ref, inject } from 'vue';
import { COLOR_PICKER_PROVIDE_KEY } from '@shared/constants';
import { ProvideType } from '@/components/ColorPicker/type';
import ColorPalette from './ColorPalette.vue';
import ColorInput from './ColorInput.vue';
import ColorList from './ColorList.vue';
import ColorControlBar from './ColorControlBar.vue';
import ColorPreview from './ColorPreview.vue';
const {
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
} = inject<ProvideType>(COLOR_PICKER_PROVIDE_KEY, {
  alpha: ref(0),
  computedColor: ref(''),
  baseColor: ref(''),
  disabled: ref(false),
  disabledAlpha: ref(false),
  showPreset: ref(false),
  showHistory: ref(false),
  presetColors: ref([]),
  historyColors: ref([]),
  format: ref('hex'),
  popupVisible: ref(false),
});
// 组件实例
const colorBarRef = ref<InstanceType<typeof ColorControlBar>>();
const alphaBarRef = ref<InstanceType<typeof ColorControlBar>>();
const paletteRef = ref<InstanceType<typeof ColorPalette>>();
// 处理color点击
const handleColorClick = (color: string) => {
  if (disabled.value) return;
  computedColor.value = color;
  baseColor.value = color;
  colorBarRef.value?.setPosition(color);
  alphaBarRef.value?.setPosition(color);
  paletteRef.value?.setPosition(color);
};
// 处理改变
const handleChange = (color: string, type: 'color' | 'alpha') => {
  if (type == 'alpha') {
    alphaBarRef.value?.setPosition(color);
  } else {
    colorBarRef.value?.setPosition(color);
    paletteRef.value?.setPosition(color);
  }
};
</script>

<style lang="less" scoped>
@import '../style/color-panel.less';
</style>
