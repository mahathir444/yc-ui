<template>
  <div
    :class="[
      'yc-tabs',
      `yc-tabs-${direction}`,
      `yc-tabs-type-${type}`,
      `yc-tabs-size-${size}`,
      {
        'yc-tabs-animation': animation,
        'yc-tabs-justify': direction == 'horizontal' && justify,
        'yc-tabs-no-padding':
          headerPadding &&
          ['line', 'text'].includes(type) &&
          props.direction === 'horizontal',
        [`yc-tabs-${position}`]: position,
      },
    ]"
  >
    <div class="yc-tabs-nav">
      <div
        class="yc-tabs-nav-tab"
        :style="{
          maxWidth:
            direction == 'horizontal' && maxDis ? valueToPx(maxDis) : '',
          maxHeight: direction == 'vertical' && maxDis ? valueToPx(maxDis) : '',
        }"
      >
        <!-- pre -->
        <tab-button
          v-if="isScroll"
          :disabled="!curScrollIndex"
          @click="handleScroll('pre')"
        >
          <icon-arrow-right :rotate="180" />
        </tab-button>
        <!-- list -->
        <div
          class="yc-tabs-nav-tab-list"
          :style="{
            transform,
          }"
          ref="listRef"
        >
          <tabs-tab
            v-for="(item, i) in panes"
            :key="i"
            :index="i"
            :node="item"
          />
          <!-- ink -->
          <tabs-nav-ink
            v-if="type == 'line'"
            :cur-index="curIndex"
            :panes="panes"
          />
        </div>
        <!-- next -->
        <tab-button
          v-if="isScroll"
          :disabled="curScrollIndex == panes.length - 1"
          @click="handleScroll('next')"
        >
          <icon-arrow-right />
        </tab-button>
      </div>
      <!-- extra -->
      <div v-if="$slots.extra || showAddButton" class="yc-tabs-nav-extra">
        <!-- 新增按钮 -->
        <tab-button
          v-if="showAddButton"
          class="yc-tabs-nav-add-btn"
          @click="handleAdd"
        >
          <icon-plus />
        </tab-button>
        <slot name="extra" />
      </div>
    </div>
    <div v-if="!hideContent" class="yc-tabs-content">
      <div
        class="yc-tabs-content-list"
        :style="{
          marginLeft: `${-curIndex * 100}%`,
        }"
      >
        <component v-for="(node, i) in tabPanes" :key="i" :is="node" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, computed, nextTick, onBeforeUnmount, useSlots } from 'vue';
