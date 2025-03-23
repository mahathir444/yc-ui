<template>
  <yc-input
    :model-value="computedValue"
    :allow-clear="allowClear"
    :disabled="disabled"
    :readonly="readonly"
    :error="error"
    :size="size"
    :placeholder="placeholder"
    :input-attrs="inputAttrs"
    class="yc-input-number"
    ref="inputRef"
    @clear="(ev) => $emit('clear', ev)"
    @change="(v, ev) => $emit('change', +v, ev)"
    @blur="handleBlur"
    @input="handleInput"
  >
    <!-- prefix -->
    <template v-if="$slots.prefix" #prefix>
      <slot name="prefix" />
    </template>
    <!-- suffix -->
    <template v-if="(!hideButton && mode == 'embed') || $slots.suffix" #suffix>
      <div
        v-if="(!hideButton && mode == 'embed') || $slots.suffix"
        class="yc-input-number-step"
      >
        <yc-minus
          :mode="mode"
          :computed-value="computedValue"
          :disabled="disabled"
          :min="min"
          :size="size"
          @minus="handleStep('minus')"
        >
          <template v-if="$slots.minus" #icon>
            <slot name="minus"> </slot>
          </template>
        </yc-minus>
        <yc-plus
          :mode="mode"
          :computed-value="computedValue"
          :disabled="disabled"
          :max="min"
          :size="size"
          @plus="handleStep('plus')"
        >
          <template v-if="$slots.plus" #icon>
            <slot name="plus"> </slot>
          </template>
        </yc-plus>
      </div>
      <slot v-else name="suffix" />
    </template>
    <!-- prepend -->
    <template
      v-if="(!hideButton && mode == 'button') || $slots.prepend"
      #prepend
    >
      <yc-minus
        v-if="!hideButton && mode == 'button'"
        :mode="mode"
        :computed-value="computedValue"
        :disabled="disabled"
        :min="min"
        :size="size"
        @minus="handleStep('minus')"
      >
        <template v-if="$slots.minus" #icon>
          <slot name="minus" />
        </template>
      </yc-minus>
      <slot v-else name="prepend" />
    </template>
    <!-- append -->
    <template v-if="(!hideButton && mode == 'button') || $slots.append" #append>
      <yc-plus
        v-if="!hideButton && mode == 'button'"
        :mode="mode"
        :computed-value="computedValue"
        :disabled="disabled"
        :max="max"
        :size="size"
        @plus="handleStep('plus')"
      >
        <template v-if="$slots.plus" #icon>
          <slot name="plus" />
        </template>
      </yc-plus>
      <slot v-else name="append" />
    </template>
  </yc-input>
</template>

<script lang="ts" setup>
import { ref, toRefs, computed } from 'vue';
import { Fn, Size, ObjectData } from '@/components/_type';
import YcInput, { InputInstance } from '@/components/Input';
import YcMinus from './component/Minus.vue';
import YcPlus from './component/Plus.vue';
import useControlValue from '../_hooks/useControlValue';
const props = withDefaults(
  defineProps<{
    modelValue?: number | string;
    defaultValue?: number | string;
    mode?: 'embed' | 'button';
    precision?: number;
    step?: number;
    disabled?: boolean;
    error?: boolean;
    max?: number;
    min?: number;
    formatter?: Fn;
    parser?: Fn;
    placeholder?: string;
    hideButton?: boolean;
    size?: Size;
    allowClear?: boolean;
    modelEvent?: 'change' | 'input';
    readonly?: boolean;
    inputAttrs?: ObjectData;
  }>(),
  {
    modelValue: undefined,
    defaultValue: '',
    mode: 'embed',
    precision: 0,
    step: 1,
    disabled: false,
    error: false,
    max: Infinity,
    min: -Infinity,
    placeholder: '请输入',
    hideButton: false,
    size: 'medium',
    allowClear: false,
    modelEvent: 'change',
    readonly: false,
    inputAttrs: () => {
      return {};
    },
  }
);
const emits = defineEmits<{
  (e: 'update:modelValue', value: number): void;
  (e: 'change', value: number, ev: Event): void;
  (e: 'blur', ev: FocusEvent): void;
  (e: 'clear', ev: MouseEvent): void;
  (e: 'input', value: number, ev: Event): void;
  (e: 'keydown', ev: KeyboardEvent): void;
}>();
const {
  modelValue,
  defaultValue,
  step,
  min,
  max,
  disabled,
  precision: _precision,
} = toRefs(props);
// 实例
const inputRef = ref<InputInstance>();
// 值
const computedValue = useControlValue<number | string>(
  modelValue,
  defaultValue.value,
  (val) => {
    emits('update:modelValue', val);
  }
);
// 进度
const precision = computed(() => {
  const stepMatch = step.value.toString().match(/\.(\d+)/);
  const stepPrecision = stepMatch ? stepMatch[1].length : 0;
  // const rangePrecision =
  return stepPrecision >= _precision.value ? stepPrecision : _precision.value;
});
// 处理精度问题
function handlePrecision(value: string) {
  return precision.value
    ? (+value).toFixed(precision.value)
    : Number.parseInt(value).toString();
}
// 处理点击
const handleStep = (type: 'minus' | 'plus') => {
  const value = +(computedValue.value ?? 0);
  if (type == 'minus') {
    computedValue.value = handlePrecision(String(value - step.value));
  } else {
    computedValue.value = handlePrecision(String(value + step.value));
  }
  inputRef.value?.focus();
};
// 处理失焦越界
const handleBlur = (e: FocusEvent) => {
  if (!String(computedValue.value)) return;
  let value = +computedValue.value;
  value = value < min.value ? min.value : value;
  value = value > max.value ? max.value : value;
  // 处理精度
  computedValue.value = handlePrecision(String(value));
  emits('blur', e);
};
// 处理输入
const handleInput = (v: string, e: Event) => {
  if (!v) {
    return (computedValue.value = v);
  }
  if (!/^-?\d*\.?\d*$/.test(v)) {
    return;
  }
  // 处理小数点只能一个
  const ponitMatch = v.match(/\./g);
  const pointNumber = ponitMatch ? ponitMatch.length : 0;
  if (pointNumber > 1) {
    return;
  }
  // 处理－号只能一个
  if (v.includes('-') && (v[0] != '-' || v[1] == '.')) {
    return;
  }
  computedValue.value = v;
  emits('input', +v, e);
};
// 暴漏方法
defineExpose({
  focus() {
    inputRef.value?.focus();
  },
  blur() {
    inputRef.value?.focus();
  },
});
</script>

<style lang="less" scoped>
.yc-input-number {
  position: relative;
  &:hover .yc-input-number-step {
    opacity: 1;
  }
  &:deep(.yc-input-prepend),
  &:deep(.yc-input-append) {
    padding: 0;
  }
  &.yc-input-focus {
    .yc-input-number-step {
      opacity: 1;
    }
  }
}
.yc-input-number-step {
  position: absolute;
  right: 4px;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0;
  display: flex;
  flex-direction: column;
  transition: all 0.1s cubic-bezier(0, 0, 1, 1);
}
</style>
