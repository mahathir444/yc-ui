<template>
  <div class="yc-page-header">
    <div class="yc-page-header-wrapper">
      <div v-if="$slots.breadcrumb" class="yc-page-header-breadcrumb">
        <slot name="breadcrumb" />
      </div>
      <div class="yc-page-header-header">
        <div class="yc-page-header-main">
          <yc-icon-button :hover-size="30" @click="$emit('back', $event)">
            <slot name="back-icon">
              <icon-arrow-right />
            </slot>
          </yc-icon-button>
          <div class="yc-page-header-title text-ellipsis">
            <slot name="title">
              {{ title }}
            </slot>
          </div>
          <yc-divider :direction="'vertical'" />
          <div class="yc-page-header-subtitle text-ellipsis">
            <slot name="subtitle">
              {{ subtitle }}
            </slot>
          </div>
        </div>
        <div class="yc-page-header-extra">
          <slot name="extra" />
        </div>
      </div>
    </div>
    <div v-if="$slots.default" class="yc-page-header-content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PageHeaderProp } from './type';
import { IconArrowRight } from '@shared/icons';
import YcDivider from '@/components/Divider';
import { YcIconButton } from '@shared/components';
defineOptions({
  name: 'PageHeader',
});
withDefaults(defineProps<PageHeaderProp>(), {
  title: '',
  subtitle: '',
  showBack: true,
});
defineEmits<{
  (e: 'back', ev: Event): void;
}>();
</script>

<style lang="less" scoped>
@import './style/page-header.less';
</style>
