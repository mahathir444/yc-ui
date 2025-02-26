<template>
  <Trigger
    :arrow-class="popoverArrowClass"
    :content-class="popoverContentClass"
    :class="['yc-popover', $attrs.class]"
  >
    <div>
      <slot></slot>
    </div>
    <template #content>
      <div class="yc-popover-title"></div>
      <div class="yc-popover-content">
        <slot name="content" />
      </div>
    </template>
  </Trigger>
  <!-- v-if="isMounted" -->
  <!-- <slot v-else /> -->
</template>

<script lang="ts" setup>
import { computed, toRefs, onMounted, onBeforeUnmount, ref } from 'vue';
import Trigger from '../Trigger/index.vue';
import { PopoverProps } from './type';
defineOptions({
  name: 'Popover',
});
const props = withDefaults(defineProps<PopoverProps>(), {
  popupVisible: undefined,
  defaultPopupVisible: false,
  trigger: 'hover',
  popupContainer: 'body',
  renderToBody: false,
  position: 'bottom',
  disabled: false,
  popupTranslate: undefined,
  showArrow: true,
  alignPoint: false,
  blurToClose: true,
  clickOutsidetoClose: true,
  clickToClose: true,
  unmountOnClose: false,
  contentStyle: () => {
    return {};
  },
  arrowStyle: () => {
    return {};
  },
  animationName: 'fade-in',
  duration: 400,
  mouseEnterDelay: 1000,
  mouseLeaveDelay: 100,
  focusDelay: 100,
  autoFitPopupWidth: false,
  autoFitPopupMinWidth: false,
  title: '',
  content: '',
});
const emits = defineEmits<{
  (e: 'update:popupVisible', value: boolean): void;
}>();
const { arrowClass, contentClass } = toRefs(props);
//是否是加载好
const isMounted = ref<boolean>(false);
// popover-arrow-class
const popoverArrowClass = computed(() =>
  [arrowClass.value, 'yc-popover-popup-arrow'].map((item) => item).join(' ')
);
// popover-content-class
const popoverContentClass = computed(() =>
  [contentClass.value, 'yc-popover-popup-content'].map((item) => item).join(' ')
);

onMounted(() => {
  setTimeout(() => {
    isMounted.value = true;
  }, 100);
});
onBeforeUnmount(() => {
  isMounted.value = false;
});
</script>

<style lang="less" scoped>
.yc-popover {
  .yc-popover-popup-content {
    padding: 12px 16px;
    color: rgb(78, 89, 105);
    font-size: 14px;
    line-height: 1.5715;
    background-color: #fff;
    border: 1px solid rgb(229, 230, 235);
    border-radius: 4px;
    box-shadow: 0 4px 10px #0000001a;
  }
  .yc-popover-popup-arrow {
    border: 1px solid rgb(229, 230, 235);
  }
}
</style>
