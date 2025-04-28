<template>
  <div
    :class="{
      'yc-collapse': true,
      'yc-collapse-bordered': bordered,
    }"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { CollapseProps, CollapseEmits } from './type';
import useProvide from './hooks/useProvide';
defineOptions({
  name: 'Collapse',
});
const props = withDefaults(defineProps<CollapseProps>(), {
  activeKey: undefined,
  defaultActiveKey: () => [],
  accordion: false,
  showExpandIcon: true,
  expandIconPosition: 'left',
  bordered: true,
  destroyOnHide: false,
});
const emits = defineEmits<CollapseEmits>();
// 注入数据
const { provide } = useProvide();
provide(props, emits);
</script>

<style lang="less" scoped>
@import './style/collapse.less';
</style>
