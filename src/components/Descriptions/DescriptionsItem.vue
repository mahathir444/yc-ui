<template>
  <td
    class="yc-descriptions-item-label yc-descriptions-item-label-block"
    :style="{
      textAlign: isObject(align) ? (align.label ?? 'left') : align,
    }"
  >
    <slot name="label">
      {{ label }}
    </slot>
  </td>
  <td
    class="yc-descriptions-item-value yc-descriptions-item-value-block"
    :colspan="span"
    :style="{
      textAlign: isObject(align) ? (align.label ?? 'left') : align,
    }"
  >
    <slot />
  </td>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { DescriptionsItemProps, DescriptionsItemSlots } from './type';
import { isObject } from '@shared/utils';
import useProvide from './hooks/useProvide';
defineOptions({
  name: 'DescriptionsItem',
});
defineSlots<DescriptionsItemSlots>();
const props = withDefaults(defineProps<DescriptionsItemProps>(), {
  span: 1,
  label: '',
});
// 接收注入
const { inject } = useProvide();
const { align, length } = inject();
// 计算span
const span = computed(() => {
  const value = props.span * 2 - 1;
  return value > length.value ? length.value : value;
});
</script>

<style lang="less" scoped>
.yc-descriptions-item,
.yc-descriptions-item-label,
.yc-descriptions-item-value {
  box-sizing: border-box;
  font-size: 14px;
  line-height: 1.5715;
}
.yc-descriptions-item-label-block {
  width: 1px;
  color: rgb(134, 144, 156);
  font-weight: 500;
  white-space: nowrap;
}
.arco-descriptions-item-value-block {
  color: rgb(29, 33, 41);
  font-weight: 400;
  white-space: pre-wrap;
  word-break: break-word;
}
</style>
