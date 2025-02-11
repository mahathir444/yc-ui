<template>
  <div class="yc-input-wrapper">
    <input
      :value="defaultValue || modelValue"
      type="text"
      :class="['yc-input', SIZE_CLASS[size]]"
      :disabled="disabled"
      :readonly="readonly"
      :placeholder="placeholder"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { ComptSize } from '@/type';
import { SIZE_CLASS } from './index';
withDefaults(
  defineProps<{
    modelValue?: string;
    defaultValue?: string;
    size?: ComptSize;
    allowClear?: string;
    disabled?: boolean;
    readonly?: boolean;
    placeholder?: string;
  }>(),
  {
    size: 'medium',
  }
);
</script>

<style lang="less" scoped>
.yc-input-wrapper {
  cursor: text;
  padding: 0 12px;
  background-color: rgb(242, 243, 245);
  border: 1px solid transparent;
  border-radius: 2px;
  transition:
    color 0.1s cubic-bezier(0, 0, 1, 1),
    border-color 0.1s cubic-bezier(0, 0, 1, 1),
    background-color 0.1s cubic-bezier(0, 0, 1, 1);
  &:focus-within {
    background-color: #fff;
    border-color: rgb(22, 93, 255);
    box-shadow: 0 0 0 0 rgb(190, 218, 255);
  }
  &:hover {
    border-color: transparent;
    background-color: rgb(229, 230, 235);
  }
  .yc-input {
    outline: none;
    border: none;
    background-color: transparent;
    color: rgb(29, 33, 41);
  }
}

//size
.yc-button-mini {
  height: 24px;
  font-size: 12px;
}
.yc-button-small {
  height: 28px;
  font-size: 14px;
}
.yc-button-medium {
  height: 32px;
  font-size: 14px;
}
.yc-button-large {
  height: 36px;
  font-size: 14px;
}
</style>
