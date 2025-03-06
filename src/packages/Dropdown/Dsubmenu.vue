<template>
  <YcDoption
    :disabled="disabled"
    is-submenu
    value=""
    ref="doptionRef"
    @click="handleClick"
    @mouseenter="handleMouseenter(true)"
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
        @mouseenter="handleMouseenter(false)"
        @mouseleave="handleMouseleave"
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
    </Transition>
  </Teleport>
</template>

<script lang="ts" setup>
import {
  ref,
  inject,
  computed,
  toRefs,
  CSSProperties,
  nextTick,
  Ref,
  provide,
} from 'vue';
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
  position: 'rt',
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
const isOption = inject('isOption') as Fn;
const hide = inject('hide') as Fn;
const timeout = inject('timeout') as Ref<NodeJS.Timeout>;
const level = inject('level', 1);
provide('level', level + 1);
// 鼠标进入
const handleMouseenter = async (isTrigger: boolean) => {
  if (isTrigger) {
    console.log('level', level);
  }
  if (timeout.value) {
    clearTimeout(timeout.value);
  }
  if (menuTrigger.value != 'hover' || computedVisible.value) {
    return;
  }
  timeout.value = setTimeout(async () => {
    computedVisible.value = true;
    await nextTick();
    handleCalcStyle();
  }, 100);
};
// 鼠标离开
const handleMouseleave = (e: MouseEvent) => {
  const { relatedTarget } = e;
  if (timeout.value) {
    clearTimeout(timeout.value);
  }
  if (menuTrigger.value != 'hover' || !computedVisible.value) {
    return;
  }
  timeout.value = setTimeout(() => {
    if (isOption(relatedTarget)) {
      computedVisible.value = false;
    } else {
      hide();
    }
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
