<template>
  <a
    v-if="href"
    :href="href"
    :class="[
      'yc-button',
      `yc-button-size-${size}`,
      `yc-button-${type}`,
      `yc-button-status-${status}`,
      `yc-button-shape-${shape}`,
      {
        'yc-button-long': long,
        'yc-button-loading': loading,
        'yc-button-disabled': disabled,
        'yc-button-only-icon': !$slots.default,
      },
    ]"
    v-bind="$attrs"
    @mousedown="handleEvent('mousedown', $event)"
    @mouseup="handleEvent('mouseup', $event)"
    @click="handleEvent('click', $event)"
    @dblclick="handleEvent('dblclick', $event)"
    @contextmenu="handleEvent('contextmenu', $event)"
  >
    <span v-if="$slots.icon || loading" class="yc-button-icon">
      <yc-spin v-if="loading" is-size-inherit />
      <slot v-else name="icon" />
    </span>
    <slot />
  </a>
  <button
    v-else
    :type="htmlType"
    :disabled="disabled"
    :class="[
      'yc-button',
      `yc-button-size-${size}`,
      `yc-button-${type}`,
      `yc-button-status-${status}`,
      `yc-button-shape-${shape}`,
      {
        'yc-button-long': long,
        'yc-button-loading': loading,
        'yc-button-disabled': disabled,
        'yc-button-only-icon': !$slots.default,
      },
    ]"
    v-bind="$attrs"
    @mousedown="handleEvent('mousedown', $event)"
    @mouseup="handleEvent('mouseup', $event)"
    @click="handleEvent('click', $event)"
    @dblclick="handleEvent('dblclick', $event)"
    @contextmenu="handleEvent('contextmenu', $event)"
  >
    <span v-if="$slots.icon || loading" class="yc-button-icon">
      <yc-spin v-if="loading" is-size-inherit />
      <slot v-else name="icon" />
    </span>
    <slot />
  </button>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue';
import { ButtonProps, ButtonEmits, ButtonSlots } from './type';
import useContext from './hooks/useContext';
import YcSpin from '@/components/Spin';
defineOptions({
  name: 'Button',
});
defineSlots<ButtonSlots>();
const props = withDefaults(defineProps<ButtonProps>(), {
  type: undefined,
  status: undefined,
  size: undefined,
  shape: undefined,
  disabled: undefined,
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
// 呼求注入
const { size, disabled, type, status, shape } = useContext().inject(props);
// 拦截事件
const handleEvent = (type: string, e: MouseEvent) => {
  if (disabled.value || loading.value) return;
  emits(type as keyof ButtonEmits, e);
};
</script>

<style lang="less" scoped>
@import './style/button.less';
</style>
