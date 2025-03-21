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
import {
  DROPDOWN_PROVIDE_KEY,
  TRIGGER_PROVIDE_KEY,
} from '@/components/_constants';
import { ProvideType as TriggerProvideType } from '@/components/Trigger/type';
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
// trigger传递的值
const { level, curHoverLevel } = inject<TriggerProvideType>(
  TRIGGER_PROVIDE_KEY,
  {
    level: -1,
    curHoverLevel: ref(0),
    groupIds: ref([]),
    timeout: ref<NodeJS.Timeout>(),
  }
);
// dropdown传递的值
const {
  emits: _emits,
  hideOnSelect,
  hide,
} = inject<ProvideType>(DROPDOWN_PROVIDE_KEY, {
  hideOnSelect: ref(true),
  emits: () => {},
  hide: () => {},
});
// 自身实例
const doptionRef = ref<HTMLDivElement>();
// 处理后缀点击
const handleClick = (ev: MouseEvent) => {
  if (disabled.value) return;
  emits('click', ev);
  if (isSubmenu.value || !_emits) return;
  _emits('select', value.value, ev);
  if (!hideOnSelect.value) return;
  hide();
};
// 鼠标进入的时候处理层级
const handleMouseenter = () => {
  curHoverLevel.value = level;
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
