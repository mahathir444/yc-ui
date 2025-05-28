<template>
  <div
    :class="[
      'yc-list-wrapper',
      `yc-list-size-${size}`,
      {
        'yc-list-bordered': bordered,
        'yc-list-hoverable': hoverable,
        'yc-list-split': split,
      },
    ]"
  >
    <yc-spin :loading="loading" class="yc-list-spin">
      <!-- 渲染真实列表 -->
      <yc-scrollbar
        :style="{
          maxHeight: isVirtualList ? '' : maxHeight,
        }"
        :offset-bottom="bottomOffset"
        :scrollbar="scrollbar"
        class="yc-list"
        @scroll="(_v, _v1, _v2, v) => handleScroll(v)"
        @reach-bottom="$emit('reach-bottom')"
      >
        <div class="yc-list-content-wrapper">
          <div v-if="$slots.header" class="yc-list-header">
            <slot name="header" />
          </div>
          <!-- 渲染虚拟列表 -->
          <virtual-list
            v-if="isVirtualList"
            :data="data"
            :virtual-list-props="virtualListProps"
            :offset-bottom="bottomOffset"
            :style="{
              maxHeight,
            }"
            @reach-bottom="$emit('reach-bottom')"
            @scroll="handleScroll"
          >
            <template #item="scope">
              <slot name="item" v-bind="scope" />
            </template>
          </virtual-list>
          <!-- 渲染普通列表 -->
          <div v-else role="list" class="yc-list-content">
            <!-- slot -->
            <slot />
            <!-- grid -->
            <yc-grid v-if="gridProps" v-bind="gridProps">
              <yc-grid-item v-for="(item, i) in curList" :key="i">
                <slot name="item" :index="i" :item="item" />
              </yc-grid-item>
            </yc-grid>
            <!-- list -->
            <template v-else>
              <template v-for="(item, i) in curList" :key="i">
                <slot name="item" :index="i" :item="item" />
              </template>
            </template>
          </div>
          <!-- empty -->
          <slot-render
            v-if="!$slots.default && !curList.length"
            :render="$slots.empty || renderEmpty"
          >
            <yc-empty v-if="!$slots.empty && !providerSlots.empty" />
          </slot-render>
          <!-- footer -->
          <div v-if="$slots.footer" class="yc-list-footer">
            <slot name="footer" />
          </div>
          <!-- loading -->
          <div
            v-if="$slots['scroll-loading'] && isBottomReached"
            class="yc-list-scroll-loading"
          >
            <slot name="scroll-loading" />
          </div>
        </div>
      </yc-scrollbar>
      <!-- 分页 -->
      <yc-pagination
        v-if="paginationProps"
        v-model:current="computedCurrent"
        v-model:page-size="computedPageSize"
        :total="paginationProps?.total || 0"
      />
    </yc-spin>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs, computed } from 'vue';
import { ListProps, ListEmits, ListSlots } from './type';
import { getGlobalConfig, useControlValue } from '@shared/utils';
import YcSpin from '@/components/Spin';
import YcEmpty from '@/components/Empty';
import YcScrollbar from '@/components/Scrollbar';
import YcPagination from '@/components/Pagination';
import VirtualList from './ListVirtual.vue';
import { SlotRender } from '@shared/components';
defineOptions({
  name: 'List',
});
defineSlots<ListSlots>();
const props = withDefaults(defineProps<ListProps>(), {
  data: () => [],
  size: undefined,
  bordered: true,
  split: true,
  loading: false,
  hoverable: false,
  paginationProps: undefined,
  gridProps: undefined,
  maxHeight: 0,
  virtualListProps: undefined,
  bottomOffset: 0,
  scrollbar: true,
});
const emits = defineEmits<ListEmits>();
const {
  data,
  paginationProps,
  virtualListProps,
  gridProps,
  maxHeight: _maxHeight,
} = toRefs(props);
// 注入全局属性
const { size, slots: providerSlots } = getGlobalConfig(props);
const maxHeight = computed(() => `${_maxHeight.value}px`);
// 是否触底
const isBottomReached = ref<boolean>(false);
// current
const current = computed(() => paginationProps.value?.current);
const computedCurrent = useControlValue<number>(
  current,
  paginationProps.value?.current || 1,
  (val) => {
    emits('page-change', val);
  }
);
// page-size
const pageSize = computed(() => paginationProps.value?.pageSize);
const computedPageSize = useControlValue<number>(
  pageSize,
  paginationProps.value?.defaultPageSize || 10,
  (val) => {
    computedCurrent.value = 1;
    emits('page-change', val);
  }
);
// 当前展示的data
const curList = computed(() => {
  if (!paginationProps.value) return data.value;
  return data.value.slice(
    (computedCurrent.value - 1) * computedPageSize.value,
    computedCurrent.value * computedPageSize.value
  );
});
// 是否是虚拟列表
const isVirtualList = computed(() => {
  if (!virtualListProps.value || paginationProps.value || gridProps.value) {
    return false;
  }
  return (
    virtualListProps.value.itemHeight &&
    (!virtualListProps.value.threshold ||
      (virtualListProps.value.threshold as number) > data.value.length)
  );
});
// 处理滚动
const handleScroll = (v: boolean) => {
  isBottomReached.value = v;
  emits('scroll');
};
// 渲染empty
const renderEmpty = () => {
  return providerSlots.empty?.({
    component: 'Select',
  });
};
</script>

<style lang="less" scoped>
@import './style/list.less';
</style>
