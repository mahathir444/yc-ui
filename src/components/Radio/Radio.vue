<template>
  <label
    v-prevent="{
      event: 'mousedown',
    }"
    :class="{
      'yc-radio': true,
      'yc-radio-hoverable': !computedChecked && !disabled,
      'yc-radio-disabled': disabled,
      'yc-radio-checked': computedChecked,
    }"
  >
    <input
      type="radio"
      class="yc-radio-target"
      :value="value"
      :checked="computedChecked"
      :disabled="disabled"
      @change="handleCollect"
    />
    <slot name="radio" :checked="computedChecked" :disabled="disabled">
      <yc-icon-button
        hover-size="24px"
        :hover-color="
          computedChecked || disabled ? 'transparent' : 'rgb(242, 243, 245)'
        "
      >
        <template #icon>
          <span class="yc-radio-icon"> </span>
        </template>
      </yc-icon-button>
      <span class="yc-radio-label text-ellipsis">
        <slot />
      </span>
    </slot>
  </label>
</template>

<script lang="ts" setup>
import { toRefs, inject, computed, ref } from 'vue';
import { RadioProps, RadioValue, ProvideType } from './type';
import { RADIO_GROUP_PROVIDE_KEY } from '@/components/_constants';
import { isUndefined } from '@/components/_utils/is';
import useControlValue from '@/components/_hooks/useControlValue';
defineOptions({
  name: 'Radio',
});
const props = withDefaults(defineProps<RadioProps>(), {
  modelValue: undefined,
  defaultChecked: false,
  disabled: false,
  value: true,
  type: 'radio',
});
const emits = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'change', value: boolean, ev: Event): void;
}>();
const {
  modelValue,
  defaultChecked,
  value: radioValue,
  disabled: _disabled,
  type: _type,
} = toRefs(props);
// 接收的值
const { computedValue, disabled, type } = inject<ProvideType>(
  RADIO_GROUP_PROVIDE_KEY,
  {
    computedValue: ref(undefined),
    disabled: _disabled,
    type: _type,
  }
);
// checkbox受控的值
const _computedValue = useControlValue<RadioValue>(
  modelValue,
  defaultChecked.value,
  (val) => {
    emits('update:modelValue', val);
  }
);
// 用于显示的值
const computedChecked = computed(() => {
  if (isUndefined(computedValue.value)) {
    return _computedValue.value == radioValue.value;
  } else {
    return computedValue.value == radioValue.value;
  }
});
// 处理check发生改变
const handleCollect = (e: Event) => {
  const { value } = radioValue;
  _computedValue.value = value;
  emits('change', _computedValue.value, e);
  if (isUndefined(computedValue.value)) return;
  computedValue.value = value;
};
</script>

<style lang="less" scoped>
.yc-radio {
  position: relative;
  cursor: pointer;
  padding-left: 5px;
  font-size: 14px;
  line-height: unset;
  display: inline-flex;
  align-items: center;
  gap: 8px;

  .yc-radio-target {
    position: absolute;
    left: 0;
    top: 0;
    width: 0;
    height: 0;
    opacity: 0;
  }
  .yc-radio-icon,
  .yc-radio-label {
    flex-shrink: 0;
  }
  .yc-radio-icon {
    position: relative;
    width: 14px;
    height: 14px;
    border: 2px solid rgb(229, 230, 235);
    border-radius: 50%;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    &::after {
      content: '';
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      transform: translateX(-50%) translateY(-50%) scale(0);
      transition: transform 0.3s cubic-bezier(0.3, 1.3, 0.3, 1);
      background: #fff;
    }
  }
  .yc-radio-label {
    user-select: none;
    flex: 1;
    color: rgb(29, 33, 41);
  }
}
// hoverable
.yc-radio-hoverable {
  &:hover .yc-icon-button {
    &::before {
      background-color: rgba(242, 243, 245);
    }
    .yc-radio-icon {
      transition: border-color 0.1s cubic-bezier(0, 0, 1, 1);
      border-color: rgb(201, 205, 212);
    }
  }
}
// 全选
.yc-radio-checked {
  .yc-radio-icon {
    border-color: transparent;
    background-color: rgb(22, 93, 255);
    &::after {
      transform: translateX(-50%) translateY(-50%) scale(0.4);
    }
  }
  &.yc-radio-disabled {
    .yc-radio-icon {
      background-color: rgb(148, 191, 255);
      border-color: transparent;
    }
  }
}
// disabled
.yc-radio-disabled {
  cursor: not-allowed;
  .yc-radio-icon {
    border-color: rgb(229, 230, 235);
    background-color: rgb(242, 243, 245);
  }
  .yc-radio-label {
    color: rgb(201, 205, 212);
  }
}
</style>
