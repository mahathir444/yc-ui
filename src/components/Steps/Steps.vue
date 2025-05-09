<template>
  <div
    :class="[
      'yc-steps',
      changeable ? 'yc-steps-item-changeable' : '',
      STEPS_DIRECTION_MAP[direction],
      STEPS_TYPE_CLASS[type],
      STEPS_LABEL_DIRECTION_MAP[labelPlacement],
    ]"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { StepsProps, StepsEmits, StepsSlots } from './type';
import {
  STEPS_TYPE_CLASS,
  STEPS_LABEL_DIRECTION_MAP,
  STEPS_DIRECTION_MAP,
} from '@shared/constants';
import useProvide from './hooks/useProvide';
defineOptions({
  name: 'Steps',
});
defineSlots<StepsSlots>();
const props = withDefaults(defineProps<StepsProps>(), {
  type: 'default',
  direction: 'horizontal',
  labelPlacement: 'horizontal',
  current: undefined,
  defaultCurrent: 1,
  status: 'process',
  lineLess: false,
  small: false,
  changeable: false,
});
const emits = defineEmits<StepsEmits>();
// 注入数据
const { provide } = useProvide();
const { type, labelPlacement, direction } = provide(props, emits);
</script>

<style lang="less" scoped>
@import './style/steps.less';
</style>
