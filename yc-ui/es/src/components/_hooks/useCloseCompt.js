import "../../../node_modules/vue/dist/vue.runtime.esm-bundler.js";
import { useMagicKeys } from "../../../node_modules/@vueuse/core/index.js";
import useControlValue from "./useControlValue.js";
import { whenever } from "../../../node_modules/@vueuse/shared/index.js";
import { ref } from "../../../node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js";
import { watch } from "../../../node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js";
const useCloseCompt = (emits, config) => {
  const { maskClosable, escToClose, visible, defaultVisible } = config;
  const outerVisible = ref(false);
  const innerVisible = useControlValue(
    visible,
    defaultVisible.value,
    (val) => emits("update:visible", val)
  );
  const closeType = ref("");
  const handleAfterLeave = () => {
    emits("close", closeType.value);
    outerVisible.value = false;
  };
  const handleClose = async (type) => {
    closeType.value = type;
    if (type == "confirmBtn") {
      emits("ok");
    } else {
      emits("cancel", closeType.value);
    }
    if (type == "mask" && !maskClosable.value)
      return;
    innerVisible.value = false;
  };
  const initHotKeys = () => {
    const keys = useMagicKeys();
    whenever(keys.escape, () => {
      if (!escToClose.value || !innerVisible.value)
        return;
      handleClose("esc");
    });
  };
  initHotKeys();
  watch(
    () => innerVisible.value,
    (v) => {
      closeType.value = "";
      if (v) {
        outerVisible.value = true;
      }
    },
    {
      immediate: true
    }
  );
  return {
    closeType,
    outerVisible,
    innerVisible,
    handleClose,
    handleAfterLeave
  };
};
export {
  useCloseCompt as default
};
