<template>
  <div
    :class="[
      'yc-card',
      `yc-card-size-${['small', 'medium'].includes(size) ? size : 'medium'}`,
      {
        'yc-card-bordered': bordered,
        'yc-card-hoverable': hoverable,
        'yc-card-loading': loading,
        'yc-card-contain-grid': hasGrid,
      },
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
      <yc-spin v-if="loading" is-size-inherit loading>
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
import useProvide from './hooks/useProvide';
import YcSpin from '@/components/Spin';
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
