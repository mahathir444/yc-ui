<template>
  <div
    :class="['yc-checkbox-group', `yc-checkbox-group-direction-${direction}`]"
  >
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
import useProvide from './hooks/useProvide';
import YcCheckbox from './Checkbox.vue';
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
