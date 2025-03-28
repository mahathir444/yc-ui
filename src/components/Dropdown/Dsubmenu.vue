<template>
  <yc-trigger
    v-model:popup-visible="computedVisible"
    :trigger="menuTrigger"
    :position="menuPotision"
    :disabled="disabled"
    :mouse-enter-delay="150"
    :mouse-leave-delay="150"
    :show-arrow="false"
    :popup-offset="4"
    :on-mouse-enter="handleCalcStyle"
    :on-mouse-click="handleCalcStyle"
    auto-set-position
    auto-fit-popup-min-width
    ref="triggerRef"
    v-bind="$attrs"
    @popup-visible-change="(v) => $emit('popup-visible-change', v)"
  >
    <yc-doption :disabled="disabled" is-submenu value="" ref="optionRef">
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
import { DsubmenuProps } from './type';
import { IconArrowRight } from '@shared/icons';
import useControlValue from '@shared/hooks/useControlValue';
import { DoptionInstance } from './index';
import YcTrigger, { TriggerInstance } from '@/components/Trigger';
import YcDoption from './Doption.vue';
import YcScrollbar from '@/components/Scrollbar';

defineOptions({
  name: 'Dsubmenu',
});
const props = withDefaults(defineProps<DsubmenuProps>(), {
  popupVisible: undefined,
  defaultPopupVisible: false,
  trigger: 'hover',
  position: 'rt',
  disabled: false,
});
const emits = defineEmits<{
  (e: 'update:popupVisible', value: boolean): void;
  (e: 'popup-visible-change', value: boolean): void;
}>();
const { position, defaultPopupVisible, popupVisible, trigger } = toRefs(props);
// 受控的visible
const computedVisible = useControlValue<boolean>(
  popupVisible,
  defaultPopupVisible.value,
  (val) => emits('update:popupVisible', val)
);
// 位置
const menuPotision = computed(() => {
  if (!['rt', 'lt'].includes(position.value)) {
    return 'rt';
  }
  return position.value;
});
// 触发方式
const menuTrigger = computed(() => {
  if (!['click', 'hover'].includes(trigger.value)) {
    return 'hover';
  }
  return trigger.value;
});
// option的实例
const optionRef = ref<DoptionInstance>();
// 触发器实例
const triggerRef = ref<TriggerInstance>();
// 处理计算style
const handleCalcStyle = async () => {
  await nextTick();
  const dom = optionRef.value?.getRef();
  if (!dom) return;
  const {
    left: offsetLeft,
    top: offsetTop,
    right: offsetRight,
    width,
  } = dom.getBoundingClientRect();
  const x = menuPotision.value == 'rt' ? offsetRight : offsetLeft - width;
  const y = offsetTop - 5;
  triggerRef.value?.updatePosition(x, y);
};
</script>

<style lang="less" scoped>
@import './style/dropdown.less';
</style>
