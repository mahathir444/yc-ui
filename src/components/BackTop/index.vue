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
import { ref, toRefs, onMounted, onBeforeUnmount } from 'vue';
import { BackTopProps } from './type';
import { IconToTop } from '@shared/icons';
import { getElement } from '@shared/utils/dom';
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
const { targetContainer: _targetContainer, easeing, duration } = toRefs(props);
// 当前的滚动
const curScroll = ref<number>(0);
// 目标
const target = ref<HTMLElement>();
// 处理滚动
const handleScroll = () => {
  curScroll.value = target.value!.scrollTop;
};
// 处理回到顶部
const handleTop = () => {
  if (!target.value) return;
  new BTween({
    from: { scroll: target.value.scrollTop },
    to: { scroll: 0 },
    duration: duration.value,
    easing: easeing.value,
    onUpdate: (current: any) => {
      target.value!.scrollTop = current.scroll;
    },
  }).start();
};
onMounted(() => {
  target.value = getElement(_targetContainer.value) as HTMLElement;
  target.value?.addEventListener('scroll', handleScroll);
});
onBeforeUnmount(() => {
  target.value?.removeEventListener('scroll', handleScroll);
});
</script>

<style lang="less" scoped>
@import './style/back-top.less';
</style>
