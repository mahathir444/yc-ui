<template>
  <yc-input
    v-bind="props"
    :type="computedVisibility || controlVisibility ? 'text' : 'password'"
    class="yc-input-password"
    ref="inputBaseRef"
    @input="handleInput"
    @change="handleChange"
    @clear="handleClear"
    @focus="(e) => emits('focus', e)"
    @blur="(e) => emits('blur', e)"
    @press-enter="(e) => emits('press-enter', e)"
  >
    <!-- prefix -->
    <template v-if="$slots.prefix" #prefix>
      <slot name="prefix"></slot>
    </template>
    <!-- suffix -->
    <template #suffix>
      <slot name="suffix"></slot>
    </template>
    <!-- prepend -->
    <template v-if="$slots.prepend" #prepend>
      <slot name="prepend" />
    </template>
    <!-- append -->
    <template v-if="$slots.append" #append>
      <slot name="append" />
    </template>
    <!-- extra -->
    <template v-if="invisibleButton" #extra>
      <yc-icon-button
        :name="
          computedVisibility || controlVisibility ? 'eye-open' : 'eye-close'
        "
        size="14"
        @click="handleVisibility"
      />
    </template>
  </yc-input>
</template>

<script lang="ts" setup>
import { ref, computed, toRefs } from 'vue';
import { isUndefined } from '@/utils/is';
import { InputPassword } from './type';
import YcInput from './InputBase.vue';
import YcIconButton from '@/components/IconButton/index.vue';
const props = withDefaults(defineProps<InputPassword>(), {
  modelValue: undefined,
  defaultValue: undefined,
  size: 'medium',
  allowClear: false,
  disabled: false,
  readonly: false,
  error: false,
  showWordLimit: false,
  placeholder: '',
  visibility: undefined,
  defaultVisibility: false,
  invisibleButton: true,
});
const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'update:visibility', value: boolean): void;
  (e: 'input', value: string, ev: Event): void;
  (e: 'change', value: string, ev: Event): void;
  (e: 'press-enter', ev: KeyboardEvent): void;
  (e: 'clear', ev: MouseEvent): void;
  (e: 'focus', ev: FocusEvent): void;
  (e: 'blur', ev: FocusEvent): void;
  (e: 'visibilityChange', value: boolean): void;
}>();
const { defaultVisibility, visibility } = toRefs(props);
// 组件实例
const inputBaseRef = ref<InstanceType<typeof YcInput>>();
// 处理visib
const computedVisibility = computed(() => {
  if (!isUndefined(visibility.value)) return visibility.value;
  if (!isUndefined(defaultVisibility.value)) return defaultVisibility.value;
  return false;
});
// 非受控的vis
const controlVisibility = ref<boolean>(false);
// 处理vis改变
const handleVisibility = () => {
  if (isUndefined(visibility.value) && !isUndefined(defaultVisibility.value)) {
    controlVisibility.value = !controlVisibility.value;
    emits('visibilityChange', controlVisibility.value);
  } else {
    emits('update:visibility', !computedVisibility.value);
    emits('visibilityChange', !computedVisibility.value);
  }
};
// 处理输入
const handleInput = (value: string, ev: Event) => {
  emits('input', value, ev);
  emits('update:modelValue', value);
};
// 处理改变
const handleChange = (value: string, ev: Event) => {
  emits('change', value, ev);
  emits('update:modelValue', value);
};
// 处理清除
const handleClear = (e: MouseEvent) => {
  emits('clear', e);
  emits('update:modelValue', '');
};

defineExpose({
  focus() {
    inputBaseRef.value?.focus();
  },
  blur() {
    inputBaseRef.value?.blur();
  },
});
</script>
