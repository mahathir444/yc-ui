<template>
  <transition name="fade">
    <div
      v-show="curScroll >= visibleHeight"
      class="yc-back-top"
      @click="handleTop"
    >
      <slot>
        <yc-button type="primary" shape="circle" size="large">
          <icon-to-top />
        </yc-button>
      </slot>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { ref, toRefs, onMounted } from 'vue';
import { BackTopProps } from './type';
import { IconToTop } from '@shared/icons';
import { isObject, isString } from '@shared/utils/is';
import BTween from 'b-tween';
import YcButton from '@/components/Button';
defineOptions({
  name: 'BackTop',
});
const props = withDefaults(defineProps<BackTopProps>(), {
  visibleHeight: 200,
  easeing: 'quadOut',
  duration: 200,
});
const { targetContainer, easeing, duration } = toRefs(props);
// 当前的滚动
const curScroll = ref<number>(0);
// 目标
let target: HTMLElement | null = null;
// 处理回到顶部
const handleTop = () => {
  if (!target) return;
  new BTween({
    from: { scroll: target.scrollTop },
    to: { scroll: 0 },
    duration: duration.value,
    easing: easeing.value,
    onUpdate: (current: any) => {
      target!.scrollTop = current.scroll;
    },
  }).start();
};
onMounted(() => {
  if (isString(targetContainer.value)) {
    target = document.querySelector(targetContainer.value);
  } else if (isObject(targetContainer.value)) {
    target = targetContainer.value;
  }
  if (!target) return;
  (target as HTMLDivElement).addEventListener('scroll', () => {
    curScroll.value = target!.scrollTop;
  });
});
</script>

<style lang="less" scoped>
@import './style/back-top.less';
</style>
