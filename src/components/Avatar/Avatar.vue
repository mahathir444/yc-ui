<template>
  <div
    :class="['yc-avatar', `yc-avatar-shape-${shape}`]"
    :style="{
      width: size + 'px',
      height: size + 'px',
    }"
    ref="avatarRef"
    @click="$emit('click', $event)"
  >
    <span
      v-if="$slots.default && !imageUrl"
      class="yc-avatar-text"
      :style="{
        transform: `scale(${scale}) translateX(-50%)`,
      }"
      ref="textRef"
    >
      <slot />
    </span>
    <span v-if="imageUrl" class="yc-avatar-image">
      <img
        v-if="!isLoadError"
        :src="imageUrl"
        :style="{
          objectFit,
        }"
        alt="avatar"
        @load="$emit('load')"
        @error="handleError"
      />
      <div v-else class="yc-avatar-image-icon">
        <icon-image-close />
      </div>
    </span>

    <div
      v-if="$slots['trigger-icon']"
      :class="{
        'yc-avatar-trigger-icon-button': triggerType == 'button',
        'yc-avatar-trigger-icon-mask': triggerType == 'mask',
      }"
      :style="triggerIconStyle"
    >
      <slot name="trigger-icon" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useResizeObserver } from '@vueuse/core';
import { IconImageClose } from '@shared/icons';
import { AvatarProps, AvatarSlots, AvatarEmits } from './type';
import useContext from './hooks/useContext';
defineOptions({
  name: 'Avatar',
});
defineSlots<AvatarSlots>();
const props = withDefaults(defineProps<AvatarProps>(), {
  shape: 'round',
  imageUrl: '',
  size: 40,
  autoFixFontSize: true,
  triggerType: 'button',
  triggerIconStyle: () => {
    return {};
  },
  objectFit: 'cover',
});
const emits = defineEmits<AvatarEmits>();
// 接收注入
const { inject } = useContext();
const { size, autoFixFontSize, shape } = inject(props);
// 是否加载错误
const isLoadError = ref<boolean>(false);
// scale
const scale = ref(1);
// textRef
const textRef = ref<HTMLDivElement>();
// avatart
const avatarRef = ref<HTMLDivElement>();
// 检测text的大小从而动态计算字体大小
useResizeObserver(textRef, () => {
  if (!autoFixFontSize.value) return;
  const avatarWidth = size.value ?? avatarRef.value!.offsetWidth;
  const textWidth = textRef.value!.offsetWidth;
  const textScale = avatarWidth / (textWidth + 8);
  scale.value = avatarWidth && textScale < 1 ? textScale : 1;
});
// 处理错误情况
const handleError = () => {
  isLoadError.value = true;
  emits('error');
};
</script>

<style lang="less" scoped>
@import './style/avatar.less';
</style>
