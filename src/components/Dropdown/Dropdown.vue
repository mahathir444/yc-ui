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
        <yc-scrollbar style="max-height: 200px; overflow: auto">
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
import { ref, provide, toRefs, computed, watch } from 'vue';
import { TriggerPostion } from '@/components/Trigger/type';
import { TRANSFORM_ORIGIN_MAP } from '@/components/Trigger/constants';
import { DropdownProps, DoptionValue } from './type';
import { TriggerInstance } from '@/components/Trigger';
import YcTrigger from '@/components/Trigger/index.vue';
import YcScrollbar from '@/components/Scrollbar/Scrollbar.vue';
import useTriggerLevel from '@/components/_hooks/useTriggerLevel';
defineOptions({
  name: 'Dropdown',
});
const props = withDefaults(defineProps<DropdownProps>(), {
  popupVisible: undefined,
  defaultPopupVisible: false,
  trigger: 'click',
  position: 'bottom',
  popupContainer: 'body',
  hideOnSelect: false,
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
// dropdown属性
provide('emits', emits);
provide('hideOnSelect', hideOnSelect);
provide('hide', () => {
  triggerRef.value?.hide();
});
// 处理嵌套关闭
const { isSameGroup, level, curLevel, groupId } = useTriggerLevel(() => {
  if (trigger.value != 'hover') return;
  triggerRef.value?.hide();
});
</script>

<style lang="less" scoped>
@import './style/dropdown.less';
</style>
