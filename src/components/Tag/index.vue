<template>
  <div
    v-if="computedVisible"
    :class="[
      'yc-tag',
      'text-ellipsis',
      SIZE_CLASS[size],
      COLOR_CLASS[color] ?? 'yc-tag-color',
      loading ? 'yc-tag-loading' : '',
      bordered ? 'yc-tag-bordered' : '',
      computedChecked ? 'yc-tag-checked' : '',
    ]"
    @click="handleCheck"
  >
    <!-- icon -->
    <div v-if="$slots.icon" class="yc-tag-icon">
      <slot name="icon" />
    </div>
    <!-- content -->
    <slot />
    <!-- close -->
    <YcIconButton
      v-if="closable"
      name="close"
      class="yc-tag-close-button"
      style="color: inherit"
      @click="handleClose"
    >
      <template v-if="$slots.closeIcon" #icon>
        <slot name="closeIcon" />
      </template>
    </YcIconButton>
    <!-- loading -->
    <YcSpin
      v-if="loading"
      style="color: inherit; font-size: inherit"
      class="yc-tag-loading-icon"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs } from 'vue';
import { TagProps } from './type';
import { SIZE_CLASS, COLOR_CLASS } from './constants';
import YcSpin from '../Spin/index.vue';
import YcIconButton from '@/components/_components/IconButton/index.vue';
import useControlValue from '@/components/_hooks/useControlValue';
const props = withDefaults(defineProps<TagProps>(), {
  color: 'default',
  size: 'medium',
  bordered: false,
  loading: false,
  closable: false,
  checkable: true,
  visible: undefined,
  defaultVisible: true,
  checked: undefined,
  defaultChecked: true,
  nowrap: false,
});
const emits = defineEmits<{
  (e: 'update:visible', value: boolean): void;
  (e: 'update:checked', value: boolean): void;
  (e: 'close', ev: MouseEvent): void;
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
  emits('close', ev);
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
@import './index.less';
.yc-tag {
  padding: 0 8px;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 2px;
  font-weight: 500;
  color: rgb(29, 33, 41);
  vertical-align: middle;
  display: flex;
  align-items: center;
  .yc-tag-icon {
    margin-right: 4px;
  }
  .yc-tag-loading-icon,
  .yc-tag-close-button {
    margin-left: 4px;
    font-size: 12px;
  }
}

.yc-tag-color {
  &.yc-tag-checked {
    border-color: rgb(229, 230, 235);
  }
  &.yc-tag-checked {
    color: #fff;
    background-color: v-bind(color);
  }
}
</style>
