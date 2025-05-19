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
            <template v-for="(item, i) in curData" :key="i">
              <slot name="item" :index="i" :item="item" />
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
  gridProps: () => {
    return {};
  },
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
  return data.value.slice(
    (computedCurrent.value - 1) * computedPageSize.value,
    computedCurrent.value * computedPageSize.value
  );
});
</script>

<style lang="less" scoped>
.yc-list-wrapper {
  .yc-list-spin {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 24px;
    .yc-scrollbar {
      &:deep(.yc-scrollbar-container) {
        .yc-scrollbar-content {
          width: 100%;
          border-radius: 4px;
        }
      }
    }
    .yc-list-content-wrapper {
      display: flex;
      flex-direction: column;
      color: rgb(29, 33, 41);
      font-size: 14px;
      line-height: 1.5715;
      .yc-list-header {
        font-weight: 500;
        font-size: 16px;
        line-height: 1.5;
      }
      .yc-list-content {
        display: flex;
        flex-direction: column;
      }
    }
  }
}
// bordered
.yc-list-bordered {
  .yc-scrollbar {
    &:deep(.yc-scrollbar-container) {
      border: 1px solid rgb(229, 230, 235);
    }
  }
}
.yc-list-split {
  .yc-list-header {
    border-bottom: 1px solid rgb(229, 230, 235);
  }
  .yc-list-footer {
    border-top: 1px solid rgb(229, 230, 235);
  }
  &:deep(.yc-list-item) {
    &:not(:last-child) {
      border-bottom: 1px solid rgb(229, 230, 235);
    }
  }
}
// hoverable
.yc-list-hoverable {
  &:deep(.yc-list-item) {
    &:hover {
      background-color: rgb(247, 248, 250);
    }
  }
}
//size
@size: {
  @small: {
    header-padding: 8px 20px;
    item-padding: 9px 20px;
  };
  @medium: {
    header-padding: 12px 20px;
    item-padding: 13px 20px;
  };
  @large: {
    header-padding: 16px 20px;
    item-padding: 17px 20px;
  };
};
each(@size, .(@value,@name){
  @key:replace(~"@{name}", "@", "");
  .yc-list-size-@{key} {
   .yc-list-header,.yc-list-footer{
    padding: @value[header-padding];
   }
   &:deep(.yc-list-item){
    padding: @value[item-padding];
   }
  }
});
</style>
