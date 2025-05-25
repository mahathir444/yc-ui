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
  </div>
</template>

<script lang="ts" setup>
import { TimelineProps, TimelineSlots } from './type';
import useContext from './hooks/useContext';
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
const { provide } = useContext();
const { direction, mode } = provide(props);
</script>

<style lang="less" scoped>
@import './style/timeline.less';
</style>
