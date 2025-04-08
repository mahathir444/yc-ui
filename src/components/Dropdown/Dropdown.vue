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
    v-bind="$attrs"
  >
    <slot />
    <template #content>
      <div class="yc-dropdown">
        <yc-scrollbar style="max-height: 200px">
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
import { provide, toRefs, computed } from 'vue';
import { DropdownProps, DoptionValue, DropdownProvide } from './type';
import { DROPDOWN_PROVIDE_KEY } from '@shared/constants';
import { DROPDOWN_POSITION_MAP } from './constants';
import useControlValue from '@shared/hooks/useControlValue';
import YcTrigger from '@/components/Trigger';
import YcScrollbar from '@/components/Scrollbar';

defineOptions({
  name: 'Dropdown',
});
const props = withDefaults(defineProps<DropdownProps>(), {
  popupVisible: undefined,
  defaultPopupVisible: false,
  trigger: 'hover',
  position: 'bottom',
  popupContainer: 'body',
  hideOnSelect: true,
});
const emits = defineEmits<{
  (e: 'update:popupVisible', value: boolean): void;
  (e: 'popup-visible-change', value: boolean): void;
  (e: 'select', value: DoptionValue, ev: MouseEvent): void;
}>();
const {
  popupVisible,
  defaultPopupVisible,
  position: _position,
  trigger,
  hideOnSelect,
} = toRefs(props);
// 受控的visible
const computedVisible = useControlValue<boolean>(
  popupVisible,
  defaultPopupVisible.value,
  (val) => {
    emits('update:popupVisible', val);
    emits('popup-visible-change', val);
  }
);
// 位置
const position = computed(() => {
  return DROPDOWN_POSITION_MAP[_position.value] || 'bottom';
});
// dropdown提供的值
provide<DropdownProvide>(DROPDOWN_PROVIDE_KEY, {
  select: (value: DoptionValue, ev: MouseEvent) => {
    emits('select', value, ev);
    if (!hideOnSelect.value) return;
    computedVisible.value = false;
  },
});
</script>

<style lang="less" scoped>
@import './style/dropdown.less';
</style>
