<template>
  <div
    :class="{
      'yc-dropdown-option': true,
      'yc-dropdown-option-active': isActive,
      'yc-dropdown-option-disabled': disabled,
      'yc-dropdown-option-has-suffix': $slots.suffix,
    }"
    ref="doptionRef"
    @click="handleClick"
  >
    <div v-if="$slots.icon" class="yc-dropdown-option-icon">
      <slot name="icon" />
    </div>
    <div class="yc-dropdown-option-content text-ellipsis">
      <slot />
    </div>
    <div v-if="$slots.suffix" class="yc-dropdown-option-suffix">
      <slot name="suffix" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs } from 'vue';
import { DoptionProps, DoptionValue, DoptionSlots } from './type';
import useContext from './hooks/useContext';
defineOptions({
  name: 'Doption',
});
defineSlots<DoptionSlots>();
const props = withDefaults(defineProps<DoptionProps>(), {
  disabled: false,
  isSubmenu: false,
  isActive: false,
});
const emits = defineEmits<{
  (e: 'click', ev: MouseEvent): void;
}>();
const { value: optionValue, disabled, isSubmenu } = toRefs(props);
// dropdown传递的值
const { inject } = useContext();
const { select } = inject();
// 自身实例
const doptionRef = ref<HTMLDivElement>();
// 处理后缀点击
const handleClick = (ev: MouseEvent) => {
  if (disabled.value) return;
  emits('click', ev);
  if (isSubmenu.value) return;
  select(optionValue.value as DoptionValue, ev);
};

defineExpose({
  getOptionRef() {
    return doptionRef.value as HTMLDivElement;
  },
});
</script>

<style lang="less" scoped>
@import './style/doption.less';
</style>
