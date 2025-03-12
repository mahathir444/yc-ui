<template>
  <button
    :type="htmlType"
    :disabled="disabled"
    :class="[
      'yc-button',
      // button是否hoverable
      !disabled && !loading ? 'yc-button-hoverable' : '',
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
    :style="{
      padding: !$slots.default || shape == 'circle' ? 0 : '',
      width:
        !$slots.default || shape == 'circle'
          ? `${SIZE_MAP[size]}px`
          : 'fit-content',
      borderRadius,
    }"
    @click="handleEvent('click', $event)"
    @dblclick="handleEvent('dblclick', $event)"
    @contextmenu="handleEvent('contextmenu', $event)"
  >
    <!-- 只有icon的时候无margin -->
    <span
      v-if="$slots.icon || loading"
      :style="{
        margin: !$slots.default ? 0 : '',
      }"
      class="yc-button-icon"
    >
      <slot v-if="!loading" name="icon"></slot>
      <yc-spin v-else style="color: inherit; font-size: inherit" />
    </span>
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
import { computed, toRefs, inject, Ref, useSlots } from 'vue';
import { SIZE_MAP } from '@/components/_constants';
import { SIZE_CLASS, TYPE_CLASS, STATUS_CLASS, SHAPE_CLASS } from './constants';
import { ButtonProps, ButtonType, ButtonShape, ButtonStatus } from './type';
import { Size } from '@/components/_type';
import YcSpin from '../Spin/index.vue';
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
const {
  loading,
  size: tempSize,
  disabled: tempDisabled,
  type: tempType,
  status: tempStatus,
  shape: tempShape,
} = toRefs(props);
// buttonGroup接收的属性
const type = inject('type', tempType) as Ref<ButtonType>;
const status = inject('status', tempStatus) as Ref<ButtonStatus>;
const size = inject('size', tempSize) as Ref<Size>;
const shape = inject('shape', tempShape) as Ref<ButtonShape>;
const disabled = inject('disabled', tempDisabled) as Ref<boolean>;
// borderRadius
const borderRadius = computed(() => {
  const map = {
    circle: '50%',
    round: SIZE_MAP[size.value] / 2 + 'px',
    square: '2px',
  };
  return map[shape.value];
});
// 拦截事件
const handleEvent = (type: string, e: MouseEvent) => {
  if (disabled.value || loading.value) return;
  emits(type as any, e);
};
</script>

<style lang="less" scoped>
@import './style/button.less';
</style>