import { TabsProps, TabsEmits, TabsSlots } from './type';
import { sleep, findComponentsFromVnodes, valueToPx } from '@shared/utils';
import useContext from './hooks/useContext';
import { IconPlus, IconArrowRight } from '@shared/icons';
import { useResizeObserver } from '@vueuse/core';
import TabPane from './TabPane.vue';
import TabsTab from './TabsTab.vue';
import TabsNavInk from './TabsNavInk.vue';
import TabButton from './TabButton.vue';
defineOptions({
  name: 'Tabs',
});
defineSlots<TabsSlots>();
const props = withDefaults(defineProps<TabsProps>(), {
  activeKey: undefined,
  defaultActiveKey: '',
  position: undefined,
  size: undefined,
  type: 'line',
  direction: 'horizontal',
  editable: false,
  showAddButton: false,
  destoryOnHide: false,
  lazyLoad: false,
  justify: false,
  animation: false,
  headerPadding: true,
  autoSwitch: false,
  hideContent: false,
  trigger: 'click',
  scrollPosition: 'nearest',
});
const emits = defineEmits<TabsEmits>();
// tablist
const listRef = ref<HTMLDivElement>();
// 注入
const {
  computedActiveKey,
  size,
  direction,
  autoSwitch,
  position,
  tabRefs,
  curScrollIndex,
} = useContext().provide(props, emits, listRef);
// 获取tabPane的数据
const slots = useSlots();
// tabPanes
const tabPanes = computed(() =>
  findComponentsFromVnodes(slots.default?.() || [], TabPane.name as string)
);
// pane数据
const panes = computed(() => {
  return tabPanes.value.map((item) => {
    return {
      title: '',
      path: '',
      disabled: false,
      ...(item.props || {}),
      slots: item.children,
    };
  });
});
// 展示新增button
const showAddButton = computed(() => {
  return (
    props.showAddButton && ['line', 'card', 'card-gutter'].includes(props.type)
  );
});
// 当前的索引
const curIndex = computed(() => {
  const index = panes.value.findIndex((item) => {
    return item.path == computedActiveKey.value;
  });
  return index < 0 ? 0 : index;
});
// 是否可滚动
const isScroll = ref<boolean>(false);
// 最大的dis
const maxDis = ref(0);
//
const transform = ref('');
// 检测List的宽度
const { stop } = useResizeObserver(listRef, () => calcScrollable());
// 卸载时停止监听
onBeforeUnmount(() => {
  stop();
});
watch(
  () => panes.value.length,
  async () => {
    await sleep(0);
    calcScrollable();
  }
);
// 计算是否可滚动
const calcScrollable = () => {
  const {
    scrollWidth,
    offsetWidth,
    scrollHeight,
    offsetHeight,
    parentElement,
  } = listRef.value!;
  isScroll.value =
    (direction.value == 'horizontal' && scrollWidth > offsetWidth) ||
    (direction.value == 'vertical' && scrollHeight > offsetHeight);
  const container = parentElement!.parentElement!;
  const extra = (container?.children[1] as HTMLDivElement)!;
  maxDis.value =
    direction.value == 'horizontal'
      ? container?.offsetWidth - extra.offsetWidth
      : container?.offsetHeight - extra.offsetHeight;
};
// 处理滚动
const handleScroll = (type: 'pre' | 'next') => {
  if (
    (type == 'pre' && !curScrollIndex.value) ||
    (type == 'next' && curScrollIndex.value == tabRefs.value.length - 1)
  ) {
    return;
  }
  const { left, right, top, bottom } = listRef.value!.getBoundingClientRect();
  const tabs = type == 'pre' ? tabRefs.value.reverse() : tabRefs.value;
  // 查找第一个可滚动的tab
  if (direction.value == 'horizontal') {
    curScrollIndex.value = tabs.findIndex((tab) => {
      const { left: _left, right: _right } = tab.getBoundingClientRect();
      if (type == 'pre') {
        return _right <= left;
      } else {
        return right <= _left;
      }
    });
  } else {
    curScrollIndex.value = tabs.findIndex((tab) => {
      const { top: _top, bottom: _bottom } = tab.getBoundingClientRect();
      if (type == 'pre') {
        return _bottom <= top || _top < top;
      } else {
        return bottom <= _top || _bottom < bottom;
      }
    });
  }
  if (curScrollIndex.value == -1) {
    return;
  }
  // transform.value = `translateX(${ - left}px)`;
  // const scrollOptions: ScrollIntoViewOptions = {
  //   behavior: 'smooth',
  // };
  // if (curScrollIndex.value == 1) {
  //   scrollOptions.inline = 'start';
  //   scrollOptions.block = 'start';
  // } else if (curScrollIndex.value == tabRefs.value.length - 1) {
  //   scrollOptions.inline = 'end';
  //   scrollOptions.block = 'end';
  // } else {
  //   scrollOptions.inline = 'nearest';
  //   scrollOptions.block = 'nearest';
  // }
  // tabRefs.value[curScrollIndex.value].scrollIntoView(scrollOptions);
};
// 处理新增
const handleAdd = async () => {
  emits('add');
  if (!autoSwitch.value) return;
  await nextTick();
  computedActiveKey.value = panes.value[panes.value.length - 1].path;
};
</script>

<style lang="less" scoped>
@import './style/tabs.less';
</style>
