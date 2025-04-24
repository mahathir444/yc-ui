import { ComputedRef, ref, Ref, WritableComputedRef } from 'vue';
import { onKeyStroke } from '@vueuse/core';
import { SelectOptionData, SelectValue } from '../type';
import { Fn, ObjectData } from '@shared/type';

export default (params: {
  hotkeys: Ref<boolean>;
  multiple: Ref<boolean>;
  limit: Ref<number>;
  computedVisible: WritableComputedRef<boolean>;
  computedValue: WritableComputedRef<SelectValue>;
  options: ComputedRef<SelectOptionData[]>;
  blur: Fn;
  emits: Fn;
}) => {
  const {
    computedValue,
    computedVisible,
    options,
    hotkeys,
    multiple,
    limit,
    blur,
    emits,
  } = params;
  const curIndex = ref<number>(-1);
  if (!hotkeys.value) {
    return {
      curIndex,
    };
  }
  onKeyStroke(['ArrowUp', 'ArrowDown', 'Enter'], (e) => {
    if (!computedVisible.value || !options.value.length) return;
    const { key } = e;
    e.preventDefault();
    if (key == 'ArrowUp') {
      curIndex.value--;
      curIndex.value =
        curIndex.value < 0 ? options.value.length - 1 : curIndex.value;
    } else if (key == 'ArrowDown') {
      curIndex.value++;
      curIndex.value =
        curIndex.value >= options.value.length ? 0 : curIndex.value;
    } else {
      const value = options.value[curIndex.value].value;
      if (multiple.value) {
        const curValue = computedValue.value as ObjectData[];
        const index = curValue.findIndex((item) => item == value);
        if (index == -1) {
          if (limit.value > 0 && curValue.length == limit.value) {
            return emits('exceedLimit', value);
          }
          computedValue.value = [...curValue, value];
        } else {
          computedValue.value = curValue.filter((item) => item != value);
        }
      } else {
        computedValue.value = value as string;
        blur();
      }
      emits('select', value);
    }
  });
  return {
    curIndex,
  };
};
