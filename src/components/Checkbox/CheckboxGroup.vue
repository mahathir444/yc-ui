<template>
  <div :class="['yc-checkbox-group', CHECKBOX_DIRECTION_MAP[direction]]">
    <slot />
    <yc-checkbox
      v-for="item in options"
      :key="<string>item.value"
      :value="item.value"
      :disabled="item.disabled"
      :indeterminate="item.indeterminate"
    >
      <!-- checkbox -->
      <template v-if="$slots.checkbox" #checkbox="{ checked, disabled }">
        <slot name="checkbox" :checked="checked" :disabled="disabled" />
      </template>
      <!-- label -->
      <template #default>
        <slot name="label" :data="item">
          {{ item.label }}
        </slot>
      </template>
    </yc-checkbox>
  </div>
</template>

<script lang="ts" setup>
import { CheckboxGroupProps, CheckboxEmits } from './type';
import { CHECKBOX_DIRECTION_MAP } from '@shared/constants';
import YcCheckbox from './Checkbox.vue';
import useProvide from './hooks/useProvide';

defineOptions({
  name: 'CheckboxGroup',
});
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
