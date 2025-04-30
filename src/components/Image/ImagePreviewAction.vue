<template>
  <yc-tooltip :content="name" :disabled="!name.length" position="top">
    <div
      :class="{
        'yc-image-preview-toolbar-action': true,
        'yc-image-preview-toolbar-action-disabled': disabled,
      }"
      @click="handleEvent('click', $event)"
      @dblclick="handleEvent('dblclick', $event)"
      @contextmenu="handleEvent('contextmenu', $event)"
    >
      <span class="yc-image-preview-toolbar-action-content">
        <slot />
      </span>
    </div>
  </yc-tooltip>
</template>

<script lang="ts" setup>
import {
  ImagePreviewActionProps,
  ImagePreviewActionEmits,
  ImagePreviewActionSlots,
} from './type';
import YcTooltip from '@/components/Tooltip';
defineOptions({
  name: 'ImagePreviewAction',
});
defineSlots<ImagePreviewActionSlots>();
const props = withDefaults(defineProps<ImagePreviewActionProps>(), {
  name: '',
  disabled: false,
});
const emits = defineEmits<ImagePreviewActionEmits>();
// 处理事件触发
const handleEvent = (type: string, ev: MouseEvent) => {
  if (props.disabled) return;
  emits(type as keyof ImagePreviewActionEmits, ev);
};
</script>

<style lang="less" scoped>
.yc-image-preview-toolbar-action {
  cursor: pointer;
  border-radius: 2px;
  background-color: transparent;
  color: rgb(78, 89, 105);
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  &-content {
    padding: 13px;
    line-height: 1;
  }
  &:not(&-disabled):hover {
    color: rgb(22, 93, 255);
    background-color: rgb(242, 243, 245);
  }
}
.yc-image-preview-toolbar-action-disabled {
  color: rgb(201, 205, 212);
  background-color: transparent;
  cursor: not-allowed;
}
</style>
