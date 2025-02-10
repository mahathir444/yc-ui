<template>
  <a
    :href="href || 'javascript:void(0)'"
    :class="{
      'yc-link': true,
      // hoverable
      'yc-link-hoverable': hoverable && !disabled && !loading,
      // loading
      'yc-link-loading': loading,
      // disabled
      'yc-link-disabled': disabled,
      // status
      'yc-link-status-normal': status == 'normal',
      'yc-link-status-warning': status == 'warning',
      'yc-link-status-success': status == 'success',
      'yc-link-status-danger': status == 'danger',
    }"
  >
    <span v-if="$slots.icon || loading" class="yc-link-icon">
      <slot v-if="!loading" name="icon" />
      <svg-icon v-else name="loading" size="12" />
    </span>
    <slot />
  </a>
</template>

<script lang="ts" setup>
import { YcButtonStatus } from '../YcButton/type';
withDefaults(
  defineProps<{
    href?: string;
    status?: YcButtonStatus;
    hoverable?: boolean;
    disabled?: boolean;
    loading?: boolean;
  }>(),
  {
    href: '',
    status: 'normal',
    hoverable: true,
    loading: false,
    disabled: false,
  }
);
</script>

<style lang="less" scoped>
.yc-link {
  cursor: pointer;
  padding: 1px 4px;
  line-height: 1.5715;
  background-color: none;
  border: none;
  border-radius: 2px;
  font-size: 14px;
  font-weight: 400;
  transition: all 0.1s cubic-bezier(0, 0, 1, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;

  .yc-link-icon {
    flex-shrink: 0;
    width: 12px;
    height: 12px;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
// hoverable
.yc-link-hoverable {
  &:hover {
    background-color: rgb(242, 243, 245);
  }
  &:active {
    background-color: rgb(229, 230, 235);
  }
}
// loading
.yc-link-loading,
.yc-link-disabled {
  opacity: 0.4;
}
.yc-link-disabled {
  cursor: not-allowed;
}
.yc-link-loading {
  @keyframes loading {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .svg-icon {
    animation: loading 1s infinite cubic-bezier(0, 0, 1, 1);
  }
}
// status
.yc-link-status-normal {
  color: rgb(22, 93, 255);
  .yc-link-icon {
    color: rgb(22, 93, 255);
  }
}
.yc-link-status-warning {
  color: rgb(255, 125, 0);
  .yc-link-icon {
    color: rgb(255, 125, 0);
  }
}
.yc-link-status-success {
  color: rgb(0, 180, 42);
  .yc-link-icon {
    color: rgb(0, 180, 42);
  }
}
.yc-link-status-danger {
  color: rgb(245, 63, 63);
  .yc-link-icon {
    color: rgb(245, 63, 63);
  }
}
</style>
