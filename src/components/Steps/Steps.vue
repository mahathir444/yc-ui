<template>
  <div
    class="yc-steps-horizontal yc-steps-label-horizontal yc-steps-mode-default"
    :class="['yc-steps']"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
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
provide(props, emits);
</script>

<style lang="less" scoped>
.yc-steps {
  display: flex;
  gap: 12px;
}
</style>
