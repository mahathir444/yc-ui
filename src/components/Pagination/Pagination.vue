<template>
  <div
    v-if="!hideOnSinglePage || (hideOnSinglePage && pages <= 1)"
    :class="['yc-pagination', `yc-pagination-size-${size}`]"
  >
    <!-- total -->
    <span v-if="showTotal" class="yc-pagination-total">共 {{ total }} 条</span>
    <!-- page-list -->
    <ul :class="[simple ? 'yc-pagination-simple' : 'yc-pagination-list']">
      <!-- pre -->
      <pagination-item type="pre" class="yc-pagination-item-previous" />
      <!-- item -->
      <template v-if="!simple">
        <pagination-item
          v-for="i in pagesArray"
          :type="isNumber(i) ? 'item' : i"
          :key="<string>i"
          :page="isNumber(i) ? i : -1"
        >
          <template v-if="isNumber(i)">
            {{ i }}
          </template>
        </pagination-item>
      </template>
      <span v-else class="yc-pagination-jumper yc-pagination-jumper-simple">
        <yc-input-number
          v-model="computedCurrent"
          hide-button
          :size="size"
          :disabled="disabled"
        />
        <span class="yc-pagination-jumper-separator">/</span>
        <span class="yc-pagination-jumper-total-page">{{ pages }}</span>
      </span>
      <!-- more -->
      <pagination-item
        v-if="showMore && !simple"
        type="more-right"
        class="'yc-pagination-item-ellipsis'"
      />
      <!-- next -->
      <pagination-item type="next" class="yc-pagination-item-next" />
    </ul>
    <!-- pageSize -->
    <span v-if="showPageSize" class="yc-pagination-options">
      <yc-select
        v-model="computedPageSize"
        :options="sizes"
        :size="size"
        v-bind="pageSizeProps"
        :disabled="disabled"
      />
    </span>
    <!-- jumper -->
    <span v-if="showJumper" class="yc-pagination-jumper">
      <span class="yc-pagination-jumper-text-goto"> 前往 </span>
      <yc-input-number
        v-model="computedCurrent"
        hide-button
        :size="size"
        :disabled="disabled"
      />
    </span>
  </div>
</template>

<script lang="ts" setup>
import { PaginationProps, PaginationEmits, PaginationSlots } from './type';
import { isNumber } from '@shared/utils';
import useProvide from './hooks/useProvide';
import PaginationItem from './PaginationItem.vue';
import YcSelect from '@/components/Select';
import YcInputNumber from '@/components/InputNumber';
defineOptions({
  name: 'Pagination',
});
defineSlots<PaginationSlots>();
const props = withDefaults(defineProps<PaginationProps>(), {
  current: undefined,
  defaultCurrent: 1,
  pageSize: undefined,
  defaultPageSize: 10,
  disabled: false,
  hideOnSinglePage: false,
  simple: false,
  showTotal: false,
  showJumper: false,
  showMore: false,
  showPageSize: false,
  pageSizeOptions: () => [10, 20, 30, 40, 50],
  pageSizeProps: () => {
    return {};
  },
  size: undefined,
  pageItemStyle: () => {
    return {};
  },
  activePageItemStyle: () => {
    return {};
  },
  baseSize: 6,
  bufferSize: 2,
  autoAdjust: true,
});
const emits = defineEmits<PaginationEmits>();
const { provide } = useProvide();
const { computedCurrent, pages, pagesArray, computedPageSize, size, sizes } =
  provide(props, emits);
</script>

<style lang="less" scoped>
@import './style/pagination.less';
</style>
