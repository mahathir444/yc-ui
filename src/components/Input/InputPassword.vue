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
        size="14px"
        @click="computedVisibility = !computedVisibility"
      >
        <template #icon>
          <icon-eye-open v-if="computedVisibility" />
          <icon-eye-close v-else />
        </template>
      </yc-icon-button>
    </template>
  </yc-input>
</template>

<script lang="ts" setup>
import { ref, toRefs } from 'vue';
import { InputPasswordProps } from './type';
import useControlValue from '@shared/hooks/useControlValue';
import YcInput from './Input.vue';
import IconEyeOpen from '@shared/icons/IconEyeOpen.vue';
import IconEyeClose from '@shared/icons/IconEyeClose.vue';

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
