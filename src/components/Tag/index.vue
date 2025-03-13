<template>
  <div
    v-if="computedVisible"
    :class="[
      'yc-tag',
      'text-ellipsis',
      SIZE_CLASS[size],
      COLOR_CLASS[color] ?? 'yc-tag-custom-color',
      loading ? 'yc-tag-loading' : '',
      bordered ? 'yc-tag-bordered' : '',
      computedChecked ? 'yc-tag-checked' : '',
    ]"
    :style="{
      background: COLOR_CLASS[color] ? '' : (COLOR_MAP[color] ?? color),
      color: ['default', 'white'].includes(color) ? 'rgb(29, 33, 41)' : '',
    }"
    @click="handleCheck"
  >
    <!-- icon -->
    <div v-if="$slots.icon" class="yc-tag-icon">
      <slot name="icon" />
    </div>
    <!-- content -->
    <slot />
    <!-- close -->
    <yc-icon-button
      v-if="closable"
      name="close"
      hover-size="16px"
      hover-color="rgba(255, 255, 255, 0.2)"
      class="yc-tag-close-button"
      style="color: inherit"
      @click="handleClose"
    >
      <template v-if="$slots.closeIcon" #icon>
        <slot name="closeIcon" />
      </template>
    </yc-icon-button>
    <!-- loading -->
    <yc-spin
      v-if="loading"
      style="color: inherit; font-size: inherit"
      class="yc-tag-loading-icon"
    />
  </div>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue';
import { TagProps } from './type';
import { SIZE_CLASS, COLOR_CLASS, COLOR_MAP } from './constants';
import YcSpin from '../Spin/index.vue';

import useControlValue from '@/components/_hooks/useControlValue';
defineOptions({
  name: 'Tag',
});
const props = withDefaults(defineProps<TagProps>(), {
  color: 'default',
  size: 'medium',
  bordered: false,
  loading: false,
  closable: false,
  checkable: false,
  visible: undefined,
  defaultVisible: true,
  checked: undefined,
  defaultChecked: true,
  nowrap: false,
  value: '',
});
const emits = defineEmits<{
  (e: 'update:visible', value: boolean): void;
  (e: 'update:checked', value: boolean): void;
  (e: 'close', ev: MouseEvent, value?: string): void;
  (e: 'check', value: boolean, ev: MouseEvent): void;
}>();
const { visible, defaultVisible, checked, defaultChecked, checkable } =
  toRefs(props);
// visible
const computedVisible = useControlValue<boolean>(
  visible,
  defaultVisible.value,
  (val) => emits('update:visible', val)
);
// checked
const computedChecked = useControlValue<boolean>(
  checked,
  defaultChecked.value,
  (val) => emits('update:checked', val)
);
// 处理关闭
const handleClose = (ev: MouseEvent) => {
  computedVisible.value = false;
  emits('close', ev, props.value);
};
// 处理选中
const handleCheck = (ev: MouseEvent) => {
  if (checkable.value) {
    computedChecked.value = !computedChecked.value;
    emits('check', computedChecked.value, ev);
  }
};
</script>

<style lang="less" scoped>
@import './style/index.less';
</style>
