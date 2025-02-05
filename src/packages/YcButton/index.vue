<template>
  <div
    class="yc-button-wrapper"
    :class="{
      'is-disabled': disabled,
      'is-loading': loading,
    }"
  >
    <button
      :class="{
        'yc-button': true,
        'yc-button-only-icon': !$slots.default,
        // 大小
        'yc-button-mini': size == 'mini',
        'yc-button-small': size == 'small',
        'yc-button-medium': size == 'medium',
        'yc-button-large': size == 'large',
        // 类型
        'yc-button-primary': type == 'primary',
        'yc-button-secondary': type == 'secondary',
        'yc-button-dashed': type == 'dashed',
        'yc-button-outline': type == 'outline',
        'yc-button-text': type == 'text',
        // 形状
        'yc-button-shape-round': shape == 'round',
        'yc-button-shape-circle': shape == 'circle',
        'yc-button-shape-square': shape == 'square',
      }"
    >
      <span v-if="$slots.icon || loading" class="yc-button-icon">
        <slot v-if="!loading" name="icon"></slot>
        <svg-icon name="loading" size="14" />
      </span>
      <slot></slot>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, toRefs } from 'vue';
import { SIZE_MAP } from './index';
const props = withDefaults(
  defineProps<{
    type?: 'primary' | 'secondary' | 'dashed' | 'outline' | 'text';
    size?: 'mini' | 'small' | 'medium' | 'large';
    shape?: 'square' | 'circle' | 'round';
    disabled?: boolean;
    loading?: boolean;
  }>(),
  {
    type: 'secondary',
    size: 'medium',
    shape: 'square',
    disabled: false,
    loading: false,
  }
);
const { size } = toRefs(props);
// 当前的size
const curSize = computed(() => SIZE_MAP[size.value] + 'px');
// shape为round的borderRadius
const roundBorderRadius = computed(() => SIZE_MAP[size.value] / 2 + 'px');
</script>

<style lang="less" scoped>
.yc-button-wrapper {
  .yc-button {
    cursor: pointer;
    justify-content: center;
    padding: 0 15px;
    outline: none;
    border: 1px solid transparent;
    font-weight: 400;
    transition: all 0.1s cubic-bezier(0, 0, 1, 1);
    user-select: none;
    display: flex;
    align-items: center;
    gap: 8px;

    .yc-button-icon {
      flex-shrink: 0;
      width: 14px;
      height: 14px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
// diabled,loading
@keyframes yc-loading {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.is-disabled,
.is-loading {
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 100;
    background-color: #fff;
    opacity: 0.4;
  }
}
.is-disabled {
  cursor: not-allowed;
}
.is-loading {
  cursor: default;
  .svg-icon {
    animation: yc-loading 1s infinite cubic-bezier(0, 0, 1, 1);
  }
}
// 是否只有icon
.yc-button-only-icon {
  width: v-bind(curSize);
  padding: 0;
}
// 类型
.yc-button-primary {
  .yc-button-icon {
    color: #fff;
  }
  background-color: rgb(22, 93, 255);
  color: #fff;

  &:hover {
    background-color: rgb(64, 128, 255);
  }
  &:active {
    background-color: rgb(14, 66, 210);
  }
}
.yc-button-secondary,
.yc-button-dashed {
  .yc-button-icon {
    color: rgb(78, 89, 105);
  }
  background-color: rgb(242, 243, 245);
  color: rgb(78, 89, 105);

  &:hover {
    background-color: rgb(229, 230, 235);
  }
  &:active {
    background-color: rgb(201, 205, 212);
  }
}
.yc-button-dashed {
  border: 1px dashed rgb(229, 230, 235);
  &:hover {
    border-color: rgb(201, 205, 212);
  }
  &:active {
    border-color: rgb(169, 174, 184);
  }
}
.yc-button-outline {
  .yc-button-icon {
    color: rgb(22, 93, 255);
  }
  border: 1px solid rgb(22, 93, 255);
  color: rgb(22, 93, 255);
  background-color: transparent;

  &:hover {
    color: rgb(64, 128, 255);
    border-color: rgb(64, 128, 255);
    .yc-button-icon {
      color: rgb(64, 128, 255);
    }
  }
  &:active {
    color: rgb(14, 66, 210);
    border-color: rgb(14, 66, 210);
    .yc-button-icon {
      color: rgb(14, 66, 210);
    }
  }
}
.yc-button-text {
  .yc-button-icon {
    color: rgb(22, 93, 255);
  }
  background-color: transparent;
  color: rgb(22, 93, 255);
  &:hover {
    background-color: rgb(242, 243, 245);
  }
  &:active {
    background-color: rgb(229, 230, 235);
  }
}
// size
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
// shape
.yc-button-shape-square {
  border-radius: 2px;
}
.yc-button-shape-circle {
  border-radius: 50%;
}
.yc-button-shape-round {
  border-radius: v-bind(roundBorderRadius);
}
</style>
