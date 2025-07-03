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
  DisabledHours,
  DisabledMinutes,
  DisabledSeconds,
} from '../type';

export const TIME_PICKER_CONTEXT_KEY = 'time-picker-context';

export type TimePickerContext = {
  type: Ref<TimePickerType>;
  format: Ref<string>;
  computedValue: Ref<TimePickerValue>;
  computedVisible: Ref<boolean>;
  curIndex: Ref<number>;
  curValue: Ref<number[]>;
  timeColumn: Ref<TimeUnit[]>;
  timeColumnCells: Ref<{ unit: TimeUnit; cells: TimePickerCell[] }[]>;
  inputRefs: Ref<HTMLInputElement[]>;
  disableConfirm: Ref<boolean>;
  disabledHours: DisabledHours;
  disabledMinutes: DisabledMinutes;
  disabledSeconds: DisabledSeconds;
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
      disableConfirm,
    } = toRefs(props as RequiredDeep<TimePickerProps>);
    const { disabledHours, disabledMinutes, disabledSeconds } = props;
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
      const units: TimeUnit[] = [];
      if (formatStr.includes('h')) units.push('hour');
      if (formatStr.includes('m')) units.push('minute');
      if (formatStr.includes('s')) units.push('second');
      return units.length > 0 ? units : ['hour', 'minute', 'second'];
    });
    // 渲染columnsvalue
    const timeColumnCells = computed(() => {
      return timeColumn.value.map((unit) => {
        return {
          unit,
          cells: new Array(unit == 'hour' ? 24 : 60).fill(0).map((_, i) => {
            return {
              label: `${i <= 9 ? 0 : ''}${i}`,
              value: i,
            };
          }),
        };
      });
    });
    // inputRefs
    const inputRefs = ref<HTMLInputElement[]>([]);
    _provide<TimePickerContext>(TIME_PICKER_CONTEXT_KEY, {
      computedValue,
      computedVisible,
      timeColumn,
      timeColumnCells,
      curValue,
      format,
      type,
      curIndex,
      inputRefs,
      disableConfirm,
      disabledHours,
      disabledMinutes,
      disabledSeconds,
    });
    return {
      computedValue,
      computedVisible,
      showClearBtn,
      curValue,
      readonly,
      disabled,
      type,
      curIndex,
      inputRefs,
    };
  };
  const inject = () => {
    return _inject<TimePickerContext>(TIME_PICKER_CONTEXT_KEY, {
      type: ref('time'),
      format: ref('HH:mm:ss'),
      curValue: ref([]),
      computedValue: ref(''),
      computedVisible: ref(false),
      curIndex: ref(0),
      timeColumn: ref([]),
      timeColumnCells: ref([]),
      inputRefs: ref([]),
      disableConfirm: ref(false),
      disabledHours: () => [],
      disabledMinutes: () => [],
      disabledSeconds: () => [],
    });
  };
  return {
    provide,
    inject,
  };
};
