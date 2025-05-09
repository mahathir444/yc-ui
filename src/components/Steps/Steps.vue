<template>
  <div
    class="yc-steps"
    :class="[STEPS_DIRECTION_MAP[direction]]"
    :style="{
      gap,
    }"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { StepsProps, StepsEmits, StepsSlots } from './type';
import { STEPS_DIRECTION_MAP } from '@shared/constants';
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
const { direction, type } = provide(props, emits);
const gap = computed(() => {
  if (direction.value == 'horizontal') {
    if (type.value == 'arrow') {
      return '4px';
    } else if (type.value == 'navigation') {
      return '32px';
    }
    return '12px';
  } else {
    return '6px';
  }
});
</script>

<style lang="less" scoped>
@import './style/steps.less';
</style>
