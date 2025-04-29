<template>
  <div class="yc-badge">
    <slot />
    <div v-if="className == 'yc-badge-dot'" class="yc-badge-stauts-wrapper">
      <div
        :class="[
          'yc-badge-stauts-dot',
          color ? BADGE_COLOR_CLASS[color] : '',
          status ? BADGE_STATUS_CLASS[status] : '',
        ]"
      ></div>
      <div class="yc-badge-status-text">
        {{ badgeText }}
      </div>
    </div>
    <div v-else :class="[className]" :style="style">
      {{ badgeText }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, toRefs } from 'vue';
import { BadgeProps, BadgeSlots } from './type';
import { BADGE_COLOR_CLASS, BADGE_STATUS_CLASS } from '@shared/constants';
defineOptions({
  name: 'Badge',
});
defineSlots<BadgeSlots>();
const props = withDefaults(defineProps<BadgeProps>(), {
  text: '',
  dot: false,
  dotStyle: () => {
    return {};
  },
  maxCount: 99,
  offset: () => {
    return [];
  },
  // color:,
  // status:
  // count:
});
const { text, dot, count, maxCount, offset, dotStyle, status, color } =
  toRefs(props);
// style
const style = computed(() => {
  return {
    right: offset.value[0] + 2,
    top: offset.value[1] + 2,
    ...(!text && dot ? dotStyle.value : {}),
  };
});
const className = computed(() => {
  if (color.value || status.value) return 'yc-badge-dot';
  if (text.value) return 'yc-badge-text';
  if (dot.value) return 'yc-badge-dot';
  else return 'yc-badge-number';
});
// 获取text
const badgeText = computed(() => {
  if (color.value || status.value || text.value || dot.value) return text.value;
  else return count.value! >= maxCount.value ? maxCount.value : count.value;
});
</script>

<style lang="less" scoped>
@import './style/badge.less';
</style>
