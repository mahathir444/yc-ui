<template>
  <button
    :type="htmlType"
    :disabled="disabled"
    :class="{
      'yc-button': true,
      'yc-button-only-icon': !$slots.default,
      // 禁用和加载
      'yc-button-loading': loading,
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
    @click="handleEvent('click', $event)"
    @dblclick="handleEvent('dblclick', $event)"
    @contextmenu="handleEvent('contextmenu', $event)"
  >
    <span v-if="$slots.icon || loading" class="yc-button-icon">
      <slot v-if="!loading" name="icon"></slot>
      <svg-icon v-else name="loading" size="14" />
    </span>
    <slot></slot>
  </button>
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
    htmlType?: 'button' | 'reset' | 'submit';
  }>(),
  {
    type: 'secondary',
    size: 'medium',
    shape: 'square',
    disabled: false,
    loading: false,
    htmlType: 'button',
  }
);
const emits = defineEmits<{
  (e: 'click', event: MouseEvent): void;
  (e: 'dblclick', event: MouseEvent): void;
  (e: 'contextmenu', event: MouseEvent): void;
}>();
const { size, disabled, loading } = toRefs(props);
// 当前的size
const curSize = computed(() => SIZE_MAP[size.value] + 'px');
// shape为round的borderRadius
const roundBorderRadius = computed(() => SIZE_MAP[size.value] / 2 + 'px');
// 拦截事件
const handleEvent = (type: string, e: MouseEvent) => {
  if (disabled.value || loading.value) return;
  emits(type as any, e);
};
</script>

<style lang="less" scoped>
.yc-button {
  cursor: pointer;
  justify-content: center;
  padding: 0 15px;
  outline: none;
  border: none;
  font-weight: 400;
  transition: all 0.1s cubic-bezier(0, 0, 1, 1);
  user-select: none;
  display: flex;
  align-items: center;
  gap: 8px;
  &:disabled {
    cursor: not-allowed; /* 显示禁用光标 */
    // pointer-events: none; /* 禁用 hover 效果 */
    opacity: 0.4;
  }

  .yc-button-icon {
    flex-shrink: 0;
    width: 14px;
    height: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

// 加载
.yc-button-loading {
  position: relative;
  pointer-events: none;

  @keyframes loading {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 100;
    background-color: #fff;
    opacity: 0.4;
  }
  .svg-icon {
    animation: loading 1s infinite cubic-bezier(0, 0, 1, 1);
  }
}
// 是否只有icon
.yc-button-only-icon {
  width: v-bind(curSize);
  padding: 0;
}
// 类型
.yc-button-primary {
  background-color: rgb(22, 93, 255);
  color: #fff;
  &:hover {
    background-color: rgb(64, 128, 255);
  }
  &:active {
    background-color: rgb(14, 66, 210);
  }
  .yc-button-icon {
    color: #fff;
  }
}
.yc-button-secondary {
  background-color: rgb(242, 243, 245);
  color: rgb(78, 89, 105);
  &:hover {
    background-color: rgb(229, 230, 235);
  }
  &:active {
    background-color: rgb(201, 205, 212);
  }
  .yc-button-icon {
    color: rgb(78, 89, 105);
  }
}
.yc-button-dashed {
  border: 1px dashed rgb(229, 230, 235);
  background-color: rgb(242, 243, 245);
  color: rgb(78, 89, 105);
  &:hover {
    border-color: rgb(201, 205, 212);
    background-color: rgb(229, 230, 235);
  }
  &:active {
    border-color: rgb(169, 174, 184);
    background-color: rgb(201, 205, 212);
  }
  .yc-button-icon {
    color: rgb(78, 89, 105);
  }
}
.yc-button-outline {
  border: 1px solid rgb(22, 93, 255);
  background-color: transparent;
  color: rgb(22, 93, 255);

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

  .yc-button-icon {
    color: rgb(22, 93, 255);
  }
}
.yc-button-text {
  background-color: transparent;
  color: rgb(22, 93, 255);

  &:hover {
    background-color: rgb(242, 243, 245);
  }
  &:active {
    background-color: rgb(229, 230, 235);
  }

  .yc-button-icon {
    color: rgb(22, 93, 255);
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
