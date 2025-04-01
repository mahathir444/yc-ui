<template>
  <a-button v-bind="props" class="cx-button">
    <template v-if="$slots.icon" #icon>
      <slot name="icon" />
    </template>
    <slot />
  </a-button>
</template>

<script lang="ts" setup>
import { ButtonProps } from '@arco-design/web-vue';
const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'secondary',
  status: 'normal',
  size: 'medium',
  shape: 'square',
  disabled: false,
  loading: false,
  long: false,
  htmlType: 'button',
  href: '',
});
</script>

<style lang="less">
.cx-button.arco-btn-size-medium {
  border-radius: 8px;
  font-family: 'PingFang SC';
  font-size: 14px;
  font-weight: 400;
  min-width: 88px;
  padding: 8px 12px;
  .arco-btn-icon {
    margin-right: 4px;
    font-size: 12px;
  }
  &.arco-btn-primary {
    color: #fff;
    background: #0065ff;
    box-shadow: 0px 2px 6px 0px rgba(0, 101, 255, 0.3);
    &:not(.arco-btn-disabled):hover {
      background: linear-gradient(
          0deg,
          rgba(0, 0, 0, 0.1) 0%,
          rgba(0, 0, 0, 0.1) 100%
        ),
        #0065ff;
      box-shadow: 0px 2px 6px 0px rgba(0, 101, 255, 0.3);
    }
  }
  &.arco-btn-disabled {
    opacity: 0.4;
  }
  &.arco-btn-outline {
    color: #0d1014;
    border-radius: 8px;
    border: 1px solid #e1e5eb;
    background: #fff;

    &:not(.arco-btn-disabled):hover {
      color: #0d1014;
      border-color: #0065ff;
    }
  }
}
</style>
