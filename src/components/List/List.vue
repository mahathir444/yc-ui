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
      <yc-scrollbar
        :style="{
          maxHeight: maxHeight ? maxHeight + 'px' : '',
        }"
        :offset-bottom="bottomOffset"
        @scroll="$emit('scroll')"
        @reach-bottom="$emit('reach-bottom')"
      >
        <div class="yc-list-content-wrapper">
          <div v-if="$slots.header" class="yc-list-header">
            <slot name="header" />
          </div>
          <div role="list" class="yc-list-content">
            <!-- slot -->
            <slot />
            <!-- render-list -->
            <yc-grid v-if="gridProps" v-bind="gridProps">
              <yc-grid-item v-for="(item, i) in curData" :key="i">
                <slot name="item" :index="i" :item="item" />
              </yc-grid-item>
            </yc-grid>
            <template v-else>
              <template v-for="(item, i) in curData" :key="i">
                <slot name="item" :index="i" :item="item" />
              </template>
            </template>
            <!-- empty -->
            <slot name="empty">
              <yc-empty v-if="!$slots.default && !data.length" />
            </slot>
          </div>
          <div v-if="$slots.footer" class="yc-list-footer">
            <slot name="footer" />
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
import { toRefs, computed } from 'vue';
import { ListProps, ListEmits, ListSlots } from './type';
import { getGlobalConfig, useControlValue } from '@shared/utils';
import { default as YcGrid, GridItem as YcGridItem } from '@/components/Grid';
import YcSpin from '@/components/Spin';
import YcEmpty from '@/components/Empty';
import YcScrollbar from '@/components/Scrollbar';
import YcPagination from '@/components/Pagination';
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
  scrollbar: true,
});
const emits = defineEmits<ListEmits>();
const { paginationProps, data } = toRefs(props);
// 注入全局属性
const { size } = getGlobalConfig(props);
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
const curData = computed(() => {
  if (!paginationProps.value) return data.value;
  return data.value.slice(
    (computedCurrent.value - 1) * computedPageSize.value,
    computedCurrent.value * computedPageSize.value
  );
});
</script>

<style lang="less" scoped>
@import './style/list.less';
</style>
