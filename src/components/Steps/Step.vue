<template>
  <div
    :class="[
      'yc-steps-item',
      curStep == computedCurrent && type == 'navigation'
        ? 'yc-steps-item-active'
        : '',
      lineLess ? 'yc-steps-item-line-less' : '',
      small ? 'yc-steps-item-size-small' : '',
      changeable ? 'yc-steps-item-changeable' : '',
      STEP_STATUS_CLASS[status],
      STEP_NEXT_STATUS_CLASS[nextStatus],
    ]"
    @click="handleClick"
  >
    <!-- icon -->
    <slot v-if="type != 'arrow'" name="node" :step="curStep" :status="status">
      <div class="yc-steps-item-node">
        <slot
          v-if="['default', 'navigation'].includes(type)"
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
    </slot>
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
import { STEP_STATUS_CLASS, STEP_NEXT_STATUS_CLASS } from '@shared/constants';
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
const { disabled } = toRefs(props);
// 接收注入
const { inject } = useProvide();
const {
  curStep,
  computedCurrent,
  step,
  type,
  changeable,
  status,
  nextStatus,
  lineLess: _lineLess,
  small: _small,
  emits,
} = inject(props);
// small
const small = computed(() => {
  return type.value != 'dot' ? _small.value : false;
});
// lineLess
const lineLess = computed(() => {
  return (
    _lineLess.value ||
    curStep.value == step.value ||
    ['arrow', 'navigation'].includes(type.value)
  );
});
// 处理点击
const handleClick = (e: Event) => {
  if (!changeable.value || disabled.value) return;
  computedCurrent.value = curStep.value;
  emits('change', computedCurrent.value, e);
};
</script>

<style lang="less" scoped>
@import './style/step.less';
@import './style/steps.less';
</style>
