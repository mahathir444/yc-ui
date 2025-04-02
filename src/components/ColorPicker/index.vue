<template>
  <yc-trigger
    :popup-visible="true"
    :popup-offset="4"
    trigger="click"
    position="bl"
    ref="triggerRef"
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
        <div
          class="yc-color-picker-palette"
          ref="paletteRef"
          :style="{
            backgroundColor: baseColor,
          }"
        >
          <div
            class="yc-color-picker-handler"
            ref="btnRef"
            :style="{
              left: `${offsetX}px`,
              top: `${offsetY}px`,
            }"
          ></div>
        </div>
        <div class="yc-color-picker-panel-control">
          <div class="yc-color-picker-control-wrapper">
            <div class="yc-color-picker-control-area">
              <color-control-bar v-model:color="computedValue" />
              <opciaty-control-bar
                v-model:opacity="opacity"
                :base-color="baseColor"
                :cur-color="computedValue"
              />
            </div>
            <div
              class="yc-color-picker-preview"
              :style="{
                background: computedValue,
              }"
            ></div>
          </div>
          <div class="yc-color-picker-input-wrapper">
            <div class="yc-color-picker-format">
              <yc-select
                size="mini"
                :options="[
                  {
                    label: 'RGB',
                    value: 'rgb',
                  },
                  {
                    label: 'HEX',
                    value: 'hex',
                  },
                ]"
              />
            </div>
            <div class="yc-color-picker-color">
              <div class="yc-color-picker-color-input">
                <yc-input
                  v-model="computedValue"
                  :max-length="6"
                  size="mini"
                  text-center
                >
                  <template #prefix> # </template>
                </yc-input>
              </div>
              <yc-input-number
                v-model="opacity"
                :min="0"
                :max="100"
                size="mini"
                text-center
              >
                <template #suffix> % </template>
              </yc-input-number>
            </div>
          </div>
        </div>
      </div>
    </template>
  </yc-trigger>
</template>

<script lang="ts" setup>
import { ref, onMounted, toRefs, computed } from 'vue';
import { Size } from '@shared/type';
import { useDraggable, useEventListener, useElementSize } from '@vueuse/core';
import useControlValue from '@shared/hooks/useControlValue';
import ColorControlBar from './component/ColorControlBar.vue';
import OpciatyControlBar from './component/OpacityControlBar.vue';
import YcTrigger, { TriggerInstance } from '@/components/Trigger';
import YcSelect from '@/components/Select';
import YcInputNumber from '@/components/InputNumber';
import tinycolor from 'tinycolor2';
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
    defaultValue: 'rgb(22, 93, 255)',
    format: 'hex',
    size: 'medium',
  }
);
const emits = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'change', value: boolean, ev: Event): void;
}>();
const { modelValue, defaultValue } = toRefs(props);
// 控制值
const computedValue = useControlValue<string>(
  modelValue,
  defaultValue.value,
  (val) => {
    emits('update:modelValue', val);
  }
);
// 基础颜色
const baseColor = ref<string>('rgb(22, 93, 255)');
// 透明度
const opacity = ref<number>(100);
// btn实例
const btnRef = ref<HTMLDivElement>();
const paletteRef = ref<HTMLDivElement>();
// triggerRef
const triggerRef = ref<TriggerInstance>();
let left = ref(0);
let top = ref(0);
// dragger
const { x, y, isDragging } = useDraggable(btnRef);
const offsetX = computed(() => x.value - left.value);
const offsetY = computed(() => y.value - top.value);
const { width: paletteWidth, height: paletteHeight } = useElementSize(
  paletteRef,
  undefined,
  {
    box: 'border-box',
  }
);
// 处理hanler越界的问题
useEventListener('mousemove', () => {
  if (!isDragging.value) return;
  const minLeft = left.value;
  const maxLeft = left.value + paletteWidth.value;
  const minTop = top.value;
  const maxTop = top.value + paletteHeight.value;
  x.value = x.value < minLeft ? minLeft : x.value;
  x.value = x.value > maxLeft ? maxLeft : x.value;
  y.value = y.value < minTop ? minTop : y.value;
  y.value = y.value > maxTop ? maxTop : y.value;
  getColorFromPosition();
});

