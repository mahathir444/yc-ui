<template>
  <yc-trigger
    :popup-visible="popupVisible"
    :default-popup-visible="defaultPopupVisible"
    :trigger="trigger"
    :position="position"
    :popup-offset="4"
    :mouse-enter-delay="150"
    :mouse-leave-delay="150"
    :alignPoint="alignPoint"
    :auto-fit-popup-min-width="
      !alignPoint && ['top', 'bottom'].includes(position)
    "
    :class="['yc-dropdown-popup', , `yc-dropdown-theme-${theme}`]"
    animation-name="slide-dynamic-origin"
    need-transform-origin
    ref="triggerRef"
    v-bind="triggerProps"
    @update:popup-visible="(v) => $emit('update:popupVisible', v)"
    @popup-visible-change="(v) => $emit('popup-visible-change', v)"
  >
    <slot />
    <template #content>
      <div class="yc-dropdown">
        <yc-scrollbar
          :style="{
            maxHeight: popupMaxHeight,
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
import { ref, toRefs, computed } from 'vue';
import {
  DropdownProps,
  DoptionValue,
  DropdownSlots,
  DropdownExpose,
} from './type';
import { isUndefined, isBoolean, numberToPx } from '@shared/utils';
import useContext from './hooks/useContext';
import { default as YcTrigger, TriggerInstance } from '@/components/Trigger';
import YcScrollbar from '@/components/Scrollbar';
defineOptions({
  name: 'Dropdown',
});
defineSlots<DropdownSlots>();
const props = withDefaults(defineProps<DropdownProps>(), {
  popupVisible: undefined,
  defaultPopupVisible: false,
  trigger: 'click',
  position: 'bottom',
  popupContainer: undefined,
  hideOnSelect: true,
  triggerProps: () => {
    return {};
  },
  alignPoint: false,
  popupMaxHeight: 200,
  theme: 'light',
});
const emits = defineEmits<{
  (e: 'update:popupVisible', value: boolean): void;
  (e: 'popup-visible-change', value: boolean): void;
  (e: 'select', value: DoptionValue, ev: MouseEvent): void;
}>();
const {
  trigger,
  position: _position,
  popupMaxHeight: _popupMaxHeight,
} = toRefs(props);
// 触发器实例
const triggerRef = ref<TriggerInstance>();
// 注入
useContext().provide(props, emits, triggerRef);
// 位置
const position = computed(() => {
  return ['top', 'tl', 'tr', 'bottom', 'bl', 'br'].includes(_position.value)
    ? _position.value
    : 'bottom';
});
// pop
const popupMaxHeight = computed(() => {
  if (
    (isBoolean(_popupMaxHeight.value) && !_popupMaxHeight.value) ||
    isUndefined(_popupMaxHeight)
  ) {
    return '';
  }
  return numberToPx(
    isBoolean(_popupMaxHeight.value) ? 200 : _popupMaxHeight.value
  );
});
defineExpose<DropdownExpose>({
  show() {
    triggerRef.value?.show();
  },
  hide() {
    triggerRef.value?.hide();
  },
});
</script>

<style lang="less">
@import './style/dropdown.less';
</style>
