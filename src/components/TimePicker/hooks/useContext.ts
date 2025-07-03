import {
  ref,
  Ref,
  toRefs,
  provide as _provide,
  inject as _inject,
  computed,
} from 'vue';
import { Props, RequiredDeep } from '@shared/type';
import { useControlValue, isArray } from '@shared/utils';
import {
  TimePickerEmits,
  TimePickerProps,
  TimePickerType,
  TimePickerValue,
  TimeUnit,
} from '../type';

export const TIME_PICKER_CONTEXT_KEY = 'time-picker-context';

export type TimePickerContext = {
  computedValue: Ref<TimePickerValue>;
  computedVisible: Ref<boolean>;
  timeColumn: Ref<TimeUnit[]>;
  timeColumnCells: Ref<{ unit: TimeUnit; cells: TimePickerCell[] }[]>;
  curValue: Ref<number[]>;
  format: Ref<string>;
  type: Ref<TimePickerType>;
};

export type TimePickerCell = { label: string; value: number };

export default () => {
  const provide = (props: Props, emits: TimePickerEmits) => {
    const {
      modelValue,
      defaultValue,
      popupVisible,
      defaultPopupVisible,
      disabled,
      readonly,
      allowClear,
      format,
      type,
    } = toRefs(props as RequiredDeep<TimePickerProps>);
    // 计算的值
    const computedValue = useControlValue(
      modelValue,
      defaultValue.value,
      (val) => {
        emits('update:modelValue', val);
      }
    );
    // 当前的index
    const curIndex = ref<number>(0);
    // 设置value
    const curValue = ref<number[]>([]);
    // 计算的visible
    const computedVisible = useControlValue<boolean>(
      popupVisible,
      defaultPopupVisible.value,
      (val) => {
        emits('update:popupVisible', val);
        emits('popup-visible-change', val);
      }
    );
    // 允许清除
    const showClearBtn = computed(() => {
      const base = !disabled.value && !readonly.value && allowClear.value;
      if (isArray(computedValue.value)) {
        return computedValue.value[0] && computedValue.value[1] && base;
      } else {
        return computedValue.value && base;
      }
    });
    // 渲染column
    const timeColumn = computed<TimeUnit[]>(() => {
      const formatStr = format.value.toLowerCase().replace(/[^a-z]/g, '');
      const hasHour = formatStr.includes('h');
      const hasMinute = formatStr.includes('m');
      const hasSecond = formatStr.includes('s');
      const hour = 'hour';
      const minute = 'minute';
      const second = 'second';
      if (hasHour && hasMinute && hasSecond) {
        return [hour, minute, second];
      } else if (hasHour && hasMinute) {
        return [hour, minute];
      } else if (hasHour && hasSecond) {
        return [hour, second];
      } else if (hasMinute && hasSecond) {
        return [minute, second];
      } else if (hasHour) {
        return [hour];
      } else if (hasMinute) {
        return [minute];
      } else if (hasSecond) {
        return [second];
      } else {
        return [hour, minute, second];
      }
    });
    // 渲染columnsvalue
    const timeColumnCells = computed(() => {
      const hourArray = new Array(24).fill(0).map((_, i) => {
        return {
          label: `${i <= 9 ? 0 : ''}${i}`,
          value: i,
        };
      });
      const minteArray = new Array(60).fill(0).map((_, i) => {
        return {
          label: `${i <= 9 ? 0 : ''}${i}`,
          value: i,
        };
      });
      const timeMap = {
        hour: hourArray,
        minute: minteArray,
        second: minteArray,
      };
      return timeColumn.value.map((unit) => {
        return {
          unit,
          cells: timeMap[unit],
        };
      });
    });
    _provide<TimePickerContext>(TIME_PICKER_CONTEXT_KEY, {
      computedValue,
      computedVisible,
      timeColumn,
      timeColumnCells,
      curValue,
      format,
      type,
    });
    return {
      computedValue,
      computedVisible,
      timeColumn,
      showClearBtn,
      curValue,
      readonly,
      disabled,
      type,
    };
  };
  const inject = () => {
    return _inject<TimePickerContext>(TIME_PICKER_CONTEXT_KEY, {
      computedValue: ref(''),
      computedVisible: ref(false),
      timeColumn: ref(['hour', 'minute', 'second']),
      timeColumnCells: ref([]),
      curValue: ref([]),
      format: ref('HH:mm:ss'),
      type: ref('time'),
    });
  };
  return {
    provide,
    inject,
  };
};
