import { computed, ref, Ref } from 'vue';

export type Fn = (...args: any) => any;

export function isUndefined(value: any): value is undefined {
  return typeof value == 'undefined';
}

export default <T>(
  modelValue: Ref<T | undefined>,
  defaultValue: T,
  onSet: Fn = (data: T) => data,
  onGet: Fn = (data: T) => data
) => {
  const controlValue = ref<T>(defaultValue);
  return computed({
    get() {
      const value = isUndefined(modelValue.value)
        ? controlValue.value
        : modelValue.value;
      return onGet(value);
    },
    set(value: T) {
      controlValue.value = value;
      onSet(value);
    },
  });
};
