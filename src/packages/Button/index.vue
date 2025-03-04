<template>
  <button
    :type="htmlType"
    :disabled="disabled"
    :class="[
      'yc-button',
      // button是否hoverable
      !disabled && !loading ? 'yc-button-hoverable' : '',
      // 是否只有图标
      !$slots.default ? 'yc-button-only-icon' : '',
      // long
      long ? 'yc-button-long' : '',
      // loading
      loading ? 'yc-button-loading' : '',
      // disabled
      disabled ? 'yc-button-disabled' : '',
      // size
      SIZE_CLASS[size],
      // type
      TYPE_CLASS[type],
      // status
      STATUS_CLASS[status],
      // shape
      SHAPE_CLASS[shape],
    ]"
    @click="handleEvent('click', $event)"
    @dblclick="handleEvent('dblclick', $event)"
    @contextmenu="handleEvent('contextmenu', $event)"
  >
    <span v-if="$slots.icon || loading" class="yc-button-icon">
      <slot v-if="!loading" name="icon"></slot>
      <svg-icon v-else name="loading" />
    </span>
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
import { computed, toRefs } from 'vue';
import { SIZE_MAP } from '@/packages/_constants';
import { SIZE_CLASS, TYPE_CLASS, STATUS_CLASS, SHAPE_CLASS } from './constants';
import { ButtonProps } from './type';
defineOptions({
  name: 'Button',
});
const props = withDefaults(defineProps<ButtonProps>(), {
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
