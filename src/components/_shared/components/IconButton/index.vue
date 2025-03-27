<template>
  <yc-prevent-focus
    class="yc-icon-button"
    :style="{
      fontSize,
    }"
  >
    <slot name="icon">
      <icon-close />
    </slot>
  </yc-prevent-focus>
</template>

<script lang="ts" setup>
import { IconButtonProps } from './type.ts';
import { IconClose } from '@shared/icons';
defineOptions({
  name: 'IconButton',
});
withDefaults(defineProps<IconButtonProps>(), {
  fontSize: '12px',
  hoverColor: 'rgb(242, 243, 245)',
  hoverSize: '20px',
});
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
    background-color: v-bind(hoverColor);
  }
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: v-bind(hoverSize);
    height: v-bind(hoverSize);
    border-radius: 50%;
    background: transparent;
    transition: background-color 0.1s cubic-bezier(0, 0, 1, 1);
  }
  .yc-icon {
    z-index: 10;
  }
}
</style>
