<template>
  <YcDoption
    :disabled="disabled"
    value="submenu"
    ref="doptionRef"
    @click="handleClick"
    @mouseenter="handleMouseenter"
    @mouseleave="handleMouseleave"
  >
    <slot />
    <template #suffix>
      <svg-icon name="arrow-left" />
    </template>
  </YcDoption>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="computedVisible && !disabled"
        class="yc-dropdown-submenu"
        :style="contentStyle"
        ref="contentRef"
      >
        <yc-scrollbar style="max-height: 200px; overflow: auto">
          <div class="yc-dropdown-list" @click="handleSelect">
            <slot name="content" />
          </div>
        </yc-scrollbar>
        <div v-if="$slots.footer" class="yc-dropdown-footer">
          <slot name="footer" />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts" setup>
import { ref, inject, computed, toRefs, CSSProperties, nextTick } from 'vue';
import { Fn } from '@/packages/_type';
import { isUndefined } from '@/packages/_utils/is';
import { DsubmenuProps } from './type';
import YcScrollbar from '@/packages/Scrollbar/index.vue';

import YcDoption from './Doption.vue';
defineOptions({
  name: 'Dsubmenu',
});
const props = withDefaults(defineProps<DsubmenuProps>(), {
  popupVisible: undefined,
  defaultPopupVisible: false,
  trigger: 'click',
  position: 'lt',
  disabled: false,
});
const emits = defineEmits<{
  (e: 'update:popupVisible', value: boolean): void;
  (e: 'popup-visible-change', value: boolean): void;
  (e: 'show'): void;
  (e: 'hide'): void;
}>();
const { position, defaultPopupVisible, popupVisible, trigger } = toRefs(props);
// 受控的visible
const controlVisible = ref<boolean>(defaultPopupVisible.value);
// visible
const computedVisible = computed({
  get() {
    return !isUndefined(popupVisible.value)
      ? popupVisible.value
      : controlVisible.value;
  },
  set(val) {
    if (!isUndefined(popupVisible.value)) {
      emits('update:popupVisible', val);
    } else {
      controlVisible.value = val;
    }
  },
});
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
// 查找option的函数
const findDoption = inject('findDoption') as Fn;
// 处理选择option
const handleSelect = (e: MouseEvent) => {
  findDoption(e.target as HTMLElement);
};
// 处理计算style
const handleCalcStyle = () => {
  const {
    left: offsetLeft,
    top: offsetTop,
    right: offsetRight,
    width,
  } = doptionRef.value!.getRef().getBoundingClientRect();
  if (menuPotision.value == 'rt') {
    contentStyle.value = {
      left: `${offsetRight + 5}px`,
      top: `${offsetTop - 5}px`,
      minWidth: `${width}px`,
    };
  } else {
    contentStyle.value = {
      left: `${offsetLeft - width - 5}px`,
      top: `${offsetTop - 5}px`,
      minWidth: `${width}px`,
    };
  }
};
// 计时器用于异步处理
let timer: NodeJS.Timeout;
// 鼠标进入
const handleMouseenter = async () => {
  if (timer) clearTimeout(timer);
  if (menuTrigger.value != 'hover' || computedVisible.value) return;
  timer = setTimeout(() => {
    computedVisible.value = true;
    handleCalcStyle();
  }, 100);
};
// 鼠标离开
const handleMouseleave = () => {
  if (timer) clearTimeout(timer);
  if (menuTrigger.value != 'hover' || !computedVisible.value) return;
  timer = setTimeout(() => {
    computedVisible.value = false;
  }, 100);
};
//  点击
const handleClick = async () => {
  if (menuTrigger.value != 'click') return;
  computedVisible.value = !computedVisible.value;
  await nextTick();
  handleCalcStyle();
};
</script>

<style lang="less">
.yc-dropdown-submenu {
  position: absolute;
  z-index: 1002;
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
