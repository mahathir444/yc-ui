<template>
  <div
    :class="[
      'yc-steps',
      `yc-steps-mode-${type}`,
      `yc-steps-direction-${direction}`,
      `yc-steps-label-direction-${labelPlacement}`
      changeable ? 'yc-steps-item-changeable' : '',
    ]"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { StepsProps, StepsEmits, StepsSlots } from './type';
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
