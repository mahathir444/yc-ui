<template>
  <!-- yc-descriptions-layout-horizontal -->
  <div
    :class="[
      'yc-descriptions',
      bordered ? 'yc-descriptions-bordered' : '',
      tableLayout == 'fixed' ? 'yc-descriptions-table-layout-fixed ' : '',
      DESCRIPTIONS_SIZE_CLASS[size],
      DESCRIPTIONS_DIRECTION_MAP[layout],
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
            <template v-for="(item, i1) in v" :key="i1">
              <!-- 自定义渲染node -->
              <component
                v-if="isNodeRender == 'node'"
                :span="calcSpan(i1, v)"
                :is="item"
              />
              <!-- data渲染 -->
              <yc-descriptions-item v-else :span="getSpan(item)">
                <template #label>
                  <slot
                    name="label"
                    :label="item.label"
                    :index="i1"
                    :data="item"
                  >
                    <component :is="getSlotFunction(item.label)" />
                  </slot>
                </template>
                <slot name="value" :value="item.value" :index="i1" :data="item">
                  <component :is="getSlotFunction(item.value)" />
                </slot>
              </yc-descriptions-item>
            </template>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { DescriptionsProps, DescriptionsSlots } from './type';
import {
  DESCRIPTIONS_SIZE_CLASS,
  DESCRIPTIONS_DIRECTION_MAP,
} from '@shared/constants';
import { getSlotFunction } from '@shared/utils';
import { ObjectData } from '@shared/type';
import useProvide from './hooks/useProvide';
import YcDescriptionsItem from './DescriptionsItem.vue';
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
const { column, size, descriptionItems, data } = provide(props);
// 是否是node渲染
const isNodeRender = computed(() =>
  descriptionItems.value.length ? 'node' : 'data'
);
// 行数
const rows = computed(() => {
  let count = 0;
  const rowArray: number[][] = [];
  const array =
    isNodeRender.value == 'node' ? descriptionItems.value : data.value;
  for (let i = 0; i < array.length; i++) {
    const newCount = count + getSpan(array[i]);
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
  if (rowArray.length && rowArray[rowArray.length - 1][1] != column.value) {
    rowArray.push([rowArray[rowArray.length - 1][1]]);
  }
  return rowArray.map((v) => array.slice(...v));
});
// 获取node的span
function getSpan(node: ObjectData) {
  return (isNodeRender.value == 'node' ? node?.props?.span : node?.span) || 1;
}
// 计算span
const calcSpan = (i: number, nodeArr: ObjectData[]) => {
  return i == nodeArr.length - 1
    ? nodeArr.reduce((pre, cur, index) => {
        if (index < nodeArr.length - 1) {
          return pre + getSpan(cur);
        } else {
          const span = column.value - pre;
          return span <= 1 ? 1 : span;
        }
      }, 0)
    : getSpan(nodeArr[i]);
};
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
// layout
//table-layout
.yc-descriptions-table-layout-fixed {
  .yc-descriptions-body {
    .yc-descriptions-table {
      table-layout: fixed;
      &:deep(.yc-descriptions-item-label) {
        width: auto;
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
