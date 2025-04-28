<template>
  <yc-prevent-focus class="yc-icon-button">
    <slot>
      <icon-close :size="size" />
    </slot>
  </yc-prevent-focus>
</template>

<script lang="ts" setup>
import { toRefs, computed } from 'vue';
import { IconClose } from '@shared/icons';
import YcPreventFocus from './PreventFocus.vue';
const props = withDefaults(
  defineProps<{
    size?: number;
    hoverColor?: string;
    hoverSize?: number;
  }>(),
  {
    size: 12,
    hoverColor: 'rgb(242, 243, 245)',
    hoverSize: 20,
  }
);
const { hoverSize: _hoverSize } = toRefs(props);
const hoverSize = computed(() => _hoverSize.value + 'px');
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
  &:deep(.yc-icon) {
    z-index: 1;
  }
}
</style>
