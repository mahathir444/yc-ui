<template>
  <yc-trigger
    :popup-offset="4"
    :mouse-enter-delay="150"
    :mouse-leave-delay="150"
    :popup-visible="popupVisible"
    :default-popup-visible="defaultPopupVisible"
    :trigger="trigger"
    :position="submenuPosition"
    :show-arrow="false"
    animation-name="slide-dynamic-origin"
    auto-fit-popup-min-width
    need-transform-origin
    is-dropdown
    ref="triggerRef"
    v-bind="$attrs"
    @popup-visible-change="(v) => $emit('popup-visible-change', v)"
    @update:popup-visible="(v) => $emit('update:popupVisible', v)"
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
import { ref, provide, toRefs, computed } from 'vue';
import { DropdownProps, DoptionValue, ProvideType } from './type';
import { DROPDOWN_PROVIDE_KEY } from '@/components/_/constants';
import YcTrigger, { TriggerInstance } from '@/components/Trigger';
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
const { hideOnSelect, position, trigger } = toRefs(props);
// 触发器实例
const triggerRef = ref<TriggerInstance>();
// 位置
const submenuPosition = computed(() => {
  if (!['top', 'tl', 'tr', 'bottom', 'bl', 'br'].includes(position.value)) {
    return 'bottom';
  }
  return position.value;
});
// dropdown提供的值
provide<ProvideType>(DROPDOWN_PROVIDE_KEY, {
  hideOnSelect,
  emits,
  hide: () => {
    triggerRef.value?.hide();
  },
});
</script>

<style lang="less" scoped>
@import './style/dropdown.less';
</style>