// 将操作按钮的 left/top 转换为颜色
function getColorFromPosition() {
  // 解析基础颜色
  const color = tinycolor(baseColor.value);
  // 获取当前颜色的 HSV 值
  const hsv = color.toHsv();
  // 基于 offsetX 映射到色相 (Hue)
  const hueOffset = (offsetX.value / paletteWidth.value) * 360;
  hsv.h = hueOffset % 360; // 确保色相在 [0, 360] 范围内
  // 基于 offsetY 映射到饱和度 (Saturation)
  const saturationOffset = offsetY.value / paletteHeight.value;
  hsv.s = Math.min(1, Math.max(0, saturationOffset)); // 确保饱和度在 [0, 1] 范围内
  // 转换回新的颜色
  const { r, g, b, a } = tinycolor(hsv).toRgb();
  // 转换回新的颜色
  computedValue.value = `rgba(${r},${g},${b},${a})`;
}

function getOffsetLeft() {
  return left.value;
}

// function getColor(left, maxLeft) {
//   // 方法1：线性变化
//   const k = 255 / maxLeft; // 确保颜色变化完整
//   let r = Math.max(0, 255 - k * left);
//   let g = Math.min(255, 22 + k * left);
//   let b = Math.min(255, 22 + k * left);
//   return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
// }

onMounted(() => {
  const { left: _left, top: _top } = triggerRef.value!.getOffset();
  left = _left;
  top = _top;
  const { width: btnWidth, height: btnHeight } =
    btnRef.value!.getBoundingClientRect();
  x.value = (paletteWidth.value - btnWidth) / 2 + left.value;
  y.value = (paletteHeight.value - btnHeight) / 2 + top.value;
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
  .yc-color-picker-preview {
    width: 100%;
    height: 100%;
  }
}

.yc-color-picker-panel {
  width: 260px;
  min-height: 278px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 8px 20px #0000001a;

  .yc-color-picker-palette {
    position: relative;
    cursor: pointer;
    overflow: hidden;
    width: 100%;
    height: 178px;
    background-image: linear-gradient(0deg, #000000, transparent),
      linear-gradient(90deg, #ffffff, rgba(255, 255, 255, 0));
    border: 1px solid rgb(229, 230, 235);
    border-bottom: 0;
    .yc-color-picker-handler {
      position: absolute;
      width: 16px;
      height: 16px;
      border: 2px solid #fff;
      border-radius: 50%;
      background-color: transparent;
    }
  }
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
      .yc-color-picker-preview {
        flex-shrink: 0;
        width: 40px;
        height: 40px;
        border: 1px solid rgb(229, 230, 235);
        border-radius: 4px;
        font-size: 20px;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
  .yc-color-picker-input-wrapper {
    display: flex;
    align-items: center;
    gap: 20px;
    .yc-color-picker-format {
      width: 58px;
    }
    .yc-color-picker-color {
      flex: 1;
      overflow: hidden;
      display: flex;
      .yc-color-picker-color-input {
        flex: 1;
        overflow: hidden;
        border-right: 1px solid rgb(229, 230, 235);
        .yc-input-outer {
          &:deep(.yc-input-wrapper) {
            .yc-input-prefix {
              font-size: inherit;
              padding-right: 4px;
            }
          }
        }
      }
      .yc-input-number {
        flex-shrink: 0;
        width: 52px;
        &:deep(.yc-input-wrapper) {
          padding: 0 6px;
          .yc-input-suffix {
            font-size: inherit;
            padding-left: 0;
            width: 18px;
            text-align: right;
          }
          .yc-input {
            flex: unset;
            width: 20px;
          }
        }
      }
    }
  }
}
</style>
