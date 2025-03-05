<template>
  <yc-trigger
    :popup-offset="5"
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
    :click-out-side-ingore-fn="isSubmenu"
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
          <div class="yc-dropdown-list" @click="handleSelect">
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
  trigger: 'click',
  position: 'bottom',
  popupContainer: 'body',
  hideOnSelect: true,
});
const emits = defineEmits<{
  (e: 'update:popupVisible', value: boolean): void;
  (e: 'popup-visible-change', value: boolean): void;
  (e: 'show'): void;
  (e: 'hide'): void;
  (e: 'select', value: DoptionValue): void;
}>();
const { hideOnSelect, position } = toRefs(props);
// 位置
const submenuPosition = computed(() => {
  if (!['top', 'tl', 'tr', 'bottom', 'bl', 'br'].includes(position.value)) {
    return 'bottom';
  }
  return position.value;
});
// 当前的位置
const triggerPostion = ref<TriggerPostion>('bottom');
// 触发器实例
const triggerRef = ref<TriggerInstance>();
// 是否是子菜单
const isSubmenu = (e: any) => {
  const el = (e.target ? e.target : e) as HTMLElement;
  if (el.tagName == 'BODY' || el.classList.contains('yc-dropdown-list')) {
    return false;
  } else if (el.classList.contains('yc-dropdown-option-has-suffix')) {
    return true;
  } else {
    return isSubmenu(el.parentElement as HTMLElement);
  }
};
// 查找选项
const findDoption = (el: HTMLElement): boolean => {
  const classList = el.classList;
  if (
    classList?.contains('yc-dropdown-option-has-suffix') ||
    classList.contains('yc-dropdown-option-disabled') ||
    classList?.contains('yc-dropdown-group-title') ||
    classList?.contains('yc-dropdown-list')
  ) {
    return false;
  } else if (classList?.contains('yc-dropdown-option')) {
    const dataOption = el.getAttribute('data-doption') as string;
    if (!dataOption) {
      return false;
    }
    emits('select', JSON.parse(dataOption).value);
    return true;
  } else {
    return findDoption(el.parentNode as HTMLElement);
  }
};
// 提供给submenu使用
provide('findDoption', findDoption);
// 处理选项点击
const handleSelect = (e: MouseEvent) => {
  const isClose = findDoption(e.target as HTMLElement);
  if (hideOnSelect.value && isClose) {
    triggerRef.value?.hide();
  }
};
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
