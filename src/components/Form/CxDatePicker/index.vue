<template>
  <div class="cx-date-picker">
    <el-date-picker
      v-if="format == 'YYYY-MM-DD HH:mm'"
      v-model="startTime"
      format="YYYY-MM-DD HH:mm"
      value-format="YYYY-MM-DD HH:mm"
      date-format="YYYY-MM-DD"
      time-format="HH:mm"
      size="small"
      type="datetime"
      placeholder="选择启用时间" />
    <el-time-picker
      v-else
      v-model="endTime"
      format="HH:mm"
      value-format="HH:mm"
      class="hour-minute"
      :disabled-minutes="handleDisabledEndMinute"
      :disabled-hours="handleDisabledEndHour" />
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs, computed } from 'vue';
import { formatTime } from '@/utils/fn';
import { isString } from '@/utils/is';
const props = withDefaults(
  defineProps<{
    startTime?: string;
    endTime?: string;
    format?: 'HH:mm' | 'YYYY-MM-DD HH:mm';
  }>(),

  { startTime: '', endTime: '', format: 'YYYY-MM-DD HH:mm' }
);
const { format } = toRefs(props);
// 开始时间与结束时间
const startTime = ref<string>('');
const endTime = ref<string>('');
initValue(props.startTime, props.endTime);
// 处理开始时间禁用
const handleStartDisabled = (date: Date) => {
  if (!endTime.value || !isString(endTime.value)) return false;
  return endTime.value.localeCompare(formatTime(date, format.value)) < 0;
};
// 处理结束时间警用
const handleEndDisabled = (date: Date) => {
  if (!startTime.value || !isString(startTime.value)) return false;
  return formatTime(date, format.value).localeCompare(startTime.value) < 0;
};
// 初始化值
function initValue(start: string, end: string) {
  if (format.value == 'YYYY-MM-DD HH:mm') {
    startTime.value = start ? formatTime(start, format.value) : '';
    endTime.value = end ? formatTime(end, format.value) : '';
  } else {
    startTime.value = start;
    endTime.value = end;
  }
}
const handleDisabledStartMinute = () => {
  const endMinute = +endTime.value.split(':')[1];
  const disabeld: number[] = [];
  for (let i = endMinute; i <= 59; i++) {
    disabeld.push(i);
  }
  return disabeld;
};
const handleDisabledStartHour = () => {
  const endHour = +endTime.value.split(':')[0];
  const disabeld: number[] = [];
  for (let i = endHour; i <= 23; i++) {
    disabeld.push(i);
  }
  return disabeld;
};
const handleDisabledEndMinute = () => {
  const startMinute = +startTime.value.split(':')[1];
  const disabeld: number[] = [];
  for (let i = 1; i <= startMinute; i++) {
    disabeld.push(i);
  }
  return disabeld;
};
const handleDisabledEndHour = () => {
  const startHour = +startTime.value.split(':')[0];
  const disabeld: number[] = [];
  for (let i = 0; i <= startHour; i++) {
    disabeld.push(i);
  }
  return disabeld;
};
defineExpose({
  getValue() {
    return {
      startTime: startTime.value,
      endTime: endTime.value,
    };
  },
});
</script>

<style lang="less">
.cx-date-range {
  display: flex;
  align-items: center;
  gap: 8px;
  .el-input__inner,
  .divider {
    color: #4d4d4d !important;
    font-size: 14px !important;
    font-family: 'PingFang SC' !important;
  }
  .el-input {
    width: 180px;
    height: 32px;
    .el-input__wrapper {
      position: relative;
      border-radius: 4px;
      padding: 1px 11px !important;
      .el-input__prefix {
        position: absolute;
        right: 11px;
        .el-input__prefix-inner {
          &::after {
            content: '\e966';
            font-family: ifont;
            font-size: 20px;
            color: #006ce2;
            font-style: normal;
          }
          .el-icon {
            display: none;
            margin: 0 !important;
          }
        }
      }
      .el-input__prefix,
      .el-input__prefix-inner,
      .el-icon,
      .el-icon svg {
        width: 14px;
        height: 14px;
      }
    }
  }
  .hour-minute {
    .el-input__wrapper {
      padding: 1px 11px 1px 33px !important;
      .el-input__prefix {
        position: absolute;
        right: 155px;
        .el-input__prefix-inner {
          &::after {
            display: none !important;
          }
          .el-icon {
            display: flex !important;
          }
        }
      }
    }
  }
}
</style>
