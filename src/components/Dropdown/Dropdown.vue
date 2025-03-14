<template>
  <yc-trigger
    :popup-offset="4"
    :mouse-enter-delay="150"
    :mouse-leave-delay="150"
    v-bind="$attrs"
    :popup-visible="popupVisible"
    :default-popup-visible="defaultPopupVisible"
    :trigger="trigger"
    :position="submenuPosition"
    :content-style="{
      ...($attrs.contentStyle || {}),
      transformOrigin: TRANSFORM_ORIGIN_MAP[triggerPostion],
    }"
    :show-arrow="false"
    :click-out-side-ingore-fn="isSameGroup"
    :mouseenter-callback="
      (isTrigger) => {
        if (isTrigger) {
          curLevel = level;
        }
      }
    "
    animation-name="slide-dynamic-origin"
    auto-fit-popup-min-width
    ref="triggerRef"
    @popup-visible-change="(v) => $emit('popup-visible-change', v)"
    @update:popup-visible="(v) => $emit('update:popupVisible', v)"
    @show="$emit('show')"
    @hide="$emit('hide')"
    @position-change="(v) => (triggerPostion = v)"
  >
    <slot />
    <template #content>
      <div class="yc-dropdown" :data-group-id="groupId">
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
import { TriggerPostion } from '@/components/Trigger/type';
import { TRANSFORM_ORIGIN_MAP } from '@/components/Trigger/constants';
import { DROPDOWN_PROVIDE_KEY } from '@/components/_constants';
import { DropdownProps, DoptionValue, ProvideType } from './type';
import { TriggerInstance } from '@/components/Trigger';
import YcTrigger from '@/components/Trigger/index.vue';
import YcScrollbar from '@/components/Scrollbar/Scrollbar.vue';
import useTriggerNested from '@/components/_hooks/useTriggerNested';
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
  (e: 'show'): void;
  (e: 'hide'): void;
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
// 当前的位置
const triggerPostion = ref<TriggerPostion>('bottom');
// 处理嵌套关闭
const {
  isSameGroup,
  level,
  curLevel,
  groupId,
  groupIds,
  hideOnSelect: _hideOnSelect,
  emits: _emits,
  hide: _hide,
} = useTriggerNested(() => {
  if (trigger.value != 'hover') return;
  hide();
});
// 隐藏
const hide = () => {
  triggerRef.value?.hide();
};
// 提供值
provide<ProvideType>(DROPDOWN_PROVIDE_KEY, {
  level,
  curLevel,
  groupIds,
  hideOnSelect: _emits ? _hideOnSelect : hideOnSelect,
  emits: _emits ?? emits,
  hide: _emits ? _hide : hide,
});
</script>

<style lang="less" scoped>
@import './style/dropdown.less';
</style>
