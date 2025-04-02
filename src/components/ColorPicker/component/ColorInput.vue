<template>
  <div class="yc-color-picker-input-wrapper">
    <div class="yc-color-picker-format">
      <yc-select
        v-model="format"
        size="mini"
        :options="[
          {
            label: 'rgb',
            value: 'rgb',
          },
          {
            label: 'hex',
            value: 'hex',
          },
        ]"
      />
    </div>
    <div class="yc-color-picker-color">
      <yc-input
        v-if="format == 'hex'"
        v-model="hex"
        :max-length="8"
        size="mini"
        class="hex-input"
        @blur="handleSet('hex')"
        @press-enter="handleSet('hex')"
      >
        <template #prefix> # </template>
      </yc-input>
      <template v-else>
        <yc-input-number
          v-model="rgb.r"
          :min="0"
          :max="255"
          size="mini"
          hide-button
          text-center
          class="rgb-input"
          @blur="handleSet('rgb')"
          @press-enter="handleSet('rgb')"
        />
        <yc-input-number
          v-model="rgb.g"
          :min="0"
          :max="255"
          size="mini"
          hide-button
          text-center
          class="rgb-input"
          @blur="handleSet('rgb')"
          @press-enter="handleSet('rgb')"
        />
        <yc-input-number
          v-model="rgb.b"
          :min="0"
          :max="255"
          size="mini"
          hide-button
          text-center
          class="rgb-input"
          @blur="handleSet('rgb')"
          @press-enter="handleSet('rgb')"
        />
      </template>
      <yc-input-number
        v-model="opacity"
        :min="0"
        :max="100"
        size="mini"
        text-center
        hide-button
        class="opacity-input"
        @blur="handleSet('opacity')"
        @press-enter="handleSet('opacity')"
      >
        <template #suffix> % </template>
      </yc-input-number>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, inject, computed } from 'vue';
import { ProvideType } from '../type';
import { COLOR_PICKER_PICKER_KEY } from '@shared/constants';
import tinycolor from 'tinycolor2';
import YcInputNumber from '@/components/InputNumber';
// 接受值
const { computedValue, opacity, format, baseColor } = inject<ProvideType>(
  COLOR_PICKER_PICKER_KEY,
  {
    computedValue: ref('#FF0000'),
    baseColor: ref('#FF0000'),
    opacity: ref(100),
    format: ref('hex'),
  }
);
// hex
const hex = ref<string>(computedValue.value.replace('#', ''));
// rgb对象
const rgb = ref<Record<string, any>>(tinycolor(computedValue.value).toRgb());
// 处理设置
const handleSet = (type: 'hex' | 'rgb' | 'opacity') => {
  if (type == 'hex') {
    baseColor.value = hex.value;
    computedValue.value = hex.value;
  } else if (type == 'rgb') {
    const { r, g, b } = rgb.value;
    computedValue.value = `rgb(${r},${g},${b})`;
    baseColor.value = `rgb(${r},${g},${b})`;
  } else {
    const a = +(opacity.value / 100).toFixed(2);
    if (format.value == 'hex') {
      const color = tinycolor(computedValue.value).setAlpha(a).toHex8String();
      computedValue.value = color;
      baseColor.value = color;
    } else {
      const color = tinycolor(computedValue.value).setAlpha(a).toRgbString();
      computedValue.value = color;
    }
  }
};
</script>

<style lang="less" scoped>
.yc-color-picker-input-wrapper {
  display: flex;
  align-items: center;
  gap: 20px;
  .yc-color-picker-format {
    &:deep(.yc-select) {
      .yc-input-outer {
        width: 58px;
        .yc-input-wrapper {
          padding: 0 6px;
          .yc-input {
            width: 32px;
          }
          .yc-input-suffix {
            padding-left: 0;
          }
        }
      }
    }
  }

  .yc-color-picker-color {
    flex: 1;
    overflow: hidden;
    display: flex;
    align-items: center;
    .hex-input {
      flex: 1;
      overflow: hidden;
    }

    .yc-input-number {
      flex-shrink: 0;
      width: 52px;
      &.rgb-input {
        width: 38px;
      }
      &.opacity-input {
        &:deep(.yc-input-wrapper) {
          .yc-input {
            flex: unset;
            width: 20px;
          }
        }
      }
      &:deep(.yc-input-wrapper) {
        padding: 0 6px;
        .yc-input-suffix {
          padding-left: 0;
          font-size: 12px;
          width: 18px;
        }
      }
    }
  }
}
</style>
