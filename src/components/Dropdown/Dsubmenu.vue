<template>
  <yc-doption
    :disabled="disabled"
    is-submenu
    value=""
    ref="doptionRef"
    @click="handleClick"
    @mouseenter="handleMouseenter"
    @mouseleave="handleMouseleave($event)"
  >
    <slot />
    <template #suffix>
      <svg-icon name="arrow-right" />
    </template>
  </yc-doption>
  <teleport to="body">
    <transition name="fade">
      <div
        v-if="computedVisible && !disabled"
        class="yc-dropdown-submenu"
        :data-group-id="groupId"
        :style="contentStyle"
        ref="contentRef"
        @mouseenter="handleMouseenter"
        @mouseleave="handleMouseleave($event)"
      >
        <yc-scrollbar style="max-height: 200px; overflow: auto">
          <div class="yc-dropdown-list">
            <slot name="content" />
          </div>
        </yc-scrollbar>
        <div v-if="$slots.footer" class="yc-dropdown-footer">
          <slot name="footer" />
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts" setup>
import { ref, inject, computed, toRefs, CSSProperties, nextTick } from 'vue';
import { Fn } from '@/components/_type';
import { DsubmenuProps } from './type';
import YcScrollbar from '@/components/Scrollbar/Scrollbar.vue';
import YcDoption from './Doption.vue';
import useTriggerLevel from '@/components/_hooks/useTriggerLevel';
import useControlValue from '../_hooks/useControlValue';
defineOptions({
  name: 'Dsubmenu',
});
const props = withDefaults(defineProps<DsubmenuProps>(), {
  popupVisible: undefined,
  defaultPopupVisible: false,
  trigger: 'hover',
  position: 'rt',
  disabled: false,
  mouseEnterDelay: 150,
  mouseLeaveDelay: 150,
});
const emits = defineEmits<{
  (e: 'update:popupVisible', value: boolean): void;
  (e: 'popup-visible-change', value: boolean): void;
  (e: 'show'): void;
  (e: 'hide'): void;
}>();
const {
  position,
  defaultPopupVisible,
  popupVisible,
  trigger,
  mouseEnterDelay,
  mouseLeaveDelay,
} = toRefs(props);
// 受控的visible
const computedVisible = useControlValue<boolean>(
  popupVisible,
  defaultPopupVisible.value,
  (val) => emits('update:popupVisible', val)
);
// contentStyle
const contentStyle = ref<CSSProperties>({
  left: 0,
  top: 0,
  width: 0,
});
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
const doptionRef = ref<InstanceType<typeof YcDoption>>();
// content的实例
const contentRef = ref<HTMLDivElement>();
// 处理计算style
const handleCalcStyle = () => {
  const dom = doptionRef.value?.getRef();
  if (!dom) return;
  const {
    left: offsetLeft,
    top: offsetTop,
    right: offsetRight,
    width,
  } = dom.getBoundingClientRect();
  if (menuPotision.value == 'rt') {
    contentStyle.value = {
      left: `${offsetRight + 4}px`,
      top: `${offsetTop - 5}px`,
      minWidth: `${width}px`,
    };
  } else {
    contentStyle.value = {
      left: `${offsetLeft - width - 4}px`,
      top: `${offsetTop - 5}px`,
      minWidth: `${width}px`,
    };
  }
};
// 处理嵌套关闭
const { isSameGroup, groupId } = useTriggerLevel(() => {
  if (menuTrigger.value != 'hover') return;
  computedVisible.value = false;
});
// 关闭函数
const hide = inject('hide') as Fn;
// 标识用于取消
const timeout = inject('timeout', ref<NodeJS.Timeout>());
// 鼠标进入
const handleMouseenter = async () => {
  if (timeout.value) clearTimeout(timeout.value);
  if (menuTrigger.value != 'hover' || computedVisible.value) return;
  timeout.value = setTimeout(async () => {
    computedVisible.value = true;
    await nextTick();
    handleCalcStyle();
  }, mouseEnterDelay.value);
};
// 鼠标离开
const handleMouseleave = (e: MouseEvent) => {
  if (timeout.value) clearTimeout(timeout.value);
  if (menuTrigger.value != 'hover' || !computedVisible.value) return;
  timeout.value = setTimeout(() => {
    console.log(isSameGroup(e.relatedTarget as HTMLDivElement), 'isSame');
    if (isSameGroup(e.relatedTarget as HTMLDivElement)) {
      computedVisible.value = false;
    } else {
      hide();
    }
  }, mouseLeaveDelay.value);
};
//  点击
const handleClick = async () => {
  if (menuTrigger.value != 'click') return;
  computedVisible.value = !computedVisible.value;
  await nextTick();
  handleCalcStyle();
};
</script>

<style lang="less" scoped>
@import './style/dsubmenu.less';
</style>
