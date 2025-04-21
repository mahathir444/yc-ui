<template>
  <div
    :class="{
      'yc-anchor-link-item': true,
      'yc-anchor-link-active': curHref == href && !lineLess,
      'yc-anchor-link-lineless-active': curHref == href && lineLess,
    }"
  >
    <a :href="href" class="yc-anchor-link" @click="handleClick" ref="linkRef">
      <slot>
        {{ title }}
      </slot>
    </a>
    <div v-if="$slots.sublist" class="yc-anchor-sublist">
      <slot name="sublist" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs, inject } from 'vue';
import { isNumber } from '@shared/utils';
import { AnchorLinkProps } from './type';
import { ANCHOR_PROVIDE_KEY } from '@shared/constants';
defineOptions({
  name: 'AnchorLink',
});
const props = withDefaults(defineProps<AnchorLinkProps>(), {
  title: '',
  href: '',
});
const { href } = toRefs(props);
// 获取属性
const {
  smooth,
  boundary,
  changeHash,
  curHref,
  hrefs,
  order,
  lineLess,
  scrollContainer,
} = inject(ANCHOR_PROVIDE_KEY, {
  hrefs: ref<string[]>([]),
  order: ref(0),
  changeHash: ref(true),
  smooth: ref(true),
  boundary: ref('start'),
  curHref: ref(''),
  lineLess: ref(false),
  scrollContainer: ref<HTMLElement | null>(null),
});
// 初始化收集herfs
const collectHref = () => {
  hrefs.value[order.value] = href.value;
  order.value++;
};
// 处理点击
const handleClick = (e: MouseEvent) => {
  curHref.value = href.value;
  if (!changeHash.value) {
    e.preventDefault();
    const anchorDom = document.querySelector(href.value) as HTMLDivElement;
    if (!anchorDom) return;
    if (isNumber(boundary.value) && scrollContainer.value) {
      const targetRect = anchorDom.getBoundingClientRect();
      const containerRect = scrollContainer.value.getBoundingClientRect();
      const verticalPosition =
        targetRect.top -
        containerRect.top +
        scrollContainer.value.scrollTop -
        boundary.value;
      scrollContainer.value.scrollTo({
        top: verticalPosition,
        behavior: 'smooth',
      });
    } else {
      anchorDom.scrollIntoView({
        block: boundary.value as any,
        behavior: smooth.value ? 'smooth' : 'auto',
      });
    }
  }
};

collectHref();
</script>

<style lang="less" scoped>
@import './style/anchor-link.less';
</style>
