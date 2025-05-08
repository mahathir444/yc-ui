<template>
  <!-- yc-descriptions-layout-horizontal -->
  <div
    :class="[
      'yc-descriptions',
      bordered ? 'yc-descriptions-bordered' : '',
      DESCRIPTIONS_SIZE_CLASS[size],
    ]"
  >
    <div v-if="$slots.title || title" class="yc-descriptions-title">
      <slot name="title">
        {{ title }}
      </slot>
    </div>
    <div class="yc-descriptions-body">
      <table class="yc-descriptions-table">
        <tbody>
          <tr v-for="(v, i) in rows" :key="i" class="yc-descriptions-row">
            <component
              v-for="item in descriptionItems.slice(...v)"
              :is="item"
            />
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { DescriptionsProps, DescriptionsSlots } from './type';
import { DESCRIPTIONS_SIZE_CLASS } from '@shared/constants';
import useProvide from './hooks/useProvide';
defineOptions({
  name: 'Descriptions',
});
defineSlots<DescriptionsSlots>();
const props = withDefaults(defineProps<DescriptionsProps>(), {
  data: () => [],
  column: 3,
  title: '',
  layout: 'horizontal',
  align: 'left',
  size: undefined,
  bordered: false,
  labelStyle: () => {
    return {};
  },
  valueStyle: () => {
    return {};
  },
  tableLayout: 'auto',
});
// 注入
const { provide } = useProvide();
const { column, size, descriptionItems } = provide(props);
// 行数
const rows = computed(() => {
  const rowArray: number[][] = [];
  let count = 0;
  for (let i = 0; i < descriptionItems.value.length; i++) {
    const span = descriptionItems.value[i]?.props?.span || 1;
    const newCount = count + span;
    if (newCount >= column.value) {
      count = 0;
      if (!rowArray.length) {
        rowArray.push([0, i + 1]);
      } else {
        rowArray.push([rowArray[rowArray.length - 1][1], i + 1]);
      }
    } else {
      count = newCount;
    }
  }
  if (rowArray[rowArray.length - 1][1] != column.value) {
    rowArray.push([rowArray[rowArray.length - 1][1]]);
  }
  return rowArray;
});
</script>

<style lang="less" scoped>
.yc-descriptions {
  display: flex;
  flex-direction: column;
  .yc-descriptions-title {
    color: rgb(29, 33, 41);
    font-weight: 500;
    font-size: 16px;
    line-height: 1.5715;
  }
  .yc-descriptions-body {
    .yc-descriptions-table {
      width: 100%;
      border-collapse: collapse;
      tbody {
        display: table-row-group;
        vertical-align: middle;
        unicode-bidi: isolate;
        border-color: inherit;
        tr {
          display: table-row;
          vertical-align: inherit;
          unicode-bidi: isolate;
          border-color: inherit;
        }
      }
    }
  }
}
// bordered
.yc-descriptions-bordered {
  .yc-descriptions-body {
    overflow: hidden;
    border: 1px solid rgb(229, 230, 235);
    border-radius: 4px;
    &:deep(.yc-descriptions-row) {
      &:not(:last-child) {
        border-bottom: 1px solid rgb(229, 230, 235);
      }
      .yc-descriptions-item-label-block {
        background-color: rgb(247, 248, 250);
        border-right: 1px solid rgb(229, 230, 235);
      }
      .yc-descriptions-item-value-block:not(:last-child) {
        border-right: 1px solid rgb(229, 230, 235);
      }
    }
  }
}
// size
.yc-descriptions-size-mini {
  gap: 6px;
  &:deep(.yc-descriptions-item-label-block),
  &:deep(.yc-descriptions-item-value-block) {
    padding: 0 20px 2px 0;
    font-size: 12px;
  }
  &.yc-descriptions-bordered {
    &:deep(.yc-descriptions-item-label-block),
    &:deep(.yc-descriptions-item-value-block) {
      padding: 3px 20px;
    }
  }
}
.yc-descriptions-size-small {
  gap: 8px;
  &:deep(.yc-descriptions-item-label-block),
  &:deep(.yc-descriptions-item-value-block) {
    padding: 0 20px 4px 0;
    font-size: 14px;
  }
  &.yc-descriptions-bordered {
    &:deep(.yc-descriptions-item-label-block),
    &:deep(.yc-descriptions-item-value-block) {
      padding: 3px 20px;
    }
  }
}
.yc-descriptions-size-medium {
  gap: 10px;
  &:deep(.yc-descriptions-item-label-block),
  &:deep(.yc-descriptions-item-value-block) {
    padding: 0 20px 8px 0;
    font-size: 14px;
  }
  &.yc-descriptions-bordered {
    &:deep(.yc-descriptions-item-label-block),
    &:deep(.yc-descriptions-item-value-block) {
      padding: 5px 20px;
    }
  }
}
.yc-descriptions-size-large {
  gap: 12px;
  &:deep(.yc-descriptions-item-label-block),
  &:deep(.yc-descriptions-item-value-block) {
    padding: 0 20px 16px 0;
    font-size: 14px;
  }
  &.yc-descriptions-bordered {
    &:deep(.yc-descriptions-item-label-block),
    &:deep(.yc-descriptions-item-value-block) {
      padding: 9px 20px;
    }
  }
}
</style>
