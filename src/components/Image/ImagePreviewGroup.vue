<template>
  <image-preview
    v-bind="props"
    :src="src"
    @update:visible="handleVisibleChange"
  >
    <template #arrow>
      <div class="yc-image-preview-arrow">
        <image-preview-arrow type="left" @click="handleCurrentChange('pre')" />
        <image-preview-arrow
          type="right"
          @click="handleCurrentChange('next')"
        />
      </div>
    </template>
    <template v-if="$slots.actions" #actions>
      <slot name="actions" />
    </template>
  </image-preview>
</template>

<script lang="ts" setup>
import { toRefs, computed, useSlots } from 'vue';
import {
  ImagePreviewGroupProps,
  ImagePreviewGroupEmits,
  ImagePreviewGroupSlots,
} from './type';
import { onKeyStroke } from '@vueuse/core';
import { useControlValue, findComponentsFromVnodes } from '@shared/utils';
import ImagePreview from './ImagePreview.vue';
import ImagePreviewArrow from './ImagePreviewArrow.vue';
import Image from './Image.vue';
defineOptions({
  name: 'ImagePreviewGroup',
  inheritAttrs: false,
});
defineSlots<ImagePreviewGroupSlots>();
const props = withDefaults(defineProps<ImagePreviewGroupProps>(), {
  visible: undefined,
  defaultVisible: false,
  maskClosable: true,
  closable: true,
  actionsLayout: () => [
    'fullScreen',
    'rotateRight',
    'rotateLeft',
    'zoomIn',
    'zoomOut',
    'originalSize',
  ],
  popupContainer: undefined,
  escToClose: true,
  wheelZoom: true,
  keyboard: true,
  defaultScale: 1,
  zoomRate: 1.1,
  srcList: () => [],
  current: undefined,
  defaultCurrent: 0,
  infinite: false,
});
const emits = defineEmits<ImagePreviewGroupEmits>();
// 解构属性
const {
  current,
  defaultCurrent,
  srcList: _srcList,
  infinite,
  keyboard,
} = toRefs(props);
// 当前的链接
const computedCurrent = useControlValue<number>(
  current,
  defaultCurrent.value,
  (val) => {
    emits('update:current', val);
    emits('change', val);
  }
);
// 插槽
const slots = useSlots();
// srcList
const srcList = computed(() => {
  if (_srcList.value.length) return _srcList.value;
  if (!slots.default) return [];
  const images = findComponentsFromVnodes(
    slots.default?.() || [],
    Image.name as string
  );
  return images.map((image) => image?.props?.src);
});
// src
const src = computed(() => srcList.value[computedCurrent.value]);
// 处理index发生改变
const handleCurrentChange = (type: string) => {
  let index = 0;
  if (
    !infinite.value &&
    ((type == 'pre' && computedCurrent.value == 0) ||
      (type == 'next' && computedCurrent.value == srcList.value.length - 1))
  ) {
    return;
  }
  if (type == 'pre') {
    index = computedCurrent.value - 1;
    index = index < 0 ? srcList.value.length - 1 : index;
  } else {
    index = computedCurrent.value + 1;
    index = index == srcList.value.length ? 0 : index;
  }
  computedCurrent.value = index;
};
// 处理visibleChange
const handleVisibleChange = (val: boolean) => {
  emits('update:visible', val);
  emits('visible-change', val);
};
const intLisenter = () => {
  if (keyboard.value) {
    const map: Record<string, string> = {
      ArrowLeft: 'pre',
      ArrowRight: 'next',
    };
    onKeyStroke(['ArrowLeft', 'ArrowRight'], (e) => {
      handleCurrentChange(map[e.key]);
    });
  }
};
intLisenter();
</script>
