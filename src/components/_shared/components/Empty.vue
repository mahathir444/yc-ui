<template>
  <component v-if="slots?.empty || providerSlots.empty" :is="renderEmpty" />
  <yc-empty v-else />
</template>

<script lang="ts" setup>
import { toRefs, Slots } from 'vue';
import { useConfigProvder } from '@shared/hooks';
const props = defineProps<{
  name: string;
  slots?: Slots;
}>();
const { name } = toRefs(props);
// configProvider
const { slots: providerSlots } = useConfigProvder();
// 渲染empty
const renderEmpty = () => {
  return providerSlots.empty?.({
    component: name.value,
  });
};
</script>

<style lang="less" scoped></style>
