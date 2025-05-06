<template>
  <yc-trigger
    v-model:popup-visible="computedVisible"
    :trigger="trigger"
    :position="position"
    :popup-offset="4"
    :disabled="disabled"
    :mouse-enter-delay="150"
    :mouse-leave-delay="150"
    need-transform-origin
    auto-fit-popup-min-width
    v-bind="triggerProps"
  >
    <yc-doption :disabled="disabled" is-submenu ref="optionRef">
      <slot />
      <template #suffix>
        <icon-arrow-right />
      </template>
    </yc-doption>
    <template #content>
      <div class="yc-dropdown">
        <yc-scrollbar
          :style="{
            maxHeight: popupMaxHeight + 'px',
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
import { ref, computed, toRefs } from 'vue';
import { IconArrowRight } from '@shared/icons';
import { useControlValue } from '@shared/hooks';
import { DSUBMENU_POSITION_MAP, DSUBMENU_TRIGGER_MAP } from '@shared/constants';
import {
  DsubmenuProps,
  DsubmenuEmits,
  DoptionInstance,
  Doption as YcDoption,
} from './index';
import YcTrigger from '@/components/Trigger';
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
  triggerProps: () => {
    return {};
  },
  popupMaxHeight: 200,
});
const emits = defineEmits<DsubmenuEmits>();
const {
  defaultPopupVisible,
  popupVisible,
  trigger: _trigger,
  position: _position,
} = toRefs(props);
// option的实例
const optionRef = ref<DoptionInstance>();
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
</script>

<style lang="less" scoped>
@import './style/dropdown.less';
</style>
