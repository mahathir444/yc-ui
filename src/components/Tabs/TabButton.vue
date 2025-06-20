<template>
  <yc-icon-button
    :size="14"
    :hover-size="20"
    :class="[
      `yc-tabs-nav-${type ? `${type}-` : ''}button`,
      {
        [`yc-tabs-nav-button-${direction}`]: direction,
      },
    ]"
    hover-color="rgb(242,243,245)"
    v-bind="$attrs"
  >
    <slot v-if="$slots.default" />
  </yc-icon-button>
</template>

<script lang="ts" setup>
import { YcIconButton } from '@shared/components';
withDefaults(
  defineProps<{
    className?: boolean;
    type?: 'add' | 'close';
    direction?: 'left' | 'up' | 'right' | 'down';
  }>(),
  {
    className: true,
  }
);
</script>

<style lang="less" scoped>
.yc-tabs-nav-button {
  &.yc-tabs-nav-button-left {
    margin: 0 6px 0 10px;
  }
  &.yc-tabs-nav-button-right {
    margin: 0 10px 0 6px;
  }
  &.yc-tabs-nav-button-up {
    margin-bottom: 10px;
  }
  &.yc-tabs-nav-button-down {
    margin-top: 10px;
  }
  &.yc-tabs-tab-close-btn {
    user-select: none;
    color: inherit;
  }
  &.yc-tabs-nav-add-btn {
    padding: 0 8px;
  }
}
</style>
