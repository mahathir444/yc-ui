<template>
  <div
    class="yc-virtual-list"
    v-bind="containerProps"
    @scroll="isReach"
    ref="listRef"
  >
    <div class="yc-list-content" v-bind="wrapperProps">
      <!-- 虚拟列表 -->
      <template v-for="{ data, index: i } in list" :key="i">
        <slot name="item" :index="i" :item="data" />
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { toRefs, ref, watch, nextTick } from 'vue';
import { useVirtualList } from '@vueuse/core';
import { VirtualListProps } from '@/components/Select';
import { ObjectData } from '@shared/type';
import useScrollReach from '@/components/Scrollbar/hooks/useScrollReach';
const props = defineProps<{
  data: ObjectData[];
  offsetBottom: number;
  virtualListProps: VirtualListProps;
}>();
const emits = defineEmits<{
  (e: 'scroll', isBottomReached: boolean): void;
  (e: 'reachBottom'): void;
}>();
const { data, virtualListProps, offsetBottom } = toRefs(props);
// listRef
const listRef = ref<HTMLDivElement>();
// 虚拟列表
const { list, containerProps, wrapperProps } = useVirtualList(data, {
  itemHeight: virtualListProps.value?.itemHeight || 40,
  overscan: virtualListProps.value?.buffer || 10,
});
// 处理触底逻辑
const { isReach } = useScrollReach({
  offsetBottom,
  offsetRight: ref(0),
  scrolCb: (params) => {
    const { isBottomReached } = params;
    emits('scroll', isBottomReached);
  },
  reachBottomCb: () => emits('reachBottom'),
});

watch(
  () => data.value.length,
  async () => {
    await nextTick();
    isReach({
      e: listRef.value as HTMLDivElement,
    } as unknown as Event);
  }
);
</script>

<style lang="less">
@import './style/list.less';
</style>
