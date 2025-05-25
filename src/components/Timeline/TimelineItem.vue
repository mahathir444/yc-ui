<template>
  <div
    role="listitem"
    :class="[
      'yc-timeline-item',
      `yc-timeline-item-${mode}`,
      `yc-timeline-item-direction-${direction}`,
      {
        'yc-timeline-item-label-is-relative': labelPosition == 'relative',
      },
    ]"
  >
    <div class="yc-timeline-item-dot-wrapper">
      <!-- line -->
      <div
        class="yc-timeline-item-dot-line"
        :style="{
          'border-style': lineType,
        }"
      ></div>
      <!-- dot -->
      <div class="yc-timeline-item-dot-content">
        <slot name="dot">
          <div
            :class="['yc-timeline-item-dot', `yc-timeline-item-dot-${dotType}`]"
            :style="{
              backgroundColor: dotColor,
            }"
          ></div>
        </slot>
      </div>
    </div>
    <!-- content -->
    <div class="yc-timeline-item-content-wrapper">
      <div class="yc-timeline-item-content">
        <slot />
      </div>
      <div v-if="labelPosition == 'same'" class="yc-timeline-item-label">
        <slot name="label">
          {{ label }}
        </slot>
      </div>
    </div>
    <div v-if="labelPosition == 'relative'" class="yc-timeline-item-label">
      <slot name="label">
        {{ label }}
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { TimelineItemProps, TimelineItemSlots } from './type';
import useContext from './hooks/useContext';
defineOptions({
  name: 'TimelineItem',
});
defineSlots<TimelineItemSlots>();
withDefaults(defineProps<TimelineItemProps>(), {
  dotColor: '',
  dotType: 'solid',
  lineType: 'solid',
  lineColor: '',
  label: '',
  position: 'top',
});
// 注入数据
const { inject } = useContext();
const { direction, mode, labelPosition } = inject();
</script>

<style lang="less" scoped>
@import './style/timeline-item.less';
</style>
