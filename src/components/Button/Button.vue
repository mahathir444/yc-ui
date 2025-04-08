<template>
  <a
    v-if="href"
    :href="href"
    :class="btnClass"
    v-bind="$attrs"
    @mousedown="handleEvent('mousedown', $event)"
    @mouseup="handleEvent('mouseup', $event)"
    @click="handleEvent('click', $event)"
    @dblclick="handleEvent('dblclick', $event)"
    @contextmenu="handleEvent('contextmenu', $event)"
  >
    <span v-if="$slots.icon || loading" class="yc-button-icon">
      <slot v-if="!loading" name="icon" />
      <yc-spin v-else color="inherit" size="inherit" />
    </span>
    <slot />
  </a>
  <button
    v-else
    :type="htmlType"
    :disabled="disabled"
    :class="btnClass"
    v-bind="$attrs"
    @mousedown="handleEvent('mousedown', $event)"
    @mouseup="handleEvent('mouseup', $event)"
    @click="handleEvent('click', $event)"
    @dblclick="handleEvent('dblclick', $event)"
    @contextmenu="handleEvent('contextmenu', $event)"
  >
    <span v-if="$slots.icon || loading" class="yc-button-icon">
      <slot v-if="!loading" name="icon" />
      <yc-spin v-else color="inherit" size="inherit" />
    </span>
    <slot />
  </button>
</template>

<script lang="ts" setup>
import { computed, toRefs, inject, useSlots, CSSProperties } from 'vue';
import {
  ButtonProps,
  ButtonProvide,
  ButtonEvent,
  ButtonEventType,
} from './type';
import { SIZE_CLASS, TYPE_CLASS, STATUS_CLASS, SHAPE_CLASS } from './constants';
import { BUTTON_GROUP_PROVIDE_KEY, SIZE_MAP } from '@shared/constants';
import YcSpin from '@/components/Spin';
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
  href: '',
});
const emits = defineEmits<{
  (e: 'mousedown', event: MouseEvent): void;
  (e: 'mouseup', event: MouseEvent): void;
  (e: 'click', event: MouseEvent): void;
  (e: 'dblclick', event: MouseEvent): void;
  (e: 'contextmenu', event: MouseEvent): void;
}>();
const {
  loading,
  size: _size,
  disabled: _disabled,
  type: _type,
  status: _status,
  shape: _shape,
  long,
} = toRefs(props);
const slots = useSlots();
// buttonGroup接收的属性
const { size, disabled, type, status, shape } = inject<ButtonProvide>(
  BUTTON_GROUP_PROVIDE_KEY,
  {
    size: _size,
    disabled: _disabled,
    type: _type,
    status: _status,
    shape: _shape,
  }
);
// button的class
const btnClass = computed(() => {
  return [
    'yc-button',
    // long
    long.value ? 'yc-button-long' : '',
    // loading
    loading.value ? 'yc-button-loading' : '',
    // disabled
    disabled.value ? 'yc-button-disabled' : '',
    // only-icon
    !slots.default ? 'yc-button-only-icon' : '',
    // no-padding
    !slots.default || shape.value == 'circle' ? 'yc-button-no-padding' : '',
    // size
    SIZE_CLASS[size.value],
    // type
    TYPE_CLASS[type.value],
    // status
    STATUS_CLASS[status.value],
    // shape
    SHAPE_CLASS[shape.value],
  ];
});
const width = computed(() =>
  !slots.default || shape.value == 'circle'
    ? `${SIZE_MAP[size.value]}px`
    : 'fit-content'
);
const borderRadius = computed(() => {
  const borderRadiusMap = {
    circle: '50%',
    round: SIZE_MAP[size.value] / 2 + 'px',
    square: '2px',
  };
  return borderRadiusMap[shape.value];
});
// 拦截事件
const handleEvent = (type: ButtonEventType, e: ButtonEvent) => {
  if (disabled.value || loading.value) return;
  emits(type as any, e);
};
</script>

<style lang="less" scoped>
@import './style/button.less';
.yc-button {
  width: v-bind(width);
  border-radius: v-bind(borderRadius);
}
</style>
