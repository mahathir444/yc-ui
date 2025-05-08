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
          <!-- 定义td模板 -->
          <define-td v-slot="{ type, data, index }">
            <td
              :class="{
                'yc-descriptions-item-label': type == 'label',
                'yc-descriptions-item-value': type == 'value',
              }"
              :style="{
                ...(type == 'label' ? labelStyle : valueStyle),
                textAlign: isObject(align) ? (align.label ?? 'left') : align,
              }"
            >
              <slot
                v-if="type == 'label'"
                name="label"
                :label="data.label"
                :index="index"
                :data="data"
              >
                <component :is="getSlotFunction(data.label)" />
              </slot>
              <slot
                v-else
                name="value"
                :value="data.value"
                :index="index"
                :data="data"
              >
                <component :is="getSlotFunction(data.value)" />
              </slot>
            </td>
          </define-td>
          <!-- 定义复用item模板 -->
          <define-item v-slot="{ data, index }">
            <td class="yc-descriptions-item">
              <div class="yc-descriptions-item-label">
                <slot
                  name="label"
                  :label="data.label"
                  :index="index"
                  :data="data"
                >
                  <component :is="getSlotFunction(data.label)" />
                </slot>
              </div>
              <div class="yc-descriptions-item-value">
                <slot
                  name="value"
                  :value="data.value"
                  :index="index"
                  :data="data"
                >
                  <component :is="getSlotFunction(data.value)" />
                </slot>
              </div>
            </td>
          </define-item>
          <!-- 渲染horizontal -->
          <template v-if="layout == 'horizontal'">
            <tr
              v-for="(v, i) in renderArr"
              :key="i"
              class="yc-descriptions-row"
            >
              <template v-for="(item, i1) in v" :key="i1">
                <!-- 渲染label -->
                <reuse-td type="label" :data="item" :index="v.length + i1" />
                <!-- 渲染value -->
                <reuse-td
                  type="value"
                  :data="item"
                  :index="v.length + i1"
                  :colspan="calcSpan(i1, v)"
                />
              </template>
            </tr>
          </template>
          <!-- 渲染vertical -->
          <template v-if="layout == 'vertical'">
            <template v-for="(v, i) in renderArr" :key="i">
              <tr class="yc-descriptions-row">
                <reuse-td
                  v-for="(item, i1) in v"
                  :key="i1"
                  type="label"
                  :data="item"
                  :index="v.length + i1"
                  :colspan="calcSpan(i1, v)"
                />
              </tr>
              <tr class="yc-descriptions-row">
                <reuse-td
                  v-for="(item, i1) in v"
                  :key="i1"
                  type="value"
                  :data="item"
                  :index="v.length + i1"
                  :colspan="calcSpan(i1, v)"
                />
              </tr>
            </template>
          </template>
          <!-- 渲染inline -->
          <template v-else>
            <tr
              v-for="(v, i) in renderArr"
              :key="i"
              class="yc-descriptions-row"
            >
              <reuse-item
                v-for="(item, i1) in v"
                :key="i1"
                :data="item"
                :index="v.length + i1"
                :colspan="calcSpan(i1, v)"
              />
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { DescriptionsProps, DescriptionsSlots, DescData } from './type';
import { createReusableTemplate } from '@vueuse/core';
import {
  DESCRIPTIONS_SIZE_CLASS,
  DESCRIPTIONS_DIRECTION_MAP,
} from '@shared/constants';
import { getSlotFunction, isObject } from '@shared/utils';
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
const { define: DefineTd, reuse: ReuseTd } = createReusableTemplate();
const { define: DefineItem, reuse: ReuseItem } = createReusableTemplate();
// 注入
const { provide } = useProvide();
const { column, size, data, layout } = provide(props);
// 一行的span数量
const totalSpan = computed(() => {
  return layout.value == 'horizontal' ? 2 * column.value : column.value;
});
// 行数
const renderArr = computed(() => {
  let count = 0;
  const rowArray: number[][] = [];
  for (let i = 0; i < data.value.length; i++) {
    const newCount = count + getSpan(data.value[i]);
    if (newCount >= totalSpan.value) {
      const pre = rowArray.length ? rowArray[rowArray.length - 1][1] : 0;
      rowArray.push([pre, i + 1]);
      count = 0;
    } else {
      count = newCount;
    }
  }
  if (rowArray.length && rowArray[rowArray.length - 1][1] != column.value) {
    rowArray.push([rowArray[rowArray.length - 1][1]]);
  }
  return rowArray
    .map((v) => data.value.slice(...v))
    .filter((item) => item.length);
});
// 获取node的span
function getSpan(data: DescData) {
  const _span = data.span || 1;
  const span = layout.value == 'horizontal' ? _span * 2 - 1 : _span;
  return span >= totalSpan.value - 1 ? totalSpan.value - 1 : span;
}
// 计算span
const calcSpan = (i: number, array: DescData[]) => {
  return i == array.length - 1
    ? array.reduce((pre, cur, index) => {
        if (index < array.length - 1) {
          return pre + getSpan(cur);
        } else {
          const span = totalSpan.value - pre;
          return span <= 1 ? 1 : span;
        }
      }, 0)
    : getSpan(array[i]);
};
</script>

<style lang="less" scoped>
@import './style/descriptions.less';
@import './style/descriptions-item.less';
</style>
