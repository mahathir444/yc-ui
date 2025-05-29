<template>
  <div
    role="list"
    :class="[
      'yc-timeline',
      `yc-timeline-direction-${direction}`,
      `yc-timeline-${mode}`,
      {
        'yc-timeline-reverse': reverse,
      },
    ]"
  >
    <slot />
    <yc-timeline-item v-if="pending">
      <template #dot>
        <yc-spin :size="12" style="margin-top: -10px" />
      </template>
      <span v-if="isString(pending)">{{ pending }}</span>
    </yc-timeline-item>
  </div>
</template>

<script lang="ts" setup>
import { TimelineProps, TimelineSlots } from './type';
import { isString } from '@shared/utils';
import useContext from './hooks/useContext';
import YcTimelineItem from './TimelineItem.vue';
import YcSpin from '@/components/Spin';
defineOptions({
  name: 'Timeline',
});
defineSlots<TimelineSlots>();
const props = withDefaults(defineProps<TimelineProps>(), {
  reverse: false,
  direction: 'vertical',
  mode: 'left',
  pending: false,
  labelPosition: 'same',
});
// 注入数据
const { direction, mode } = useContext().provide(props);
</script>

<style lang="less" scoped>
@import './style/timeline.less';
</style>
