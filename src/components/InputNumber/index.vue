<template>
  <yc-input
    :model-value="<string>computedValue"
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
    @keydown="(ev) => $emit('keydown', ev)"
    @change="(v, ev) => $emit('change', +v, ev)"
    @blur="(ev) => handleUpdateValue('blur', ev)"
    @press-enter="(ev) => handleUpdateValue('keydown', ev)"
    @input="handleInput"
  >
    <!-- prefix -->
    <template v-if="$slots.prefix" #prefix>
      <slot name="prefix" />
    </template>
    <!-- suffix -->
    <template v-if="$slots.suffix || (!hideButton && mode == 'embed')" #suffix>
      <slot name="suffix">
        <div class="yc-input-number-step">
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
            :max="max"
            :size="size"
            @plus="handleStep('plus')"
          >
            <template v-if="$slots.plus" #icon>
              <slot name="plus"> </slot>
            </template>
          </yc-plus>
        </div>
      </slot>
    </template>
    <!-- prepend -->
    <template
      v-if="$slots.prepend || (!hideButton && mode == 'button')"
      #prepend
    >
      <slot name="prepend">
        <yc-minus
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
      </slot>
    </template>
    <!-- append -->
    <template v-if="$slots.append || (!hideButton && mode == 'button')" #append>
      <slot name="append">
        <yc-plus
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
      </slot>
    </template>
  </yc-input>
</template>

<script lang="ts" setup>
import { ref, toRefs, computed } from 'vue';
import { InputNumberProps, InputNumberValue } from './type';
import { isUndefined, isNumber, isString } from '@shared/utils/is';
import YcMinus from './component/Minus.vue';
import YcPlus from './component/Plus.vue';
import YcInput, { InputInstance } from '@/components/Input';

defineOptions({
  name: 'InputNumber',
});
const props = withDefaults(defineProps<InputNumberProps>(), {
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
});
const emits = defineEmits<{
  (e: 'update:modelValue', value: InputNumberValue): void;
  (e: 'input', value: InputNumberValue, ev: Event): void;
  (e: 'change', value: InputNumberValue, ev: Event): void;
  (e: 'blur', ev: FocusEvent): void;
  (e: 'clear', ev: MouseEvent): void;
  (e: 'keydown', ev: KeyboardEvent): void;
}>();
const {
  modelValue,
  defaultValue,
  step,
  min,
  max,
  disabled,
  hideButton,
  mode,
  modelEvent,
  precision: _precision,
} = toRefs(props);
// 实例
const inputRef = ref<InputInstance>();
// 控制的值
const controlValue = ref<InputNumberValue>(defaultValue.value);
// 值
const computedValue = computed({
  get() {
    const numberValue = isUndefined(modelValue.value)
      ? controlValue.value
      : modelValue.value;
    return isString(numberValue)
      ? numberValue
      : handlePrecision(numberValue, 'string');
  },
  set(val) {
    emits(
      'update:modelValue',
      modelEvent.value == 'change' ? val : handlePrecision(val, 'number')
    );
  },
});
// 精度
const precision = computed(() => {
  const stepPrecision = String(step.value).match(/\.(\d+)/)?.[1]?.length ?? 0;
  return Math.max(...[stepPrecision, _precision.value]);
});
// 处理精度问题
function handlePrecision(value: InputNumberValue, type: 'number' | 'string') {
  // 处理过后的值
  const handleValue = isNumber(value) ? value : +value;
  // 处理的值
  const numberValue = precision.value
    ? handleValue.toFixed(precision.value)
    : Number.parseInt(handleValue.toFixed(0));
  return type == 'number' ? +numberValue : numberValue;
}
// 处理点击
const handleStep = (type: 'minus' | 'plus') => {
  const value =
    type == 'minus'
      ? +computedValue.value - step.value
      : +computedValue.value + step.value;
  computedValue.value = handlePrecision(value, 'string');
  inputRef.value?.focus();
};
// 处理失焦越界
const handleUpdateValue = (
  type: 'blur' | 'keydown',
  e: FocusEvent | KeyboardEvent
) => {
  if (!computedValue.value) return;
  let value = +computedValue.value;
  value = value < min.value ? min.value : value;
  value = value > max.value ? max.value : value;
  // 处理精度
  emits('update:modelValue', handlePrecision(value, 'number'));
  if (type == 'blur') {
    emits('blur', e as FocusEvent);
  } else {
    emits('keydown', e as KeyboardEvent);
  }
};
// 处理输入
const handleInput = (v: string, e: Event) => {
  if (!v) {
    computedValue.value = v;
    return;
  }
  // 只能输入数字、.、-
  const isInValidNumber = !/^-?\d*\.?\d*$/.test(v);
  // 处理小数点只能一个
  const isInValidPoint = (v.match(/\./g)?.length ?? 0) > 1;
  // 处理－号只能一个,且位置正确
  const isInValidNegative = v.includes('-') && v[0] != '-';
  // 处理逻辑
  if (isInValidNumber || isInValidPoint || isInValidNegative) {
    return;
  }
  computedValue.value = v;
  emits('input', v, e);
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
@import './style/input-number.less';
</style>
