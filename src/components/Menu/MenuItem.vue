<template>
  <div
    :class="{
      'yc-menu-item': true,
      'yc-menu-selected': computedSelectedKeys == path,
      'yc-menu-disabled': disabled,
    }"
    @click="handleClick"
  >
    <div v-if="$slots.icon" class="yc-menu-icon">
      <slot name="icon" />
    </div>
    <div class="yc-menu-item-inner text-ellipsis">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs, inject } from 'vue';
defineOptions({
  name: 'MenuItem',
});
const props = withDefaults(
  defineProps<{
    key?: string;
    path?: string;
    disabled?: boolean;
  }>(),
  {
    key: '',
    path: '',
    disabled: false,
  }
);
const { path, disabled } = toRefs(props);
// 接收属性
const { computedSelectedKeys, emits } = inject('menu-props', {
  computedSelectedKeys: ref(''),
  emits: (() => {}) as any,
});
// 处理点击
const handleClick = () => {
  if (computedSelectedKeys.value == path.value || disabled.value) return;
  computedSelectedKeys.value = path.value;
  emits('menu-item-click', path.value);
};
</script>

<style lang="less" scoped>
.yc-menu-item {
  overflow: hidden;
  cursor: pointer;
  padding: 0 12px;
  margin-bottom: 4px;
  background-color: #fff;
  border-radius: 2px;
  line-height: 40px;
  color: rgb(78, 89, 105);
  font-size: 14px;
  transition: color 0.2s cubic-bezier(0, 0, 1, 1);
  display: flex;
  align-items: center;
  gap: 16px;
  .yc-menu-icon {
    line-height: 1;
  }
  &:not(.yc-menu-disabled) {
    &:hover {
      background-color: rgb(242, 243, 245);
    }
  }
  .yc-menu-item-inner {
    flex: 1;
  }
}
// 选中
.yc-menu-selected {
  font-weight: 500;
  background-color: rgb(242, 243, 245);
  color: rgb(22, 93, 255);
}
// 禁用
.yc-menu-disabled {
  color: rgb(201, 205, 212);
  background-color: #fff;
}
</style>
