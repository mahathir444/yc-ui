<template>
  <div class="yc-steps" :class="[STEPS_DIRECTION_MAP[direction]]">
    <slot />
  </div>
</template>

<script lang="ts" setup>
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
provide(props, emits);
</script>

<style lang="less" scoped>
.yc-steps {
  display: flex;
}
.yc-steps-horizontal {
  gap: 12px;
}
.yc-steps-vertical {
  flex-direction: column;
  gap: 6px;
}
</style>
