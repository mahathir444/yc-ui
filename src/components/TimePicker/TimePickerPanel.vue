<template>
  <div class="yc-timepicker-container">
    <div class="yc-timepicker">
      <div
        v-for="(column, i) in timeColumnCells"
        :key="i"
        class="yc-timepicker-column"
      >
        <yc-scrollbar
          :outer-style="{
            height: '100%',
          }"
          :style="{
            height: '100%',
            overflow: 'auto',
          }"
          :ref="(el) => (scrollRefs[i] = el as ScrollbarInstance)"
        >
          <ul>
            <li
              v-for="cell in column.cells"
              :key="cell.value"
              :class="[
                'yc-timepicker-cell',
                {
                  'yc-timepicker-cell-selected': cell.value == curValue[i],
                },
              ]"
              @click="
                handleClick(cell.value, i, $event.target as HTMLLIElement)
              "
            >
              <div class="yc-timepicker-cell-inner">
                {{ cell.label }}
              </div>
            </li>
          </ul>
        </yc-scrollbar>
      </div>
    </div>
    <div class="yc-timepicker-footer-btn-wrapper">
      <yc-button size="mini" @click="handleSetNow">此刻</yc-button>
      <yc-button type="primary" size="mini" @click="handleConfirm">
        确定
      </yc-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { TimeUnit } from './type';
import { isUndefined, isArray, sleep } from '@shared/utils';
import useContext from './hooks/useContext';
import YcButton from '@/components/Button';
import {
  default as YcScrollbar,
  ScrollbarInstance,
} from '@/components/Scrollbar';
import BTween from 'b-tween';
import dayjs, { UnitType } from 'dayjs';
// 接收注入
const {
  timeColumn,
  timeColumnCells,
  curValue,
  format,
  computedValue,
  computedVisible,
  type,
} = useContext().inject();
const scrollRefs = ref<ScrollbarInstance[]>([]);
// 处理点击
const handleClick = (val: number, i: number, target: HTMLLIElement) => {
  curValue.value[i] = val;
  timeColumn.value.forEach((_, index) => {
    curValue.value[index] = isUndefined(curValue.value[index])
      ? 0
      : curValue.value[index];
  });
  const scrollContainer = scrollRefs.value[i]!.getScrollRef();
  // 计算目标滚动位置（使元素滚动到容器顶部）
  const { top: containerTop } = scrollContainer.getBoundingClientRect();
  const { top: itemTop } = target.getBoundingClientRect();
  const scrollTop = scrollContainer.scrollTop;
  // 使用BTween实现平滑滚动
  new BTween({
    from: { scroll: scrollTop },
    to: { scroll: scrollTop + itemTop - containerTop },
    duration: 300,
    easing: 'quadOut',
    onUpdate: (current: { scroll: number }) => {
      scrollContainer.scrollTo({
        top: current.scroll,
        behavior: 'instant',
      });
    },
  }).start();
};
// 处理跳转
const hanldeJump = (timeMap: Record<TimeUnit, number>) => {
  // 获取所有的cells
  const cells = scrollRefs.value.map((el) => {
    return el
      .getScrollRef()
      .querySelectorAll('.yc-timepicker-cell') as NodeListOf<HTMLLIElement>;
  });
  // 以此点击
  timeColumn.value.map((v, i) => {
    const time = timeMap[v];
    handleClick(time, i, Array.from(cells[i])[time]);
  });
};
// 处理设置此刻
const handleSetNow = () => {
  const date = new Date();
  // 创建时间映射
  const timeMap = {
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds(),
  };
  hanldeJump(timeMap);
};
// 处理确定
const handleConfirm = () => {
  computedVisible.value = false;
  let date = dayjs();
  timeColumn.value.forEach((v, i) => {
    date = date.set(v as UnitType, curValue.value[i]);
  });
  computedValue.value = date.format(format.value);
};
// 检测visible的变化
watch(
  () => computedVisible.value,
  async (val) => {
    const value =
      type.value == 'time-range' && isArray(computedValue.value)
        ? computedValue.value[0]
        : computedValue.value;
    if (!val || !val) return;
    await sleep(0);
    // 格式化时间
    const date = dayjs(value as string, format.value);
    // 创建时间映射
    const timeMap = {
      hour: date.hour(),
      minute: date.minute(),
      second: date.second(),
    };
    curValue.value = timeColumn.value.map((v) => timeMap[v] as number);
    // 处理跳转逻辑
    hanldeJump(timeMap);
  }
);
</script>

<style lang="less" scoped>
@import './style/time-picker-panel.less';
</style>
