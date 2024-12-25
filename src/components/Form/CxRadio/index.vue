<template>
  <div
    class="cx-radio"
    @click="$emit('click', value)">
    <img
      :src="curValue == value ? checked : uncheck"
      class="icon" />
    <div class="label">{{ label }}</div>
  </div>
</template>

<script lang="ts" setup>
import checked from './icon/checked.svg';
import uncheck from './icon/uncheck.svg';
withDefaults(
  defineProps<{
    label?: string;
    value?: any;
    curValue?: string;
  }>(),
  {
    label: '',
    value: '',
    curValue: '',
  }
);
defineEmits<{
  (e: 'click', value: string): void;
}>();
</script>

<style lang="less" scoped>
.cx-radio {
  height: 32px;
  padding: 6px 49px 6px 0px;
  display: flex;
  align-items: center;
  gap: 10px;
  .icon {
    width: 16px;
    height: 16px;
    object-fit: contain;
  }
  .label {
    color: #57585e;
    font-family: 'PingFang SC';
    font-size: 14px;
    font-weight: 400;
  }
}
</style>
