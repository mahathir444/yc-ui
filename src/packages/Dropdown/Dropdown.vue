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
    :click-out-side-ingore-fn="(e) => isOption(e, flags)"
    :click-outside-callback="clickOutsideCb"
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
      <div class="yc-dropdown" :flag="flag">
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
  inject,
} from 'vue';
import { TriggerPostion } from '@/packages/Trigger/type';
import { TRANSFORM_ORIGIN_MAP } from '@/packages/Trigger/constants';
import { DropdownProps, DoptionValue } from './type';
import { nanoid } from 'nanoid';
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
// 记录组件内部嵌套的层级,当curLevel小于level关闭
const level = 0;
const curLevel = ref<number>(0);
provide('level', level);
provide('curLevel', curLevel);
// 组件标识，用于标识submenu是否处于一个嵌套中
const flag = nanoid(32);
const flags = ref<string[]>([flag]);
provide('flags', flags);
// 是否是option
const isOption = (e: any, flags: string[]) => {
  const el = (e.target ?? e) as HTMLDivElement;
  if (el.tagName == 'BODY') {
    return false;
  } else if (flags.includes(el.getAttribute('flag') as string)) {
    return true;
  } else {
    return isOption(el.parentElement as HTMLDivElement, flags);
  }
};
provide('isOption', isOption);
// 处理点击到外面
const clickOutsideCb = (visible: WritableComputedRef<boolean>, e: any) => {
  if (isOption(e, flags.value)) return;
  visible.value = false;
};
// 检测层级的改变自动关闭
watch(curLevel, (v) => {
  if (v >= level || trigger.value != 'hover') return;
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
