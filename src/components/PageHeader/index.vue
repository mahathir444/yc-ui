<template>
  <div class="yc-page-header">
    <div class="yc-page-header-wrapper">
      <div v-if="$slots.breadcrumb" class="yc-page-header-breadcrumb">
        <slot name="breadcrumb" />
      </div>
      <div class="yc-page-header-header">
        <div class="yc-page-header-main">
          <yc-icon-button :hover-size="30" @click="$emit('back', $event)">
            <template #icon>
              <slot name="back-icon">
                <icon-arrow-right />
              </slot>
            </template>
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
    <div v-if="$slots.slot" class="yc-page-header-content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PageHeaderProp } from './type';
import { IconArrowRight } from '@shared/icons';
import YcDivider from '@/components/Divider';
import YcIconButton from '@shared/components/IconButton';
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
.yc-page-header {
  padding: 16px 0px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  .yc-page-header-wrapper {
    padding: 0 20px 0 24px;
    .yc-page-header-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      line-height: 28px;
      .yc-page-header-main {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        .yc-icon-button {
          margin-right: 12px;
          color: rgb(78, 89, 105);
          font-size: 14px;
          &:deep(.yc-icon) {
            transform: rotate(180deg);
          }
        }
        .yc-page-header-title {
          color: rgb(29, 33, 41);
          font-weight: 600;
          font-size: 20px;
        }
        .yc-page-header-subtitle {
          color: rgb(134, 144, 156);
          font-size: 14px;
        }
      }
      .yc-page-header-extra {
        overflow: hidden;
        white-space: nowrap;
      }
    }
  }
  .yc-page-header-content {
    padding: 20px 32px;
    border-top: 1px solid rgb(229, 230, 235);
  }
}
</style>
