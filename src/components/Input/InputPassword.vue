<template>
  <yc-input
    :type="computedVisibility ? 'text' : 'password'"
    v-bind="$attrs"
    :class="['yc-input-password', $attrs.class]"
    ref="inputBaseRef"
    @update:model-value="(v) => $emit('update:modelValue', v)"
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
import { ref, toRefs } from 'vue';
import { InputPasswordProps } from './type';
import useControlValue from '@/components/_/hooks/useControlValue';
import YcInput from './Input.vue';

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
  (e: 'visibilityChange', value: boolean): void;
}>();
const { defaultVisibility, visibility } = toRefs(props);
// 非受控的vis
const computedVisibility = useControlValue<boolean>(
  visibility,
  defaultVisibility.value,
  (val) => {
    emits('update:visibility', val);
    emits('visibilityChange', val);
  }
);
// 组件实例
const inputBaseRef = ref<InstanceType<typeof YcInput>>();
defineExpose({
  focus() {
    inputBaseRef.value?.focus();
  },
  blur() {
    inputBaseRef.value?.blur();
  },
});
</script>
