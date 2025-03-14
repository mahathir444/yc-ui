import "../../../node_modules/vue/dist/vue.runtime.esm-bundler.js";
import { isUndefined } from "../_utils/is.js";
import { ref } from "../../../node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js";
import { computed } from "../../../node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js";
const useControlValue = (modelValue, defaultValue, onSet) => {
  const controlValue = ref(defaultValue);
  return computed({
    get() {
      return isUndefined(modelValue.value) ? controlValue.value : modelValue.value;
    },
    set(value) {
      if (isUndefined(modelValue.value)) {
        controlValue.value = value;
      }
      onSet && onSet(value);
    }
  });
};
export {
  useControlValue as default
};
