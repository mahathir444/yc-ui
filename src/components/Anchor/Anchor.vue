<template>
  <div class="yc-anchor">
    <div v-if="!lineLess" class="yc-anchor-line-track">
      <div
        class="yc-anchor-line-slider"
        :style="{
          top: `${top}px`,
        }"
      ></div>
    </div>
    <div class="yc-anchor-list" ref="listRef">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, toRefs, provide } from 'vue';
import { AnchorProps, AnchorSlot, AnchorProvide } from './type';
import { ANCHOR_PROVIDE_KEY } from '@shared/constants';
import {
  getElement,
  findFirstScrollableParent,
  isUndefined,
} from '@shared/utils';
defineOptions({
  name: 'Anchor',
});
defineSlots<AnchorSlot>();
const props = withDefaults(defineProps<AnchorProps>(), {
  boundary: 'start',
  lineLess: false,
  scrollContainer: undefined,
  changeHash: true,
  smooth: true,
});
const {
  changeHash,
  smooth,
  boundary,
  lineLess,
  scrollContainer: _scrollContainer,
} = toRefs(props);
// 获取listRef
const listRef = ref<HTMLDivElement>();
// listRef
const linkRefs = ref<HTMLDivElement[]>([]);
// 当前的link
const curHref = ref<string>('');
// hrefs
const hrefs = ref<string[]>([]);
// order次序
const order = ref<number>(0);
// 计算top
const top = computed(() => {
  const curIndex = hrefs.value.findIndex((item) => item == curHref.value);
  const offset = linkRefs.value
    .slice(0, curIndex + 1)
    .map((item) => item.offsetHeight)
    .reduce((pre, cur, index) => {
      if (index == curIndex) {
        return pre + (cur - 12) / 2;
      } else {
        return pre + cur;
      }
    }, 0);
  console.log(offset, 'offset');
  return offset + curIndex * 2;
});
// 滚动容器
const scrollContainer = computed(() => {
  return isUndefined(_scrollContainer.value)
    ? findFirstScrollableParent(listRef.value)
    : getElement(_scrollContainer.value);
});
// 提供属性
provide<AnchorProvide>(ANCHOR_PROVIDE_KEY, {
  hrefs,
  order,
  changeHash,
  smooth,
  boundary,
  lineLess,
  curHref,
  scrollContainer,
});

onMounted(() => {
  if (!hrefs.value.length) return;
  curHref.value = hrefs.value[0];
  linkRefs.value = [
    ...(listRef.value!.querySelectorAll(
      '.yc-anchor-link'
    ) as NodeListOf<HTMLDivElement>),
  ];
});
</script>

<style lang="less" scoped>
@import './style/anchor.less';
</style>
