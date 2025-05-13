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
      <yc-spin v-else is-size-inherit />
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
      <yc-spin v-else is-size-inherit />
    </span>
    <slot />
  </button>
</template>

<script lang="ts" setup>
import { computed, toRefs, useSlots } from 'vue';
import { ButtonProps, ButtonEmits, ButtonSlots } from './type';
import useProvide from './hooks/useProvide';
import YcSpin from '@/components/Spin';
defineOptions({
  name: 'Button',
});
defineSlots<ButtonSlots>();
const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'secondary',
  status: 'normal',
  size: undefined,
  shape: 'square',
  disabled: false,
  loading: false,
  long: false,
  htmlType: 'button',
  href: '',
});
const emits = defineEmits<ButtonEmits>();
const {
  loading,
  disabled: _disabled,
  type: _type,
  status: _status,
  shape: _shape,
  long,
} = toRefs(props);
const slots = useSlots();
// 呼求注入
const { inject } = useProvide();
const { size, disabled, type, status, shape } = inject(props);
// button的class
const btnClass = computed(() => {
  return [
    'yc-button',
    // size
    `yc-button-size-${size.value}`,
    // type
    `yc-button-${type.value}`,
    // status
    `yc-button-status-${status.value}`,
    // shape
    `yc-button-shape-${shape.value}`,
    {
      // long
      'yc-button-long': long.value,
      // loading
      'yc-button-loading': loading.value,
      // disabled
      'yc-button-disabled': disabled.value,
      // only-icon
      'yc-button-only-icon': !slots.default,
      // no-padding
      'yc-button-no-padding': shape.value == 'circle',
    },
  ];
});
// 拦截事件
const handleEvent = (type: string, e: MouseEvent) => {
  if (disabled.value || loading.value) return;
  emits(type as keyof ButtonEmits, e);
};
</script>

<style lang="less" scoped>
@import './style/button.less';
</style>
