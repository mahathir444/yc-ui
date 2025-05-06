<template>
  <component
    :is="href ? 'a' : 'button'"
    :href="href ? href : undefined"
    :type="href ? htmlType : ''"
    :disabled="disabled"
    :class="[
      'yc-button',
      // long
      long ? 'yc-button-long' : '',
      // loading
      loading ? 'yc-button-loading' : '',
      // disabled
      disabled ? 'yc-button-disabled' : '',
      // only-icon
      !$slots.default ? 'yc-button-only-icon' : '',
      // no-padding
      shape == 'circle' ? 'yc-button-no-padding' : '',
      // size
      BUTTON_SIZE_CLASS[size],
      // type
      BUTTON_TYPE_CLASS[type],
      // status
      BUTTON_STATUS_CLASS[status],
      // shape
      BUTTON_SHAPE_CLASS[shape],
    ]"
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
  </component>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue';
import { ButtonProps, ButtonEmits } from './type';
import {
  BUTTON_SIZE_CLASS,
  BUTTON_SHAPE_CLASS,
  BUTTON_TYPE_CLASS,
  BUTTON_STATUS_CLASS,
} from '@shared/constants';
import YcSpin from '@/components/Spin';
import useInject from './hooks/useProvide';
defineOptions({
  name: 'Button',
});
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
// 呼求注入
const { inject } = useInject();
const { size, disabled, type, status, shape } = inject(props);
// 拦截事件
const handleEvent = (type: string, e: MouseEvent) => {
  if (disabled.value || loading.value) return;
  emits(type as keyof ButtonEmits, e);
};
</script>

<style lang="less" scoped>
@import './style/button.less';
</style>
