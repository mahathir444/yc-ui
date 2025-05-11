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
      <yc-spin v-else />
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
      <yc-spin v-else />
    </span>
    <slot />
  </button>
</template>

<script lang="ts" setup>
import { computed, toRefs, useSlots } from 'vue';
import { ButtonProps, ButtonEmits, ButtonSlots } from './type';
import YcSpin from '@/components/Spin';
import useInject from './hooks/useProvide';
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
const { inject } = useInject();
const { size, disabled, type, status, shape } = inject(props);
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
    shape.value == 'circle' ? 'yc-button-no-padding' : '',
    // size
    `yc-button-size-${size.value}`,
    // type
    `yc-button-${type.value}`,
    // status
    `yc-button-status-${status.value}`,
    // shape
    `yc-button-shape-${shape.value}`,
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
