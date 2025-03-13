<template>
  <label
    :class="[
      'yc-checkbox',
      !computedChecked && !disabled ? 'yc-checkbox-hoverable' : '',
      computedChecked ? 'yc-checkbox-checked' : '',
      disabled ? 'yc-checkbox-disabled' : '',
    ]"
  >
    <input
      type="checkbox"
      class="yc-checkbox-target"
      :value="value"
      :disabled="disabled"
      :checked="computedChecked"
      @change="handleChange"
    />
    <slot name="checkbox" :checked="computedChecked" :disabled="disabled">
      <yc-icon-button
        hover-size="24px"
        :hover-color="
          computedChecked || disabled ? 'transparent' : 'rgb(242, 243, 245)'
        "
      >
        <template #icon>
          <span class="yc-checkbox-icon">
            <svg-icon v-show="computedChecked" name="checked" :size="[8, 10]" />
          </span>
        </template>
      </yc-icon-button>
      <span @mousedown.prevent="" class="yc-checkbox-label text-ellipsis">
        <slot />
      </span>
    </slot>
  </label>
</template>

<script lang="ts" setup>
import { ref, toRefs } from 'vue';
import useControlValue from '@/components/_hooks/useControlValue';
import YcIconButton from '@/components/_components/IconButton/index.vue';
const props = withDefaults(
  defineProps<{
    modelValue?: boolean;
    defaultChecked?: boolean;
    disabled?: boolean;
    value?: string;
  }>(),
  {
    modelValue: undefined,
    defaultChecked: false,
    disabled: false,
    value: '',
  }
);
const emits = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'change', value: boolean, ev: Event): void;
}>();
const { modelValue, defaultChecked } = toRefs(props);
// 受控的值
const computedChecked = useControlValue<boolean>(
  modelValue,
  defaultChecked.value,
  (val) => {
    emits('update:modelValue', val);
  }
);
// 处理check发生改变
const handleChange = (e: Event) => {
  computedChecked.value = (e.target as HTMLInputElement)?.checked;
  emits('change', computedChecked.value, e);
};
</script>

<style lang="less" scoped>
.yc-checkbox {
  position: relative;
  padding-left: 5px;
  font-size: 14px;
  line-height: unset;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;

  .yc-checkbox-target {
    position: absolute;
    left: 0;
    top: 0;
    width: 0;
    height: 0;
    opacity: 0;
  }

  .yc-checkbox-icon,
  .yc-checkbox-label {
    flex-shrink: 0;
  }
  .yc-checkbox-icon {
    z-index: 10;
    position: relative;
    width: 14px;
    height: 14px;
    border: 2px solid rgb(229, 230, 235);
    border-radius: 2px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: border-color 0.1 scubic-bezier(0, 0, 1, 1);
  }
  .yc-checkbox-label {
    user-select: none;
    flex: 1;
    color: rgb(29, 33, 41);
  }
}
.yc-checkbox-hoverable {
  &:hover .yc-icon-button {
    &::before {
      background-color: rgb(242, 243, 245);
    }
    // .yc-checkbox-icon {
    //   border-color: rgb(201, 205, 212);
    // }
  }
}
.yc-checkbox-checked {
  .yc-checkbox-icon {
    border-color: transparent;
    background-color: rgb(22, 93, 255);
  }
}
.yc-checkbox-disabled {
  cursor: not-allowed;
  .yc-checkbox-icon {
    border-color: rgb(229, 230, 235);
    background-color: rgb(242, 243, 245);
  }
  .yc-checkbox-label {
    color: rgb(201, 205, 212);
  }
}
</style>
