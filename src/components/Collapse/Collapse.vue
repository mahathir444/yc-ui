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
import { toRefs, provide } from 'vue';
import {
  CollapseProps,
  CollapseEmits,
  CollapseValue,
  CollapseProvide,
} from './type';
import { useControlValue } from '@shared/hooks';
import { COLLAPSE_PROVIDE_KEY } from '@shared/constants';
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
const {
  activeKey,
  defaultActiveKey,
  accordion,
  expandIconPosition,
  showExpandIcon,
  destroyOnHide,
} = toRefs(props);
// 受控的key
const computedActiveKey = useControlValue<CollapseValue[]>(
  activeKey,
  defaultActiveKey.value,
  (val) => {
    emits('update:activekey', val);
    emits('change', val);
  }
);
provide<CollapseProvide>(COLLAPSE_PROVIDE_KEY, {
  computedActiveKey,
  accordion,
  expandIconPosition,
  showExpandIcon,
  destroyOnHide,
});
</script>

<style lang="less" scoped>
@import './style/collapse.less';
</style>
