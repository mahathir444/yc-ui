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
import { ANCHOR_PROVIDE_KEY } from '@shared/constants';
defineOptions({
  name: 'AnchorLink',
});
const props = withDefaults(
  defineProps<{
    title?: string;
    href?: string;
  }>(),
  {
    title: '',
    href: '',
  }
);
const { href } = toRefs(props);
// 获取属性
const { smooth, boundary, changeHash, curHref, hrefs, order, lineLess } =
  inject(ANCHOR_PROVIDE_KEY, {
    hrefs: ref<string[]>([]),
    order: ref(0),
    changeHash: ref(true),
    smooth: ref(true),
    boundary: ref('start'),
    curHref: ref(''),
    lineLess: ref(false),
  });
// 初始化收集herfs
hrefs.value[order.value] = href.value;
order.value++;
// 处理点击
const handleClick = (e: MouseEvent) => {
  if (!changeHash.value) {
    e.preventDefault();
    const dom = document.querySelector(href.value) as HTMLDivElement;
    if (dom) {
      if (isNumber(boundary.value)) {
      } else {
        dom.scrollIntoView({
          block: boundary.value as any,
          behavior: smooth.value ? 'smooth' : 'auto',
        });
      }
    }
  }
  curHref.value = href.value;
};
</script>

<style lang="less" scoped>
@import './style/anchor-link.less';
</style>
