<template>
  <div
    class="yc-collapse"
    :class="{
      'yc-collapse-bordered': bordered,
    }"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs, provide } from 'vue';
import { CollapseProps, CollapseValue } from './type';
import { useControlValue } from '@shared/hooks';
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
const emits = defineEmits<{
  (e: 'update:activekey', value: any): void;
  (e: 'change', value: CollapseValue): void;
}>();
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

provide('collapse-props', {
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
