<template>
  <div
    :class="{
      'yc-dropdown-option': true,
      'yc-dropdown-option-disabled': disabled,
      'yc-dropdown-option-has-suffix': $slots.suffix,
    }"
    :data-doption="doptionInfo"
    @click="handleClick"
    ref="optionRef"
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
import { ref, toRefs, computed } from 'vue';
import { DoptionProps } from './type';
defineOptions({
  name: 'Doption',
});
const props = withDefaults(defineProps<DoptionProps>(), {
  disabled: false,
});
const emits = defineEmits<{
  (e: 'click', ev: MouseEvent): void;
}>();
const { value, disabled } = toRefs(props);
const optionRef = ref<HTMLDivElement>();
// 计算optionInfo
const doptionInfo = computed(() => {
  return JSON.stringify({
    value: value.value,
    disabled: disabled.value,
  });
});
// 处理后缀点击
const handleClick = (ev: MouseEvent) => {
  if (disabled.value) return;
  emits('click', ev);
};

defineExpose({
  getRef() {
    return optionRef.value as HTMLDivElement;
  },
});
</script>

<style lang="less" scoped>
.yc-dropdown-option {
  padding: 0 12px;
  line-height: 36px;
  font-size: 14px;
  color: rgb(29, 33, 41);
  text-align: left;
  display: flex;
  align-items: center;
  transition: all 0.1s cubic-bezier(0, 0, 1, 1);
  &:hover {
    color: rgb(29, 33, 41);
    background-color: rgb(242, 243, 245);
  }
  &.yc-dropdown-option-disabled {
    color: rgb(201, 205, 212);
    background: transparent;
    cursor: not-allowed;
  }
  .yc-dropdown-option-icon,
  .yc-dropdown-option-content,
  .yc-dropdown-option-suffix {
    flex-shrink: 0;
  }
  .yc-dropdown-option-icon {
    margin-right: 8px;
    color: inherit;
  }
  .yc-dropdown-option-suffix {
    color: inherit;
    margin-left: 12px;
  }
  .yc-dropdown-option-content {
    flex: 1;
    overflow: hidden;
    display: flex;
    align-items: center;
  }
}
</style>
