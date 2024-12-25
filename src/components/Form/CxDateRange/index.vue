<template>
  <div class="cx-date-range">
    <!-- 开始时间 -->
    <el-date-picker
      v-if="format == 'YYYY-MM-DD HH:mm'"
      v-model="startDate"
      :disabled-date="handleStartDisabled"
      format="YYYY-MM-DD HH:mm"
      value-format="YYYY-MM-DD HH:mm"
      date-format="YYYY-MM-DD"
      time-format="HH:mm"
      size="small"
      type="datetime"
      placeholder="请选择"
      @change="handleStartChange" />
    <el-time-picker
      v-else
      v-model="startDate"
      format="HH:mm"
      value-format="HH:mm"
      class="hour-minute"
      :disabled-minutes="handleDisabledStartMinute"
      :disabled-hours="handleDisabledStartHour"
      @change="handleStartChange" />
    <slot name="divider">
      <span class="divider">至</span>
    </slot>
    <!-- 结束时间 -->
    <el-date-picker
      v-if="format == 'YYYY-MM-DD HH:mm'"
      v-model="endDate"
      :disabled-date="handleEndDisabled"
      format="YYYY-MM-DD HH:mm"
      value-format="YYYY-MM-DD HH:mm"
      date-format="YYYY-MM-DD"
      time-format="HH:mm"
      size="small"
      type="datetime"
      placeholder="请选择"
      @change="handleEndChange" />
    <el-time-picker
      v-else
      v-model="endDate"
      format="HH:mm"
      value-format="HH:mm"
      class="hour-minute"
      :disabled-minutes="handleDisabledEndMinute"
      :disabled-hours="handleDisabledEndHour"
      @change="handleEndChange" />
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs, watch } from 'vue';
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
const emits = defineEmits<{
  (e: 'update:startTime', value: string): void;
  (e: 'update:endTime', value: string): void;
}>();
const { startTime, endTime, format } = toRefs(props);
// 开始时间
const startDate = ref<string>(formatValue(props.startTime));
// 结束时间
const endDate = ref<string>(formatValue(props.endTime));
// 初始化值
function formatValue(value: string) {
  return value ? formatTime(value, format.value) : '';
}
// 处理开始时间禁用
const handleStartDisabled = (date: Date) => {
  if (!endDate.value || !isString(endDate.value)) return false;
  return endDate.value.localeCompare(formatTime(date, format.value)) < 0;
};
// 处理结束时间警用
const handleEndDisabled = (date: Date) => {
  if (!startDate.value || !isString(startDate.value)) return false;
  return formatTime(date, format.value).localeCompare(startDate.value) < 0;
};
// 处理开始分钟禁用
const handleDisabledStartMinute = () => {
  const endMinute = +endDate.value.split(':')[1];
  const disabeld: number[] = [];
  for (let i = endMinute; i <= 59; i++) {
    disabeld.push(i);
  }
  return disabeld;
};
// 处理开始小时禁用
const handleDisabledStartHour = () => {
  const endHour = +endDate.value.split(':')[0];
  const disabeld: number[] = [];
  for (let i = endHour; i <= 23; i++) {
    disabeld.push(i);
  }
  return disabeld;
};
// 处理结束分钟禁用
const handleDisabledEndMinute = () => {
  const startMinute = +startDate.value.split(':')[1];
  const disabeld: number[] = [];
  for (let i = 1; i <= startMinute; i++) {
    disabeld.push(i);
  }
  return disabeld;
};
// 处理结束小时禁用
const handleDisabledEndHour = () => {
  const startHour = +startDate.value.split(':')[0];
  const disabeld: number[] = [];
  for (let i = 0; i <= startHour; i++) {
    disabeld.push(i);
  }
  return disabeld;
};
// 处理开始时间发生改变
const handleStartChange = (val: string) => {
  emits('update:startTime', val);
};
// 处理结束时间发生改变
const handleEndChange = (val: string) => {
  emits('update:endTime', val);
};

// 处理值的改变同步
watch(
  () => startTime.value,
  (val) => {
    const result = formatValue(val);
    if (result == startDate.value) return;
    startDate.value = result;
  }
);
watch(
  () => endTime.value,
  (val) => {
    const result = formatValue(val);
    if (result == endDate.value) return;
    endDate.value = result;
  }
);
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
