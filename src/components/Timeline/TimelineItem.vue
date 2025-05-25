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
.yc-timeline-item {
  position: relative;
  color: rgb(29, 33, 41);
  font-size: 14px;
  &:not(:last-child) {
    .yc-timeline-item-dot-line {
      position: absolute;
      border-color: rgb(229, 230, 235);
    }
  }
  .yc-timeline-item-dot-wrapper {
    position: absolute;

    .yc-timeline-item-dot-content {
      position: relative;

      .yc-timeline-item-dot {
        position: relative;
        width: 6px;
        height: 6px;
        color: rgb(22, 93, 255);
        border-radius: 50%;

        &.yc-timeline-item-dot-solid {
          background-color: rgb(22, 93, 255);
        }
        &.yc-timeline-item-dot-hollow {
          background-color: #fff;
          border: 2px solid rgb(22, 93, 255);
        }
      }
    }
  }
  .yc-timeline-item-content-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;

    gap: 4px;
    .yc-timeline-item-content {
      color: rgb(29, 33, 41);
      font-size: 14px;
      line-height: 1.5715;
    }
  }
  .yc-timeline-item-label {
    color: rgb(134, 144, 156);
    font-size: 12px;
    line-height: 1.667;
  }
}

// direction
.yc-timeline-item-direction-vertical {
  min-height: 78px;

  &:not(:last-child) {
    .yc-timeline-item-dot-line {
      top: 18px;
      bottom: -4px;
      left: 50%;
      transform: translate(-50%);
      width: 1px;
      border-left-width: 1px;
    }
  }
  .yc-timeline-item-dot-wrapper {
    height: 100%;
    text-align: center;
    .yc-timeline-item-dot-content {
      width: 6px;
      height: 22px;
      line-height: 22px;
      .yc-timeline-item-dot {
        top: 50%;
        margin-top: -3px;
      }
    }
  }
}
.yc-timeline-item-direction-horizontal {
  flex: 1;
  &:not(:last-child) {
    .yc-timeline-item-dot-line {
      right: 4px;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      height: 1px;
      border-top-width: 1px;
    }
  }
  .yc-timeline-item-dot-wrapper {
    width: 100%;
    .yc-timeline-item-dot-content {
      height: 6px;
      line-height: 6px;
    }
  }
}

// label-positon
.set-label-relative(@direction,@position) {
  &.yc-timeline-item-direction-@{direction} {
    &.yc-timeline-item-@{position} {
      margin-@{position}: if(@direction = vertical, 100px, 50px);
      .yc-timeline-item-label {
        @{position}: 0;
        & when(@position = left) {
          padding-right: 16px;
          transform: translateX(-100%);
        }
        & when(@position = right) {
          padding-left: 16px;
          transform: translateX(100%);
        }
        & when(@position = top) {
          padding-bottom: 16px;
          transform: translateY(-100%);
        }
        & when(@position = bottom) {
          padding-top: 16px;
          transform: translateY(100%);
        }
      }
      & when(@position = right) {
        .yc-timeline-item-content {
          text-align: right;
        }
      }
    }
  }
}
.yc-timeline-item-label-is-relative {
  .yc-timeline-item-label {
    position: absolute;
    top: 0;
    max-width: 100px;
  }
  .set-label-relative(horizontal,top);
  .set-label-relative(horizontal,bottom);
  .set-label-relative(vertical,left);
  .set-label-relative(vertical,right);
}

// 设置position
@positions: left, top, right, bottom;
.set-time-line-position(@position) {
  padding-@{position}: 6px;
  .yc-timeline-item-dot-wrapper {
    @{position}: 0;
  }
  .yc-timeline-item-content-wrapper {
    margin-@{position}: 16px;
  }
}
each(@positions,.(@value,@key){
  .yc-timeline-item-@{value}{
    .set-time-line-position(@value)

  }
});
</style>
