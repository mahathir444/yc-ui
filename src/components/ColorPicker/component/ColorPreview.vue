<template>
  <div
    class="yc-color-picker-preview"
    :style="{
      backgroundColor: computedValue,
    }"
  ></div>
</template>

<script lang="ts" setup>
import { ref, inject } from 'vue';
import { ProvideType } from '../type';
import { COLOR_PICKER_PICKER_KEY } from '@shared/constants';
// 接受值
const { computedValue } = inject<ProvideType>(COLOR_PICKER_PICKER_KEY, {
  computedValue: ref('#FF0000'),
  baseColor: ref('#FF0000'),
  opacity: ref(100),
  format: ref('hex'),
});
</script>

<style lang="less" scoped>
.yc-color-picker-preview {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border: 1px solid rgb(229, 230, 235);
  border-radius: 4px;
  font-size: 20px;
  // color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
