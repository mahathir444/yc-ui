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
  // color:'',
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
.yc-badge {
  position: relative;
  display: inline-block;
  line-height: 1;
  .yc-badge-text,
  .yc-badge-number {
    min-width: 20px;
    height: 20px;
    padding: 0 6px;
    background-color: rgb(245, 63, 63);
    box-shadow: 0 0 0 2px #fff;
    color: #fff;
    font-weight: 500;
    font-size: 12px;
    line-height: 20px;
  }
  .yc-badge-dot,
  .yc-badge-text,
  .yc-badge-number {
    z-index: 2;
    position: absolute;
    top: 2px;
    right: 2px;
    overflow: hidden;
    text-align: center;
    border-radius: 20px;
    transform: translate(50%, -50%);
    transform-origin: 100% 0%;
  }

  .yc-badge-stauts-wrapper {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    .yc-badge-stauts-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
    }
    .yc-badge-status-text {
      color: rgb(29, 33, 41);
      font-size: 12px;
      line-height: 1.5715;
    }
  }
}

// status
.yc-badge-status-normal {
  background-color: rgb(201, 205, 212);
}
.yc-badge-status-success {
  background-color: rgb(0, 180, 42);
}
.yc-badge-status-danger {
  background-color: rgb(245, 63, 63);
}
.yc-badge-status-processing {
  background-color: rgb(22, 93, 255);
}
.yc-badge-status-warning {
  background-color: rgb(255, 125, 0);
}
// color
.yc-badge-color-red {
  background-color: rgb(245, 63, 63);
}
.yc-badge-color-orangered {
  background-color: rgb(247, 114, 52);
}
.yc-badge-color-orange {
  background-color: rgb(255, 125, 0);
}
.yc-badge-color-gold {
  background-color: rgb(247, 186, 30);
}
.yc-badge-color-lime {
  background-color: rgb(159, 219, 29);
}
.yc-badge-color-green {
  background-color: rgb(0, 180, 134);
}
.yc-badge-color-cyan {
  background-color: rgb(20, 201, 201);
}
.yc-badge-color-blue {
  background-color: rgb(52, 145, 250);
}
.yc-badge-color-arcoblue {
  background-color: rgb(22, 93, 255);
}
.yc-badge-color-purple {
  background-color: rgb(144, 46, 209);
}
.yc-badge-color-pinkpurple {
  background-color: rgb(217, 26, 217);
}
.yc-badge-color-magenta {
  background-color: rgb(245, 49, 157);
}
.yc-badge-color-gray {
  background-color: rgb(134, 144, 156);
}
</style>
