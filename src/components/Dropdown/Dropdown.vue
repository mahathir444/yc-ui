<template>
  <yc-trigger
    v-model:popup-visible="computedVisible"
    :trigger="trigger"
    :position="position"
    :popup-offset="4"
    :mouse-enter-delay="150"
    :mouse-leave-delay="150"
    animation-name="slide-dynamic-origin"
    need-transform-origin
    auto-fit-popup-min-width
    v-bind="triggerProps"
  >
    <slot />
    <template #content>
      <div :class="['yc-dropdown', `yc-dropdown-theme-${theme}`]">
        <yc-scrollbar
          :style="{
            maxHeight: `${popupMaxHeight}px`,
          }"
        >
          <div class="yc-dropdown-list">
            <slot name="content" />
          </div>
        </yc-scrollbar>
        <div v-if="$slots.footer" class="yc-dropdown-footer">
          <slot name="footer" />
        </div>
      </div>
    </template>
  </yc-trigger>
</template>

<script lang="ts" setup>
import { toRefs, computed } from 'vue';
import {
  DropdownProps,
  DoptionValue,
  DropdownSlots,
  DropdownExpose,
} from './type';
import useContext from './hooks/useContext';
import YcTrigger from '@/components/Trigger';
import YcScrollbar from '@/components/Scrollbar';
defineOptions({
  name: 'Dropdown',
});
defineSlots<DropdownSlots>();
const props = withDefaults(defineProps<DropdownProps>(), {
  popupVisible: undefined,
  defaultPopupVisible: false,
  trigger: 'hover',
  position: 'bottom',
  popupContainer: undefined,
  hideOnSelect: true,
  triggerProps: () => {
    return {};
  },
  popupMaxHeight: 200,
  theme: 'light',
});
const emits = defineEmits<{
  (e: 'update:popupVisible', value: boolean): void;
  (e: 'popup-visible-change', value: boolean): void;
  (e: 'select', value: DoptionValue, ev: MouseEvent): void;
}>();
const { trigger, position: _position } = toRefs(props);
// 注入
const { provide } = useContext();
const { computedVisible } = provide(props, emits);
// 位置
const position = computed(() => {
  return ['top', 'tl', 'tr', 'bottom', 'bl', 'br'].includes(_position.value)
    ? _position.value
    : 'bottom';
});
defineExpose<DropdownExpose>({
  show() {
    computedVisible.value = true;
  },
  hide() {
    computedVisible.value = false;
  },
});
</script>

<style lang="less" scoped>
@import './style/dropdown.less';
</style>
