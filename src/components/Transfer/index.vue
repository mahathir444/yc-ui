<template>
  <div class="yc-transfer">
    <TransferPanel v-model:selected="computedSelected" :data="sourceOptions" />
    <div class="yc-transfer-operations">
      <yc-button
        :disabled="!sourceChecked.length"
        shape="circle"
        @click="handleAdd"
      >
        <template #icon>
          <icon-arrow-right />
        </template>
      </yc-button>
      <yc-button
        :disabled="!targetChecked.length"
        shape="circle"
        @click="handleDel"
      >
        <template #icon>
          <icon-arrow-right :rotate="180" />
        </template>
      </yc-button>
    </div>
    <TransferPanel v-model:selected="computedSelected" :data="targetOptions" />
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs, computed, watch } from 'vue';
import { TransferItem } from './type';
import useControlValue from '@shared/hooks/useControlValue';
import { IconArrowRight } from '@shared/icons';
import TransferPanel from './TransferPanl.vue';
import YcButton from '@/components/Button';
const props = withDefaults(
  defineProps<{
    data?: TransferItem[];
    modelValue?: string[];
    defaultValue?: string[];
    selected?: string[];
    defaultSelected?: string[];
    disabled?: boolean;
  }>(),
  {
    data: () => [],
    modelValue: undefined,
    defaultValue: () => [],
    selected: undefined,
    defaultSelected: () => [],
  }
);
const emits = defineEmits<{
  (e: 'update:selected', value: string[]): void;
  (e: 'update:modelValue', value: string[]): void;
  (e: 'change', value: string[]): void;
}>();

const { modelValue, defaultValue, selected, defaultSelected, data } =
  toRefs(props);
// dataMap
const dataMap = computed(() => {
  return Object.fromEntries(data.value.map((item) => [item.value, item]));
});
const computedValueMap = ref<Record<string, TransferItem>>({});
// 计算的value
const computedValue = useControlValue<string[]>(
  modelValue,
  defaultValue.value,
  (val) => {
    emits('update:modelValue', val);
    emits('change', val);
  }
);
// 目标options
const targetOptions = computed(() => {
  return (computedValue.value as string[]).map((item) => {
    const target = dataMap.value[item];
    computedValueMap.value[item] = target;
    return target;
  });
});
// 源options
const sourceOptions = computed(() => {
  return data.value.filter(
    (item) => !computedValueMap.value[item.value as string]
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
const sourceChecked = computed(() => {
  return computedSelected.value.filter(
    (item: string) => !computedValueMap.value[item]
  );
});
const targetChecked = computed(() => {
  return computedSelected.value.filter(
    (item: string) => computedValueMap.value[item]
  );
});
// 处理添加
const handleAdd = () => {
  const checked = [...sourceChecked.value];
  computedValue.value = [...computedValue.value, ...sourceChecked.value];
  computedSelected.value = computedSelected.value.filter(
    (item: string) => !checked.includes(item)
  );
  console.log(computedValue.value, 'val');
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
.yc-transfer {
  display: flex;
  align-items: center;

  .yc-transfer-operations {
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
}
</style>
