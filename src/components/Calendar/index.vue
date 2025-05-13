<template>
  <div class="yc-calendar yc-calendar-mode-month">
    <div class="yc-calendar-header">
      <div class="yc-calendar-header-left">
        <yc-icon-button
          class="yc-calendar-header-icon"
          role="button"
          tabindex="0"
          :size="28"
          :hover-size="28"
          @click="handleDateChange('pre')"
        >
          <icon-arrow-right :rotate="180" />
        </yc-icon-button>
        <div class="yc-calendar-header-value">
          {{ computedValue.year }} 年 {{ computedValue.month }} 月
        </div>
        <yc-icon-button
          role="button"
          tabindex="0"
          class="yc-calendar-header-icon"
          :size="28"
          :hover-size="28"
          @click="handleDateChange('pre')"
        >
          <icon-arrow-right />
        </yc-icon-button>
        <yc-button @click="handleDateChange('today')" size="small">
          今天
        </yc-button>
      </div>
      <div class="yc-calendar-header-right">
        <yc-radio-group
          v-model="computedMode"
          :options="modes"
          type="button"
          size="small"
        />
      </div>
    </div>
    <div class="yc-calendar-body">
      <month-calendar
        :computed-value="computedValue"
        @cell-click="handleClick"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, toRefs } from 'vue';
import dayjs from 'dayjs';
import {
  CalendarProps,
  CalendarEmits,
  CalendarSlots,
  CalendarMode,
} from './type';
import { useControlValue } from '@shared/hooks';
import YcButton from '@/components/Button';
import { RadioGroup as YcRadioGroup } from '@/components/Radio';
import { IconArrowRight } from '@shared/icons';
import { YcIconButton } from '@shared/components';
import { CalendarCellData } from '@shared/utils';
import MonthCalendar from './MonthCalendar.vue';
defineOptions({
  name: 'Calendar',
});
defineSlots<CalendarSlots>();
const props = withDefaults(defineProps<CalendarProps>(), {
  modelValue: undefined,
  defaultValue: () => new Date(),
  mode: undefined,
  defaultMode: 'month',
  modes: () => ['month', 'year'],
});
const emits = defineEmits<CalendarEmits>();
const {
  modelValue,
  defaultValue,
  mode,
  defaultMode,
  modes: _modes,
} = toRefs(props);
// 受控的值
const computedValue = useControlValue<Date>(
  modelValue,
  defaultValue.value,
  (val) => {
    emits('update:modelValue', val);
    emits('change', val);
  },
  (val) => {
    const date = val ? dayjs(val) : dayjs();
    return {
      year: date.year(),
      month: date.month() + 1,
      day: date.date(),
    };
  }
);
// mode
const computedMode = useControlValue<CalendarMode>(
  mode,
  defaultMode.value,
  (val) => {
    emits('update:mode', val);
  }
);
// 数组
const modes = computed(() => {
  const map = {
    month: '月',
    year: '年',
  };
  return _modes.value.map((item) => {
    return {
      label: map[item],
      value: item,
    };
  });
});
// 处理点击
const handleClick = (col: CalendarCellData) => {
  computedValue.value = new Date(col.fullDate);
};
// 处理日期改变
const handleDateChange = (type: string) => {
  if (type == 'today') {
    computedValue.value = new Date();
    return;
  }
  const { year: _year, month: _month, day } = computedValue.value;
  if (type == 'pre') {
    const year = computedMode.value == 'year' ? _year + 1 : _year;
    const month = computedMode.value == 'year' ? _month + 1 : _month;
    computedValue.value = new Date(year, month, day);
  } else {
    const year = computedMode.value == 'year' ? _year - 1 : _year;
    const month = computedMode.value == 'year' ? _month - 1 : _month;
    computedValue.value = new Date(year, month, day);
  }
};
</script>

<style lang="less" scoped>
.yc-calendar {
  border: 1px solid rgb(229, 230, 235);
  display: flex;
  flex-direction: column;
  .yc-calendar-header {
    padding: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .yc-calendar-header-left {
      display: flex;
      align-items: center;
      gap: 12px;
      .yc-calendar-header-icon {
        font-size: 12px;
      }
      .yc-calendar-header-value {
        color: rgb(29, 33, 41);
        font-weight: 500;
        font-size: 20px;
      }
    }
  }
  .yc-calendar-body {
  }
}
</style>
