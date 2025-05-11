<template>
  <transition name="slide-dynamic-origin" @after-leave="$emit('afterClose')">
    <div
      v-if="visible"
      :class="[
        'yc-alert',
        `yc-alert-${type}`,
        title || $slots.title ? 'yc-alert-has-title' : '',
        center || banner ? 'yc-alert-center' : '',
        banner ? 'yc-alert-banner' : '',
      ]"
    >
      <div v-if="showIcon" class="yc-alert-icon">
        <slot name="icon">
          <component
            :is="TYPE_ICON_MAP[type]"
            :color="TYPE_ICON_COLOR_MAP[type]"
          />
        </slot>
      </div>
      <div class="yc-alert-body">
        <div v-if="$slots.title || title" class="yc-alert-title">
          <slot name="title">
            {{ title }}
          </slot>
        </div>
        <div class="yc-alert-content">
          <slot />
        </div>
      </div>
      <div v-if="$slots.action" class="yc-alert-action">
        <slot name="action" />
      </div>
      <div class="yc-alert-close-btn" role="button" aria-label="Close">
        <yc-icon-button @click="handleClose">
          <slot v-if="$slots['close-element']" name="close-element" />
        </yc-icon-button>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { AlertProps, AlertEmits, AlertSlots } from './type';
import { TYPE_ICON_MAP, TYPE_ICON_COLOR_MAP } from '@shared/constants';
import { YcIconButton } from '@shared/components';
defineOptions({
  name: 'Alert',
});
defineSlots<AlertSlots>();
withDefaults(defineProps<AlertProps>(), {
  type: 'info',
  showIcon: true,
  closable: true,
  title: '',
  banner: false,
  center: false,
});
const emits = defineEmits<AlertEmits>();
// v可见性
const visible = ref<boolean>(true);
// 处理关闭
const handleClose = (ev: MouseEvent) => {
  visible.value = false;
  emits('close', ev);
};
</script>

<style lang="less" scoped>
@import './style/alert.less';
</style>
