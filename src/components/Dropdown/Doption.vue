<template>
  <div
    :class="{
      'yc-dropdown-option': true,
      'yc-dropdown-option-disabled': disabled,
      'yc-dropdown-option-has-suffix': $slots.suffix,
    }"
    ref="doptionRef"
    @click="handleClick"
    @mouseenter="handleMouseenter"
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
import { ref, toRefs, inject } from 'vue';
import { DoptionProps, ProvideType } from './type';
import { DROPDOWN_PROVIDE_KEY } from './constants';
defineOptions({
  name: 'Doption',
});
const props = withDefaults(defineProps<DoptionProps>(), {
  disabled: false,
  isSubmenu: false,
});
const emits = defineEmits<{
  (e: 'click', ev: MouseEvent): void;
}>();
const { value, disabled, isSubmenu } = toRefs(props);
// 父级传递的值
const {
  level,
  curLevel,
  hideOnSelect,
  emits: dEmits,
  hide,
} = inject<ProvideType>(DROPDOWN_PROVIDE_KEY, {
  level: ref(-1),
  curLevel: ref(0),
  groupIds: ref([]),
  hideOnSelect: ref(true),
  hide: () => {},
  emits: () => {},
});
// 自身实例
const doptionRef = ref<HTMLDivElement>();
// 处理后缀点击
const handleClick = (ev: MouseEvent) => {
  if (disabled.value) return;
  emits('click', ev);
  if (isSubmenu.value) return;
  dEmits('select', value.value, ev);
  if (!hideOnSelect.value) return;
  hide();
};
// 鼠标进入的时候处理层级
const handleMouseenter = () => {
  curLevel.value = isSubmenu.value ? level.value - 1 : level.value;
  console.log(curLevel.value);
};

defineExpose({
  getRef() {
    return doptionRef.value as HTMLDivElement;
  },
});
</script>

<style lang="less" scoped>
@import './style/doption.less';
</style>
