<template>
  <yc-input
    :type="computedVisibility ? 'text' : 'password'"
    v-bind="$attrs"
    :class="['yc-input-password', $attrs.class]"
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
        :name="computedVisibility ? 'eye-open' : 'eye-close'"
        size="14"
        @click="computedVisibility = !computedVisibility"
      />
    </template>
  </yc-input>
</template>

<script lang="ts" setup>
import { ref, computed, toRefs } from 'vue';
import { isUndefined } from '../_utils/is';
import { InputPasswordProps } from './type';
import YcInput from './Input.vue';
import YcIconButton from '@/packages/_components/IconButton/index.vue';
defineOptions({
  name: 'InputPassword',
});
const props = withDefaults(defineProps<InputPasswordProps>(), {
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
// 非受控的vis
const controlVisibility = ref<boolean>(defaultVisibility.value);
// vis的value,包括受控与非受控
const computedVisibility = computed({
  get() {
    return !isUndefined(visibility.value)
      ? visibility.value
      : controlVisibility.value;
  },
  set(val) {
    if (!isUndefined(visibility.value)) {
      emits('update:visibility', val);
    } else {
      controlVisibility.value = val;
    }
    emits('visibilityChange', val);
  },
});
// 组件实例
const inputBaseRef = ref<InstanceType<typeof YcInput>>();
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
