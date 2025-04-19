<template>
  <yc-trigger
    v-model:popup-visible="computedVisible"
    :trigger="trigger"
    :position="position"
    :popup-offset="4"
    :disabled="disabled"
    :mouse-enter-delay="150"
    :mouse-leave-delay="150"
    :on-trigger-mouseenter="handleCalcStyle"
    :on-trigger-mouseclick="handleCalcStyle"
    need-transform-origin
    auto-set-position
    auto-fit-popup-min-width
    ref="triggerRef"
    v-bind="$attrs"
  >
    <yc-doption :disabled="disabled" is-submenu ref="optionRef">
      <slot />
      <template #suffix>
        <icon-arrow-right />
      </template>
    </yc-doption>
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
import { ref, computed, toRefs, nextTick } from 'vue';
import { IconArrowRight } from '@shared/icons';
import { useControlValue } from '@shared/hooks';
import { DSUBMENU_POSITION_MAP, DSUBMENU_TRIGGER_MAP } from '@shared/constants';
import { DsubmenuProps, DoptionInstance, Doption as YcDoption } from './index';
import YcTrigger, { TriggerInstance } from '@/components/Trigger';
import YcScrollbar from '@/components/Scrollbar';
defineOptions({
  name: 'Dsubmenu',
});
const props = withDefaults(defineProps<DsubmenuProps>(), {
  popupVisible: void 0,
  defaultPopupVisible: false,
  trigger: 'hover',
  position: 'rt',
  disabled: false,
});
const emits = defineEmits<{
  (e: 'update:popupVisible', value: boolean): void;
  (e: 'popup-visible-change', value: boolean): void;
}>();
const {
  defaultPopupVisible,
  popupVisible,
  trigger: _trigger,
  position: _position,
} = toRefs(props);
// option的实例
const optionRef = ref<DoptionInstance>();
// 触发器实例
const triggerRef = ref<TriggerInstance>();
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
  return DSUBMENU_POSITION_MAP[_position.value] || 'rt';
});
// 触发方式
const trigger = computed(() => {
  return DSUBMENU_TRIGGER_MAP[_trigger.value] || 'rt';
});
// 处理计算style
const handleCalcStyle = async () => {
  await nextTick();
  const dom = optionRef.value?.getOptionRef();
  if (!dom) return;
  const { left, top, right, width } = dom.getBoundingClientRect();
  const x = position.value == 'rt' ? right : left - width;
  const y = top - 5;
  triggerRef.value?.updatePosition(x, y);
};
</script>

<style lang="less" scoped>
@import './style/dropdown.less';
</style>
