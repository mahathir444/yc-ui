<template>
  <YcLink
    v-if="herf"
    :href="herf"
    :status="status"
    :disabled="disabled"
    :loading="loading"
  >
    <template #icon>
      <slot name="icon"></slot>
    </template>
  </YcLink>
  <button
    v-else
    :type="htmlType"
    :disabled="disabled"
    :class="{
      'yc-button': true,
      // 是否只有图标
      'yc-button-only-icon': !$slots.default,
      // 是否自适应容器
      'yc-button-long': long,
      // 禁用和加载
      'yc-button-loading': loading,
      'yc-button-disabled': disabled,
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
      // 状态
      'yc-button-status-warning': status == 'warning',
      'yc-button-status-success': status == 'success',
      'yc-button-status-danger': status == 'danger',
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
import { computed, toRefs } from 'vue';
import { SIZE_MAP } from './index';
import { YcButtonProps } from './type';
import YcLink from '../YcLink/index.vue';
const props = withDefaults(defineProps<YcButtonProps>(), {
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
const emits = defineEmits<{
  (e: 'click', event: MouseEvent): void;
  (e: 'dblclick', event: MouseEvent): void;
  (e: 'contextmenu', event: MouseEvent): void;
}>();
const { size, disabled, loading } = toRefs(props);
// 当前的size
const sizeToPx = computed(() => SIZE_MAP[size.value] + 'px');
// shape为round的borderRadius
const roundBorderRadius = computed(() => SIZE_MAP[size.value] / 2 + 'px');
// 拦截事件
const handleEvent = (type: string, e: MouseEvent) => {
  if (disabled.value || loading.value) return;
  emits(type as any, e);
};
</script>

<style lang="less" scoped>
@import './index.less';
.yc-button {
  cursor: pointer;
  user-select: none;
  padding: 0 15px;
  outline: none;
  border: none;
  font-weight: 400;
  transition: all 0.1s cubic-bezier(0, 0, 1, 1);
  display: flex;
  justify-content: center;
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
//是否自适应容器
.yc-button-long {
  width: 100%;
}
// 是否只有icon
.yc-button-only-icon {
  width: v-bind(sizeToPx);
  padding: 0;
}
// 加载
.yc-button-loading {
  position: relative;
  pointer-events: none;

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 100;
    background-color: #fff;
    opacity: 0.4;
  }

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
.yc-button-disabled {
  cursor: not-allowed;
  pointer-events: none; /* 禁用 hover 效果 */
  opacity: 0.4;
}
// shape
.yc-button-shape-square {
  border-radius: 2px;
}
.yc-button-shape-circle {
  width: v-bind(sizeToPx);
  padding: 0;
  border-radius: 50%;
}
.yc-button-shape-round {
  border-radius: v-bind(roundBorderRadius);
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
</style>
