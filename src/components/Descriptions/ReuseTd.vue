<template>
  <td
    :class="[
      type == 'label'
        ? 'yc-descriptions-item-label'
        : 'yc-descriptions-item-value',
      `yc-descriptions-item-cell-size-${size}`
      bordered ? 'yc-descriptions-item-cell-bordered' : '',
    ]"
    :style="{
      ...(type == 'label' ? labelStyle : valueStyle),
      textAlign: isObject(align) ? (align[type] ?? 'left') : align,
    }"
    :colspan="colspan"
  >
    <component
      v-if="type == 'label'"
      :is="
        getSlotFunction(
          slots.label?.({
            label: data.label,
            index,
            data,
          }) ?? data.label
        )
      "
    />
    <component
      v-else
      :is="
        getSlotFunction(
          slots.value?.({
            value: data.value,
            index,
            data,
          }) ?? data.value
        )
      "
    />
  </td>
</template>

<script lang="ts" setup>
import { DescData } from './type';
import { getSlotFunction, isObject } from '@shared/utils';
import useProvide from './hooks/useProvide';
defineProps<{
  data: DescData;
  index: number;
  type: 'label' | 'value';
  colspan?: number;
}>();
const { inject } = useProvide();
const { labelStyle, valueStyle, bordered, size, align, slots } = inject();
</script>

<style lang="less" scoped>
@import './style/descriptions-item.less';
</style>
