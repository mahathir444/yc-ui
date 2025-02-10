<template>
  <button
    :type="htmlType"
    :disabled="disabled"
    :class="{
      'yc-button': true,
      // button是否hoverable
      'yc-button-hoverable': !disabled && !loading,
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
      <svg-icon v-else name="loading" :size="size == 'mini' ? 12 : 14" />
    </span>
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
import { computed, toRefs } from 'vue';
import { SIZE_MAP } from './index';
import { YcButtonProps } from './type';
const props = withDefaults(defineProps<YcButtonProps>(), {
  type: 'secondary',
  status: 'normal',
  size: 'medium',
  shape: 'square',
  disabled: false,
  loading: false,
  long: false,
  htmlType: 'button',
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
  outline: none;
  border: 1px solid transparent;
  font-weight: 400;
  transition: all 0.1s cubic-bezier(0, 0, 1, 1);
  display: flex;
  justify-content: center;
  align-items: center;

  .yc-button-icon {
    flex-shrink: 0;
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
  .yc-button-icon {
    margin: 0 !important;
  }
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
</style>
