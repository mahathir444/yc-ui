import "../../../node_modules/vue/dist/vue.runtime.esm-bundler.js";
import useControlValue from "./useControlValue.js";
import { isArray } from "../_utils/is.js";
import { provide, computed } from "../../../node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js";
import { ref } from "../../../node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js";
const useSeletValue = (params) => {
  const {
    popupVisible,
    defaultPopupVisible,
    modelValue,
    defaultValue,
    inputValue,
    defaultInputValue,
    formatLabel,
    emits
  } = params;
  const computedVisible = useControlValue(
    popupVisible,
    defaultPopupVisible.value,
    (val) => {
      emits("update:popupVisible", val);
    }
  );
  provide("computedVisible", computedVisible);
  const computedValue = useControlValue(
    modelValue,
    defaultValue.value,
    (val) => {
      emits("change", val);
      emits("update:modelValue", val);
    }
  );
  const computedLabel = computed(() => {
    const option = optionList.value.filter((item) => {
      return isArray(computedValue.value) ? computedValue.value.includes(item.value) : computedValue.value == item.value;
    });
    if (!option.length)
      return "";
    return formatLabel(option);
  });
  provide("computedValue", computedValue);
  const computedInputValue = useControlValue(
    inputValue,
    defaultInputValue.value,
    (val) => {
      emits("update:inputValue", val);
    }
  );
  provide("computedInputValue", computedInputValue);
  const optionList = ref([]);
  provide("optionList", optionList);
  const isEmpty = computed(() => {
    const filterResult = optionList.value.filter(
      (item) => {
        var _a;
        return (_a = item.label) == null ? void 0 : _a.includes(computedInputValue.value);
      }
    );
    return !filterResult.length;
  });
  return {
    computedVisible,
    computedValue,
    computedInputValue,
    isEmpty,
    computedLabel
  };
};
export {
  useSeletValue as default
};
