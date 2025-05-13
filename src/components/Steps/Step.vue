<template>
  <div
    :class="[
      'yc-steps-item',
      `yc-steps-item-${status}`,
      `yc-steps-item-next-${nextStatus}`,
      {
        'yc-steps-item-active':
          curStep == computedCurrent && type == 'navigation',
        'yc-steps-item-line-less': lineLess,
        'yc-steps-item-size-small': small,
      },
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
