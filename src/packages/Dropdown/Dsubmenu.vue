<template>
  <yc-trigger
    :popup-offset="5"
    v-bind="$attrs"
    :popup-visible="popupVisible"
    :default-popup-visible="defaultPopupVisible"
    :trigger="trigger"
    :position="dropdownPotision"
    :content-style="{
      ...($attrs.contentStyle || {}),
      transformOrigin: TRANSFORM_ORIGIN_MAP[triggerPostion],
    }"
    :show-arrow="false"
    :click-outside-to-close="false"
    :update-at-scroll="false"
    auto-fit-popup-min-width
    ref="triggerRef"
    @popup-visible-change="
      (v) => {
        $emit('popup-visible-change', v);
        visible = v;
      }
    "
    @update:popup-visible="(v) => $emit('update:popupVisible', v)"
    @show="$emit('show')"
    @hide="$emit('hide')"
    @position-change="(v) => (triggerPostion = v)"
  >
    <YcDoption value="submenu" :disabled="disabled">
      <slot />
      <template #suffix>
        <svg-icon name="arrow-left" />
      </template>
    </YcDoption>
    <template #content>
      <div class="yc-dropdown yc-dropdown-submenu" ref="contentRef">
        <yc-scrollbar style="max-height: 200px; overflow: auto">
          <div class="yc-dropdown-list" @click="handleClick">
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
import { ref, inject, computed, toRefs } from 'vue';
import { TriggerPostion } from '@/packages/Trigger/type';
import { TRANSFORM_ORIGIN_MAP } from '@/packages/Trigger/constants';
import { Fn } from '@/packages/_type';
import { DsubmenuProps } from './type';
import { TriggerInstance } from '@/packages/Trigger';
import { onClickOutside } from '@vueuse/core';
import YcTrigger from '@/packages/Trigger/index.vue';
import YcScrollbar from '@/packages/Scrollbar/index.vue';
import YcDoption from './Doption.vue';
defineOptions({
  name: 'Dsubmenu',
});
const props = withDefaults(defineProps<DsubmenuProps>(), {
  popupVisible: undefined,
  defaultPopupVisible: false,
  trigger: 'click',
  position: 'rt',
  disabled: false,
});
const emits = defineEmits<{
  (e: 'update:popupVisible', value: boolean): void;
  (e: 'popup-visible-change', value: boolean): void;
  (e: 'show'): void;
  (e: 'hide'): void;
}>();
const { position } = toRefs(props);

// 位置
const dropdownPotision = computed(() => {
  if (!['rt', 'lt'].includes(position.value)) {
    return 'rt';
  }
  return position.value;
});
// 当前的位置
const triggerPostion = ref<TriggerPostion>('rt');
// 可见性
const visible = ref<boolean>(false);
// 触发器实例
const triggerRef = ref<TriggerInstance>();
// 内容实例
const contentRef = ref<HTMLDivElement>();
const findDoption = inject('findDoption') as Fn;
const isSubmenu = inject('isSubmenu') as Fn;
// 处理点击option
const handleClick = (e: MouseEvent) => {
  findDoption(e.target as HTMLElement);
};
onClickOutside(contentRef, (e) => {
  if (isSubmenu(e.target as HTMLElement) && !visible.value) {
    triggerRef.value?.show();
  } else {
    triggerRef.value?.hide();
  }
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
