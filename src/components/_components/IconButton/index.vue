<template>
  <div
    class="yc-icon-button"
    :style="{
      fontSize,
    }"
  >
    <slot name="icon">
      <svg-icon :name="name" />
    </slot>
  </div>
</template>

<script lang="ts" setup>
import SvgIcon from '@/components/_components/SvgIcon/index.vue';

withDefaults(
  defineProps<{
    name: string;
    fontSize?: string;
  }>(),
  {
    fontSize: '12px',
  }
);
</script>

<style lang="less" scoped>
.yc-icon-button {
  user-select: none;
  cursor: pointer;
  position: relative;
  color: rgb(29, 33, 41);
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover::before {
    display: block;
  }
  &::before {
    content: '';
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    width: 20px;
    height: 20px;
    background-color: rgb(242, 243, 245);
    border-radius: 50%;
    display: none;
  }
  .svg-icon {
    position: relative;
    z-index: 10;
  }
}
</style>
