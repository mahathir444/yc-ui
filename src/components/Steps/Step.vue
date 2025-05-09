<template>
  <div
    class="yc-steps-item"
    :class="[
      lineLess || curStep == step ? 'yc-steps-item-line-less' : '',
      type == 'default' && small ? 'yc-steps-item-size-small' : '',
      labelPositionClass,
      STEP_TYPE_CLASS[type],
      STEP_DIRECTION_MAP[direction],
      STEP_STATUS_CLASS[status],
      STEP_LINE_STATUS_CLASS[nextStatus],
    ]"
  >
    <!-- icon -->
    <div class="yc-steps-item-node">
      <slot
        v-if="type == 'default'"
        name="icon"
        :status="status"
        :step="curStep"
      >
        <div class="yc-steps-icon">
          <icon-check v-if="status == 'finish'" :stroke-width="1" />
          <icon-close v-else-if="status == 'error'" />
          <template v-else>
            {{ curStep }}
          </template>
        </div>
      </slot>
    </div>
    <!-- content -->
    <div class="yc-steps-item-content">
      <div class="yc-steps-item-title">
        <slot>
          {{ title }}
        </slot>
      </div>
      <div
        v-if="$slots.description || description"
        class="yc-steps-item-description"
      >
        <slot name="description">
          {{ description }}
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { toRefs, computed } from 'vue';
import { StepProps, StepSlots } from './type';
import { IconCheck, IconClose } from '@shared/icons';
import {
  STEP_STATUS_CLASS,
  STEP_LINE_STATUS_CLASS,
  STEP_LABEL_DIRECTION_MAP,
  STEP_DIRECTION_MAP,
  STEP_TYPE_CLASS,
} from '@shared/constants';
import useProvide from './hooks/useProvide';
defineOptions({
  name: 'Step',
});
defineSlots<StepSlots>();
const props = withDefaults(defineProps<StepProps>(), {
  title: '',
  description: '',
  status: undefined,
  disabled: false,
});
const { status: _status } = toRefs(props);
// 接收注入
const { inject } = useProvide();
const {
  curStep,
  step,
  lineLess,
  labelPlacement,
  direction,
  type,
  status,
  nextStatus,
  small,
} = inject(props);
const labelPositionClass = computed(() => {
  if (type.value == 'default') {
    return direction.value == 'horizontal'
      ? STEP_LABEL_DIRECTION_MAP[labelPlacement.value]
      : STEP_LABEL_DIRECTION_MAP.horizontal;
  } else if (type.value == 'dot') {
    return STEP_LABEL_DIRECTION_MAP.horizontal;
  }
});
</script>

<style lang="less" scoped>
@import './style/step.less';
.yc-steps-item {
  position: relative;
  &,
  .yc-steps-item-title,
  .yc-steps-item-description {
    white-space: nowrap;
  }
  .yc-steps-item-node {
    font-weight: 500;
    font-size: 16px;
    .yc-steps-icon {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .yc-steps-item-content {
    display: flex;
    flex-direction: column;
    gap: 2px;
    .yc-steps-item-title {
      width: fit-content;
      line-height: 28px;
      font-size: 16px;
      color: rgb(29, 33, 41);
    }
    .yc-steps-item-description {
      max-width: 140px;
      font-size: 12px;
      color: rgb(134, 144, 156);
    }
  }
}
//
.yc-steps-item-size-small {
  .yc-steps-item-node {
    font-size: 14px;
    .yc-steps-icon {
      width: 24px;
      height: 24px;
    }
  }
  .yc-steps-item-content {
    .yc-steps-item-title {
      font-size: 14px;
      line-height: 24px;
    }
  }
}
// labelPlacement
.yc-steps-item-label-horizontal {
  display: flex;
  align-items: center;
  gap: 12px;
  overflow: hidden;

  .yc-steps-item-node {
    height: 100%;
  }
}
.yc-steps-item-label-vertical {
  display: flex;
  flex-direction: column;
  gap: 2px;

  &.yc-steps-item-size-small {
    .yc-steps-item-node {
      margin-left: 58px;
    }
  }

  .yc-steps-item-node {
    margin-left: 56px;
  }

  .yc-steps-item-content {
    width: 140px;
    align-items: center;
  }
}
// position
.yc-steps-item-vertical {
  min-height: 90px;
  .yc-steps-item-content {
    height: 100%;
  }
  &::after {
    content: '';
    position: absolute;
    left: 13.5px;
    top: 34px;
    bottom: 0;
    width: 1px;
  }
  &.yc-steps-item-mode-dot {
    &::after {
      top: 21px;
      left: 4.5px;
    }
  }
  &.yc-steps-item-size-small {
    &::after {
      left: 11.5px;
      top: 30px;
      bottom: 6px;
    }
  }
}
.yc-steps-item-horizontal {
  &:not(:last-child) {
    flex: 1;
  }
  &.yc-steps-item-label-horizontal:not(.yc-steps-item-line-less) {
    .yc-steps-item-title {
      position: relative;
      &::after {
        content: '';
        position: absolute;
        top: 13.5px;
        left: calc(100% + 12px);
        width: 5000px;
        height: 1px;
      }
    }
    &.yc-steps-item-size-small {
      .yc-steps-item-title {
        &::after {
          top: 11.5px;
        }
      }
    }
  }
  &.yc-steps-item-label-vertical:not(.yc-steps-item-line-less) {
    &::after {
      content: '';
      position: absolute;
      top: 13.5px;
      left: 96px;
      right: -56px;
      height: 1px;
    }
  }
  &.yc-steps-item-size-small {
    .yc-steps-item-title {
      &::after {
        top: 11.5px;
        left: 94px;
      }
    }
  }
}
// mode
.yc-steps-item-mode-dot {
  align-items: flex-start;
  .yc-steps-item-node {
    margin-top: 6px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }
}
</style>
