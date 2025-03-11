<template>
  <yc-trigger
    v-model:popup-visible="popupVisible"
    trigger="click"
    :popup-offset="4"
    :content-style="{
      transformOrigin: TRANSFORM_ORIGIN_MAP[triggerPostion],
    }"
    position="bl"
    animation-name="slide-dynamic-origin"
    auto-fit-popup-min-width
    @position-change="(v) => (triggerPostion = v)"
  >
    <div :class="['yc-select']" @click="handleClick">
      <yc-input
        v-model="computedInputValue"
        :placeholder="placeholder"
        :readonly="!allowSearch"
        ref="inputRef"
      />
    </div>
    <template #content>
      <div class="yc-select-dropdown">
        <yc-scrollbar style="height: 200px; overflow: auto">
          <div class="yc-select-dropdown-list">
            <slot />
          </div>
        </yc-scrollbar>
      </div>
    </template>
  </yc-trigger>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, CSSProperties, provide, toRefs } from 'vue';
import { TRANSFORM_ORIGIN_MAP } from '@/components/Trigger/constants';
import { TriggerPostion } from '@/components/Trigger';
import { SelectProps, SelectValue } from './type';
import useControlValue from '../_hooks/useControlValue';
import YcInput, { InputInstance } from '@/components/Input';
import YcTrigger from '@/components/Trigger/index.vue';
import YcScrollbar from '@/components/Scrollbar/index.vue';

const props = withDefaults(defineProps<SelectProps>(), {
  modelValue: undefined,
  defaultValue: '',
  inputValue: undefined,
  defaultInputValue: '',
  allowSearch: true,
});
const emits = defineEmits<{
  (e: 'change', value: SelectValue): void;
  (e: 'update:modelValue', value: SelectValue): void;
  (e: 'update:inputValue', value: SelectValue): void;
}>();
const { modelValue, defaultValue, inputValue, defaultInputValue } =
  toRefs(props);
// 当前的位置
const triggerPostion = ref<TriggerPostion>('bl');
// 输入实例
const inputRef = ref<InputInstance>();
//可见性
const popupVisible = ref<boolean>(false);
provide('popupVisible', popupVisible);
// modelValue
const computedValue = useControlValue<SelectValue | SelectValue[]>(
  modelValue,
  defaultValue.value,
  (val) => {
    emits('change', val);
    emits('update:modelValue', val);
  }
);
provide('computedValue', computedValue);
// 输入框的值
const computedInputValue = useControlValue<string>(
  inputValue,
  defaultInputValue.value,
  (val) => {
    emits('update:inputValue', val);
  }
);
provide('computedInputValue', computedInputValue);

// 处理点击
const handleClick = () => {
  popupVisible.value = !popupVisible.value;
  if (!popupVisible.value) {
    inputRef.value?.blur();
  }
};
</script>

<style lang="less" scoped>
.yc-select {
  width: 100%;
  height: fit-content;
}
.yc-select-dropdown {
  padding: 4px 0;
  background-color: #fff;
  border: 1px solid rgb(229, 230, 235);
  border-radius: 4px;
  box-shadow: 0 4px 10px #0000001a;
  .yc-select-dropdown-list {
    display: flex;
    flex-direction: column;
    .yc-select-option {
      flex-shrink: 0;
    }
  }
}
</style>
