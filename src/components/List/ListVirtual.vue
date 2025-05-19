<template>
  <div class="yc-virtual-list" v-bind="containerProps">
    <div class="yc-list-content" v-bind="wrapperProps" @scroll="handleScroll">
      <!-- 虚拟列表 -->
      <template v-for="{ data, index: i } in list" :key="i">
        <slot name="item" :index="i" :item="data" />
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { toRefs, ref } from 'vue';
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
  (e: 'scroll'): void;
  (e: 'reachBottom'): void;
}>();
const { data, virtualListProps, offsetBottom } = toRefs(props);
// 虚拟列表
const { list, containerProps, wrapperProps } = useVirtualList(data, {
  itemHeight: virtualListProps.value?.itemHeight || 40,
  overscan: virtualListProps.value?.buffer || 10,
});
// 处理触底逻辑
const { isReach } = useScrollReach({
  offsetBottom,
  offsetRight: ref(0),
  reachBottomCb: () => emits('reachBottom'),
});
const handleScroll = (e: Event) => {
  emits('scroll');
  isReach(e);
};
</script>

<style lang="less">
@import './style/list.less';
</style>
