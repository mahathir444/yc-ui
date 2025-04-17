<template>
  <div
    :class="{
      'yc-transfer': true,
      'yc-transfer-simple': simple,
      'yc-transfer-has-search': showSearch,
    }"
  >
    <!-- target -->
    <transfer-panel type="source">
      <template v-if="$slots.soruce" #default="{ selectedKeys, data }">
        <slot name="soruce" :data="selectedKeys" :selectedKeys="data" />
      </template>
      <template v-if="$slots['list-item']" #list-item="{ label, value }">
        <slot name="list-item" :label="label" :value="value" />
      </template>
      <template v-if="$slots['source-title']" #title>
        <slot name="source-title" />
      </template>
    </transfer-panel>
    <!-- operations -->
    <div v-if="!simple" class="yc-transfer-operations">
      <!-- to-target -->
      <yc-button
        :disabled="!sourceChecked.length || disabled"
        shape="circle"
        @click="handleAdd"
      >
        <template #icon>
          <slot name="to-target-icon">
            <icon-arrow-right />
          </slot>
        </template>
      </yc-button>
      <!-- to-source -->
      <yc-button
        v-if="!oneWay"
        :disabled="!targetChecked.length || disabled"
        shape="circle"
        @click="handleDel"
      >
        <template #icon>
          <slot name="to-soruce-icon">
            <icon-arrow-right :rotate="180" />
          </slot>
        </template>
      </yc-button>
    </div>
    <!-- target -->
    <transfer-panel type="target">
      <template v-if="$slots.target" #default="{ selectedKeys, data }">
        <slot name="target" :data="selectedKeys" :selectedKeys="data" />
      </template>

      <template v-if="$slots['list-item']" #list-item="{ label, value }">
        <slot name="list-item" :label="label" :value="value" />
      </template>
      <template v-if="$slots['target-title']" #title>
        <slot name="target-title" />
      </template>
    </transfer-panel>
  </div>
</template>

<script lang="ts" setup>
import { toRefs, computed, provide } from 'vue';
import { TransferProps, TransferProvide } from './type';
import { TRANSFER_PROVIDE_KEY } from '@shared/constants';
import { useControlValue } from '@shared/hooks';
import { IconArrowRight } from '@shared/icons';
import TransferPanel from './component/Panel.vue';
import YcButton from '@/components/Button';
defineOptions({
  name: 'Transfer',
});
const props = withDefaults(defineProps<TransferProps>(), {
  data: () => [],
  modelValue: undefined,
  defaultValue: () => [],
  selected: undefined,
  defaultSelected: () => [],
  disabled: false,
  simple: false,
  oneWay: false,
  showSearch: false,
  showSelectAll: true,
  title: () => ['Source', 'Target'],
  sourceInputSearchProps: () => {
    return {};
  },
  targetInputSearchProps: () => {
    return {};
  },
});
const emits = defineEmits<{
  (e: 'update:selected', value: string[]): void;
  (e: 'update:modelValue', value: string[]): void;
  (e: 'change', value: string[]): void;
  (e: 'select', value: string[]): void;
  (e: 'search', value: string, type: 'target' | 'source'): void;
}>();
const {
  modelValue,
  defaultValue,
  selected,
  defaultSelected,
  data,
  oneWay,
  simple,
  sourceInputSearchProps,
  targetInputSearchProps,
  showSearch,
  showSelectAll,
  disabled,
  title,
} = toRefs(props);
// dataMap
const dataMap = computed(() => {
  return Object.fromEntries(data.value.map((item) => [item.value, item]));
});
// 计算的value
const computedValue = useControlValue<string[]>(
  modelValue,
  defaultValue.value,
  (val) => {
    emits('update:modelValue', val);
    emits('change', val);
  }
);
// target
const computedValueMap = computed(() => {
  return Object.fromEntries(
    (computedValue.value as string[]).map((item) => {
      return [item, item];
    })
  );
});
// 选中的value
const computedSelected = useControlValue<string[]>(
  selected,
  defaultSelected.value,
  (val) => {
    emits('update:selected', val);
  }
);
// 源options
const sourceOptions = computed(() => {
  return data.value.filter((item) => {
    return !computedValueMap.value[item.value as string];
  });
});
// 目标options
const targetOptions = computed(() => {
  return (computedValue.value as string[]).map((item) => {
    const target = dataMap.value[item];
    return target;
  });
});
// 数据checked
const sourceChecked = computed(() => {
  return computedSelected.value.filter(
    (item: string) => !computedValueMap.value[item]
  );
});
// 目标checked
const targetChecked = computed(() => {
  return computedSelected.value.filter(
    (item: string) => computedValueMap.value[item]
  );
});
// 注入数据
provide<TransferProvide>(TRANSFER_PROVIDE_KEY, {
  computedValue,
  computedSelected,
  targetChecked,
  sourceChecked,
  sourceOptions,
  targetOptions,
  oneWay,
  simple,
  sourceInputSearchProps,
  targetInputSearchProps,
  showSearch,
  showSelectAll,
  disabled,
  title,
  emits,
});
// 处理添加
const handleAdd = () => {
  const checked = [...sourceChecked.value];
  computedValue.value = [...computedValue.value, ...sourceChecked.value];
  computedSelected.value = computedSelected.value.filter(
    (item: string) => !checked.includes(item)
  );
};
// 处理删除
const handleDel = () => {
  const checked = [...targetChecked.value];
  computedValue.value = computedValue.value.filter(
    (item: string) => !checked.includes(item)
  );
  computedSelected.value = computedSelected.value.filter(
    (item: string) => !checked.includes(item)
  );
};
</script>

<style lang="less" scoped>
@import './style/transfer.less';
</style>
