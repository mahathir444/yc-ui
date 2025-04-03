<template>
  <yc-trigger
    v-model:popup-visible="popupVisible"
    :popup-offset="4"
    :unmount-on-close="true"
    trigger="click"
    position="bl"
    @popupVisibleChange="(v: boolean) => $emit('popupVisibleChange', v)"
  >
    <div class="yc-color-picker">
      <div
        class="yc-color-picker-preview"
        :style="{
          backgroundColor: computedValue,
        }"
      ></div>
    </div>
    <template #content>
      <div class="yc-color-picker-panel">
        <color-palette />
        <div class="yc-color-picker-panel-control">
          <div class="yc-color-picker-control-wrapper">
            <div class="yc-color-picker-control-area">
              <color-control-bar />
              <opciaty-control-bar />
            </div>
            <color-preview />
          </div>
          <color-input />
        </div>
      </div>
    </template>
  </yc-trigger>
</template>

<script lang="ts" setup>
import { ref, toRefs, provide } from 'vue';
import { ProvideType } from './type';
import { Size } from '@shared/type';
import { COLOR_PICKER_PICKER_KEY } from '@shared/constants';
import useControlValue from '@shared/hooks/useControlValue';
import tinycolor from 'tinycolor2';
import ColorControlBar from './component/ColorControlBar.vue';
import ColorPreview from './component/ColorPreview.vue';
import ColorPalette from './component/ColorPalette.vue';
import OpciatyControlBar from './component/OpacityControlBar.vue';
import ColorInput from './component/ColorInput.vue';
import YcTrigger from '@/components/Trigger';
defineOptions({
  name: 'ColorPicker',
});
const props = withDefaults(
  defineProps<{
    modelValue?: string;
    defaultValue?: string;
    format?: 'hex' | 'rgb';
    size?: Size;
  }>(),
  {
    modelValue: undefined,
    defaultValue: '#FF0000',
    format: 'hex',
    size: 'medium',
  }
);
const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'change', value: boolean): void;
  (e: 'popupVisibleChange', value: boolean): void;
}>();
const { modelValue, defaultValue, format: _format } = toRefs(props);
// 当前的format
const format = useControlValue<string>(ref(undefined), _format.value);
// 控制值
const computedValue = useControlValue<string>(
  modelValue,
  defaultValue.value,
  (val) => {
    emits('update:modelValue', val);
    emits('change', val);
  },
  (val) => {
    if (format.value == 'hex') {
      if (!val.includes('rgb')) {
        return val;
      }
      const color = tinycolor(val);
      return color.toHex();
    } else {
      if (val.includes('rgb')) {
        return val;
      }
      const color = tinycolor(val);
      return color.toRgbString();
    }
  }
);
// visible
const popupVisible = ref<boolean>(false);
// 基础颜色
const baseColor = ref<string>(computedValue.value);
// 透明度
const alpha = ref<number>(100);
// 提供数据
provide<ProvideType>(COLOR_PICKER_PICKER_KEY, {
  computedValue,
  baseColor,
  alpha,
  format,
  popupVisible,
});
</script>

<style lang="less" scoped>
.yc-color-picker {
  cursor: pointer;
  height: 32px;
  width: 32px;
  padding: 4px;
  display: inline-flex;
  align-items: center;
  background-color: rgb(242, 243, 245);
  border-radius: 2px;
  &:hover {
    background-color: rgb(229, 230, 235);
  }
  .yc-color-picker-preview {
    width: 100%;
    height: 100%;
  }
}

.yc-color-picker-panel {
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
      .yc-color-picker-control-area {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
    }
  }
}
</style>
