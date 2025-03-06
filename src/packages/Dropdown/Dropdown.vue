<template>
  <yc-trigger
    :popup-offset="4"
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
    :click-out-side-ingore-fn="isOption"
    :click-outside-callback="clickOutsideCb"
    :mouseenter-callback="mouseenterCallback"
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
      <div class="yc-dropdown">
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
import {
  ref,
  provide,
  toRefs,
  computed,
  WritableComputedRef,
  watch,
} from 'vue';
import { TriggerPostion } from '@/packages/Trigger/type';
import { TRANSFORM_ORIGIN_MAP } from '@/packages/Trigger/constants';
import { DropdownProps, DoptionValue } from './type';
import { TriggerInstance } from '@/packages/Trigger';
import YcTrigger from '@/packages/Trigger/index.vue';
import YcScrollbar from '@/packages/Scrollbar/index.vue';
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
const { hideOnSelect, position } = toRefs(props);

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
// 记录组件内部嵌套的层级,当curLevel小于level关闭
const level = 0;
const curLevel = ref<number>(0);
provide('emits', emits);
provide('hideOnSelect', hideOnSelect);
provide('level', level);
provide('curLevel', curLevel);
// 是否是option
const isOption = (e: any) => {
  const el = e.target ?? e;
  if (el.tagName == 'BODY') {
    return false;
  } else if (
    el.classList.contains('yc-dropdown') ||
    el.classList.contains('yc-dropdown-submenu')
  ) {
    return true;
  } else {
    return isOption(el.parentElement as HTMLDivElement);
  }
};
provide('isOption', isOption);
// 处理点击到外面
const clickOutsideCb = (visible: WritableComputedRef<boolean>, e: any) => {
  if (isOption(e)) return;
  visible.value = false;
};
// 鼠标enter进入的回调
const mouseenterCallback = () => {
  curLevel.value = 0;
};
// 检测层级的改变自动关闭
watch(curLevel, (v) => {
  if (v >= level) return;
  triggerRef.value?.hide();
});
</script>

<style lang="less">
.yc-dropdown {
  padding: 4px 0;
  background-color: #fff;
  border: 1px solid rgb(229, 230, 235);
  border-radius: 4px;
  box-shadow: 0 4px 10px #0000001a;
  .yc-dropdown-list {
    display: flex;
    flex-direction: column;
  }
  .yc-dropdown-footer {
    border-top: 1px solid rgb(229, 230, 235);
  }
}
</style>
