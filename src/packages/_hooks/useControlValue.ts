import { computed, ref, Ref } from 'vue';
import { isUndefined } from '../_utils/is';
import { Fn } from '../_type';

export default <T>(
  value: Ref<T | undefined>,
  defaultValue: Ref<T>,
  onSet: Fn
) => {
  const controlValue = ref<T>(defaultValue.value);
  return computed({
    get() {
      return isUndefined(value?.value) ? controlValue.value : value.value;
    },
    set(val: T) {
      if (isUndefined(value?.value)) {
        controlValue.value = val;
      } else {
        onSet(val);
      }
    },
  });
};
