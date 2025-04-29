<template>
  <div
    :class="[
      'yc-card',
      bordered ? 'yc-card-bordered' : '',
      hoverable ? 'yc-card-hoverable' : '',
      loading ? 'yc-card-loading' : '',
      hasGrid ? 'yc-card-contain-grid' : '',
      CARD_SIZE_CLASS[size] || 'yc-card-size-medium ',
    ]"
  >
    <div
      v-if="title || extra || $slots.title || $slots.extra"
      class="yc-card-header"
      :style="headerStyle"
    >
      <div
        v-if="title || $slots.title"
        class="yc-card-header-title text-ellipsis"
      >
        <slot name="title">
          {{ title }}
        </slot>
      </div>
      <div
        v-if="extra || $slots.extra"
        class="yc-card-header-extra text-ellipsis"
      >
        <slot name="extra">
          {{ extra }}
        </slot>
      </div>
    </div>
    <div v-if="$slots.cover" class="yc-card-cover">
      <slot name="cover" />
    </div>
    <div class="yc-card-body" :style="bodyStyle">
      <yc-spin v-if="loading" loading>
        <slot />
      </yc-spin>
      <slot v-else />
      <div v-if="$slots.actions && !hasMeta" class="yc-card-actions">
        <div class="yc-card-actions-right text-ellipsis">
          <slot name="actions" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { CardProps, CardSlots } from './type';
import { CARD_SIZE_CLASS } from '@shared/constants';
import YcSpin from '@/components/Spin';
import useProvide from './hooks/useProvide';
defineOptions({
  name: 'Card',
});
defineSlots<CardSlots>();
const props = withDefaults(defineProps<CardProps>(), {
  bordered: true,
  loading: false,
  hoverable: false,
  size: 'medium',
  headerStyle: () => {
    return {};
  },
  bodyStyle: () => {
    return {};
  },
  title: '',
  extra: '',
});
// 注入
const { provide } = useProvide();
const { hasMeta, hasGrid, size } = provide(props);
</script>

<style lang="less" scoped>
@import './style/card.less';
</style>
