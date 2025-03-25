<template>
  <div
    :class="{
      'yc-rate': true,
      'yc-rate-hoverable': !readonly && !disabled,
      'yc-rate-disabled': disabled,
    }"
  >
    <div
      v-for="i in count"
      :key="i"
      class="yc-rate-character"
      @click="handleClick(i)"
    >
      <div
        class="yc-rate-character-left"
        :style="{
          color:
            (i - 0.5 <= computedValue && !curHover) || i - 0.5 <= curHover
              ? color
              : '',
        }"
        @mouseenter="handleMouseenter(i - 0.5)"
        @mouseleave="handleMouseleave"
      >
        <slot name="character" :index="i">
          <yc-icon :name="grading ? 'smiling-face' : 'star'" />
        </slot>
      </div>
      <div
        class="yc-rate-character-right"
        :style="{
          color:
            (i - 0.5 <= computedValue && !curHover) || i - 0.5 <= curHover
              ? color
              : '',
        }"
        @mouseenter="handleMouseenter(i)"
        @mouseleave="handleMouseleave"
      >
        <slot name="character" :index="i">
          <yc-icon :name="grading ? 'smiling-face' : 'star'" />
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs } from 'vue';
import { RateProps } from './type';
import useControlValue from '@shared/hooks/useControlValue';
defineOptions({
  name: 'Rate',
});
const props = withDefaults(defineProps<RateProps>(), {
  count: 5,
  modelValue: undefined,
  defaultValue: 0,
  allowHalf: false,
  grading: false,
  readonly: false,
  disabled: false,
  color: 'rgb(247, 186, 30)',
});
const emits = defineEmits<{
  (e: 'update:modelValue', value: number): void;
  (e: 'change', value: number): void;
  (e: 'hoverChange', value: number): void;
}>();
const { allowHalf, modelValue, defaultValue, readonly, disabled } =
  toRefs(props);
// 当前hover的等级
const curHover = ref<number>(0);
// 控制值
const computedValue = useControlValue<number>(
  modelValue,
  defaultValue.value,
  (val) => {
    emits('update:modelValue', val);
  }
);
// 点击评分
const handleClick = (index: number) => {
  if (readonly.value || disabled.value) {
    return;
  }
  if (allowHalf.value) {
    computedValue.value =
      computedValue.value == index - 0.5 ? index : index - 0.5;
  } else {
    computedValue.value = index;
  }
  emits('change', computedValue.value);
};
// 处理鼠标变色
let timer: NodeJS.Timeout;
const handleMouseenter = (i: number) => {
  if (readonly.value || disabled.value) return;
  if (timer) clearTimeout(timer);
  curHover.value = i;
  emits('hoverChange', i);
};
const handleMouseleave = () => {
  if (readonly.value || disabled.value) return;
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    curHover.value = 0;
  }, 100);
};
</script>

<style lang="less" scoped>
@import './style/rate.less';
</style>
