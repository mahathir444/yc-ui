<template>
  <div class="yc-color-picker-input-wrapper">
    <div class="yc-color-picker-format">
      <yc-select
        :model-value="format"
        :options="FORMAT_OPTIONS"
        :trigger-props="{
          contentClass: 'format-popup-content',
        }"
        size="mini"
        @change="(v) => $emit('update:format', v as ColorFormat)"
      />
    </div>
    <div class="yc-color-picker-color">
      <yc-input
        v-if="format == 'hex'"
        v-model="hex"
        :max-length="6"
        :disabled="disabled"
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
          :disabled="disabled"
          size="mini"
          hide-button
          @blur="handleSet('rgb')"
          @press-enter="handleSet('rgb')"
        />
        <yc-input-number
          v-model="rgb.g"
          :min="0"
          :max="255"
          :disabled="disabled"
          size="mini"
          hide-button
          @blur="handleSet('rgb')"
          @press-enter="handleSet('rgb')"
        />
        <yc-input-number
          v-model="rgb.b"
          :min="0"
          :max="255"
          :disabled="disabled"
          size="mini"
          hide-button
          @blur="handleSet('rgb')"
          @press-enter="handleSet('rgb')"
        />
      </template>
      <yc-input-number
        v-if="!disabledAlpha"
        v-model="alpha"
        :min="0"
        :max="100"
        :disabled="disabled"
        size="mini"
        hide-button
        class="alpha-input"
        @blur="handleSet('alpha')"
        @press-enter="handleSet('alpha')"
      >
        <template #suffix> % </template>
      </yc-input-number>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs } from 'vue';
import { ColorFormat } from '../type';
import { FORMAT_OPTIONS } from '../constants';
import tinycolor from 'tinycolor2';
import YcInputNumber from '@/components/InputNumber';
const props = defineProps<{
  color: string;
  baseColor: string;
  format: ColorFormat;
  alpha: number;
  disabledAlpha: boolean;
  disabled: boolean;
}>();
const emits = defineEmits<{
  (e: 'update:color', value: string): void;
  (e: 'update:baseColor', value: string): void;
  (e: 'update:alpha', value: number): void;
  (e: 'update:format', value: ColorFormat): void;
  (e: 'change', color: string, type: 'alpha' | 'color'): void;
}>();
const { color, alpha: _alpha } = toRefs(props);
// hex
const hex = ref<string>(tinycolor(color.value).toHex());
// rgb对象
const rgb = ref<Record<string, any>>(tinycolor(color.value).toRgb());
// alpha
const alpha = ref<number>(_alpha.value);
// 处理设置
const handleSet = (type: 'hex' | 'rgb' | 'alpha') => {
  if (type == 'hex') {
    const a = tinycolor(color.value).getAlpha();
    const resultColor = tinycolor(hex.value).setAlpha(a).toHex8();
    emits('update:color', resultColor);
    emits('update:baseColor', resultColor);
    emits('change', resultColor, 'color');
  } else if (type == 'rgb') {
    const { r, g, b } = rgb.value;
    const resultColor = `rgb(${r},${g},${b})`;
    emits('update:color', resultColor);
    emits('update:baseColor', resultColor);
    emits('change', resultColor, 'color');
  } else {
    const a = +(alpha.value / 100).toFixed(2);
    const resultColor = tinycolor(color.value).setAlpha(a).toRgbString();
    emits('update:color', resultColor);
    emits('update:alpha', alpha.value);
    emits('change', resultColor, 'alpha');
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
    &:deep(.yc-input-outer) {
      &:first-child {
        .yc-input-wrapper {
          border-top-left-radius: 2px;
          border-bottom-left-radius: 2px;
        }
      }
      &:last-child {
        .yc-input-wrapper {
          border-top-right-radius: 2px;
          border-bottom-right-radius: 2px;
          border-right-color: transparent;
        }
      }
      &.yc-input-focus {
        .yc-input-wrapper {
          border-radius: 2px;
          border-right-color: #165dff;
        }
      }
      &.yc-input-number {
        .yc-input-wrapper {
          .yc-input {
            text-align: center;
          }
        }
      }
      &.yc-input-number,
      &.hex-input {
        flex-shrink: 0;
        flex: 1;
        overflow: hidden;
      }
      &.alpha-input {
        flex: unset;
        width: 52px;
        .yc-input-wrapper {
          .yc-input {
            width: 28px;
          }
        }
      }

      .yc-input-wrapper {
        border-radius: 0;
        padding: 0 6px;
        border-right-color: rgb(229, 230, 235);
        .yc-input-suffix {
          padding-left: 0;
        }
        .yc-input-prefix {
          padding-right: 6px;
        }
      }
    }
  }
}
</style>

<style lang="less">
.format-popup-content {
  .yc-select-dropdown-loading {
    .yc-select-dropdown-list {
      .yc-select-option {
        font-size: 12px;
        line-height: 24px;
      }
    }
  }
}
</style>
