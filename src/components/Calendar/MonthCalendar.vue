<template>
  <div class="yc-calendar-month">
    <div class="yc-calendar-week-list">
      <div
        class="yc-calendar-week-list-item"
        v-for="item in weekList"
        :key="item"
      >
        {{ item }}
      </div>
    </div>
    <div class="yc-calendar-month-cell-body">
      <div v-for="(row, i) in calendar" :key="i" class="yc-calendar-month-row">
        <div
          v-for="(col, i1) in row"
          :key="i1"
          :class="{
            'yc-calendar-cell': true,
            'yc-calendar-cell-today': isToday(col),
            'yc-calendar-cell-selected': isSelected(col),
            'yc-calendar-cell-in-view': col.isCurrentMonth,
          }"
          @click="$emit('cell-click', col)"
        >
          <div class="yc-calendar-date">
            <div class="yc-calendar-date-value">
              <div class="yc-calendar-date-circle">
                {{ col.day }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs, watch } from 'vue';
import dayjs from 'dayjs';
import { generateMonthCalendar, CalendarCellData } from '@shared/utils';
const props = defineProps<{
  computedValue: Record<string, number>;
}>();
defineEmits<{
  (e: 'cell-click', col: CalendarCellData): void;
}>();
// 结构属性
const { computedValue } = toRefs(props);
// 周日列表
const weekList = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
// 日历数组
const calendar = ref<CalendarCellData[][]>([]);
// 处理日期
watch(
  () => computedValue.value.month,
  () => {
    const { year, month } = computedValue.value;
    calendar.value = generateMonthCalendar(year, month);
  },
  {
    immediate: true,
  }
);
// 是否今天
const isToday = (col: CalendarCellData) => {
  const { day, year, month } = col;
  const cur = dayjs();
  const _day = cur.date();
  const _month = cur.month();
  const _year = cur.year();
  return day == _day && month == _month && year == _year;
};
// 是否选中
const isSelected = (col: CalendarCellData) => {
  const { day, year, month } = computedValue.value;
  const { day: _day, year: _year, month: _month } = col;
  return day == _day && month == _month + 1 && year == _year;
};
</script>

<style lang="less" scoped>
.yc-calendar-month {
  display: flex;
  flex-direction: column;
  .yc-calendar-week-list {
    height: 55px;
    width: 100%;
    padding: 0;
    border-bottom: 1px solid rgb(229, 230, 235);
    display: flex;
    .yc-calendar-week-list-item {
      flex: 1;
      padding: 20px 16px;
      color: #7d7d7f;
      text-align: left;
    }
  }
  .yc-calendar-month-cell-body {
    display: flex;
    flex-direction: column;
    .yc-calendar-month-row {
      display: flex;
      height: 100px;
      &:not(:last-child) {
        border-bottom: 1px solid rgb(229, 230, 235);
      }
      .yc-calendar-cell {
        width: calc(100% / 7);
        &:not(:last-child) {
          border-right: 1px solid rgb(229, 230, 235);
        }
        .yc-calendar-date {
          width: 100%;
          height: 100%;
          padding: 10px;
          cursor: pointer;
          .yc-calendar-date-value {
            color: rgb(201, 205, 212);
            font-weight: 500;
            font-size: 16px;
            .yc-calendar-date-circle {
              width: 28px;
              height: 28px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
            }
          }
        }
      }
      .yc-calendar-cell-in-view {
        .yc-calendar-date {
          .yc-calendar-date-value {
            color: rgb(29, 33, 41);
          }
        }
      }
      // today
      .yc-calendar-cell-today {
        .yc-calendar-date {
          .yc-calendar-date-value {
            .yc-calendar-date-circle {
              border: 1px solid rgb(22, 93, 255);
            }
          }
        }
      }
      // selected
      .yc-calendar-cell-selected {
        .yc-calendar-date {
          .yc-calendar-date-value {
            .yc-calendar-date-circle {
              border: 1px solid rgb(22, 93, 255);
              color: #fff;
              background-color: rgb(22, 93, 255);
            }
          }
        }
      }
    }
  }
}
</style>
