<template>
  <div :class="['yc-checkbox-group', CHECKBOX_DIRECTION_MAP[direction]]">
    <slot />
    <yc-checkbox
      v-for="(item, index) in options"
      :key="index"
      :value="item.value"
      :disabled="item.disabled"
      :indeterminate="item.indeterminate"
    >
      <!-- checkbox -->
      <template v-if="$slots.checkbox" #checkbox="{ checked, disabled }">
        <slot name="checkbox" :checked="checked" :disabled="disabled" />
      </template>
      <!-- label -->
      <slot name="label" :data="item">
        {{ item.label }}
      </slot>
    </yc-checkbox>
  </div>
</template>

<script lang="ts" setup>
import { CheckboxGroupProps, CheckboxEmits, CheckboxGroupSlots } from './type';
import { CHECKBOX_DIRECTION_MAP } from '@shared/constants';
import YcCheckbox from './Checkbox.vue';
import useProvide from './hooks/useProvide';
defineOptions({
  name: 'CheckboxGroup',
});
defineSlots<CheckboxGroupSlots>();
const props = withDefaults(defineProps<CheckboxGroupProps>(), {
  modelValue: undefined,
  defaultValue: () => [],
  max: undefined,
  options: () => [],
  direction: 'horizontal',
  disabled: false,
});
const emits = defineEmits<CheckboxEmits>();
// 注入数据
const { provide } = useProvide();
provide(props, emits);
</script>

<style lang="less">
@import './style/checkbox-group.less';
</style>
