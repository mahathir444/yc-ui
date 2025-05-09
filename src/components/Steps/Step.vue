<template>
  <div
    class="yc-steps-item"
    :class="[
      !lineLess ? 'yc-steps-item-has-line' : '',
      labelPlacement == 'vertical'
        ? 'yc-steps-item-label-vertical'
        : 'yc-steps-item-label-horizontal',
      direction == 'vertical'
        ? 'yc-steps-item-vertical'
        : 'yc-steps-item-horizontal',
      STEP_STATUS_CLASS[status],
    ]"
  >
    <!-- icon -->
    <div class="yc-steps-item-node">
      <slot name="icon" :status="status" :step="curStep">
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
import { ref, computed, toRefs, onMounted } from 'vue';
import { StepProps, StepSlots } from './type';
import { IconCheck, IconClose } from '@shared/icons';
import { STEP_STATUS_CLASS } from '@shared/constants';
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
  step,
  curStep,
  computedCurrent,
  lineLess,
  labelPlacement,
  direction,
  statusArr,
} = inject(props);
</script>

<style lang="less" scoped>
.yc-steps-item {
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  &:not(:last-child) {
    flex: 1;
  }
  &,
  .yc-steps-item-node,
  .yc-steps-item-content {
    flex-shrink: 0;
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
    .yc-steps-item-title,
    .yc-steps-item-description {
      white-space: nowrap;
    }
    .yc-steps-item-title {
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
.yc-steps-item-has-line {
  &:not(:last-child) {
    &.yc-steps-item-label-horizontal {
      .yc-steps-item-title {
        &::after {
          content: '';
          position: absolute;
          top: 13.5px;
          left: calc(100% + 12px);
          display: block;
          width: 5000px;
          height: 1px;
          background-color: rgb(229, 230, 235);
        }
      }
    }

    &.yc-steps-item-label-vertical {
    }
  }
}
// labelPlacement
.yc-steps-item-label-vertical {
  flex-direction: column;
  gap: 2px;
  align-items: center;
  .yc-steps-item-content {
    align-items: center;
    width: fit-content;
  }
}
.yc-steps-item-label-horizontal {
  display: flex;
  gap: 12px;
  align-items: center;

  .yc-steps-item-node {
    height: 100%;
  }
  .yc-steps-item-content {
    .yc-steps-item-title {
      position: relative;
      width: fit-content;
    }
  }
}

// status
.yc-steps-item-wait {
  .yc-steps-icon {
    color: rgb(78, 89, 105);
    background-color: rgb(242, 243, 245);
    border: 1px solid transparent;
  }
  .yc-steps-item-content {
    .yc-steps-item-title {
      color: rgb(78, 89, 105);
    }
  }
}
.yc-steps-item-process {
  .yc-steps-icon {
    color: #fff;
    background-color: rgb(22, 93, 255);
    border: 1px solid transparent;
  }
}
.yc-steps-item-finish {
  .yc-steps-icon {
    color: rgb(22, 93, 255);
    background-color: rgb(232, 243, 255);
    border: 1px solid transparent;
  }
}
.yc-steps-item-error {
  .yc-steps-icon {
    color: #fff;
    background-color: rgb(245, 63, 63);
    border: 1px solid transparent;
  }
}
</style>
