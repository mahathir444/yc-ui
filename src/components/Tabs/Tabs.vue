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
      <div class="yc-tabs-nav-tab">
        <!-- pre -->
        <tab-button @click="handleScroll('pre')">
          <icon-arrow-right :rotate="180" />
        </tab-button>
        <div class="yc-tabs-nav-tab-list" ref="listRef">
          <tabs-tab
            v-for="(item, i) in tabPaneNodes"
            :key="i"
            :node="item"
            :index="i"
          />
          <!-- ink -->
          <tabs-nav-ink v-if="type == 'line'" :cur-index="curIndex" />
        </div>
        <!-- next -->
        <tab-button @click="handleScroll('next')">
          <icon-arrow-right />
        </tab-button>
      </div>
      <!-- extra -->
      <div v-if="$slots.extra || showAddButton" class="yc-tabs-nav-extra">
        <!-- 新增按钮 -->
        <tab-button
          v-if="showAddButton"
          class="yc-tabs-tab-add-btn"
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
        <div
          v-for="(item, i) in tabPaneNodes"
          :key="i"
          class="yc-tabs-content-item"
        >
          <component v-if="!destoryOnHide || curIndex == i" :is="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, nextTick, onBeforeUnmount } from 'vue';
import { TabsProps, TabsEmits, TabsSlots } from './type';
import useContext from './hooks/useContext';
import { IconPlus, IconArrowRight } from '@shared/icons';
import { useResizeObserver } from '@vueuse/core';
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
  scrollPositon: 'auto',
});
const emits = defineEmits<TabsEmits>();
// tablist
const listRef = ref<HTMLDivElement>();
// 注入
const { provide } = useContext();
const {
  tabPaneNodes,
  computedActiveKey,
  size,
  direction,
  autoSwitch,
  position,
  tabRefs,
} = provide(props, emits, listRef);
// 展示新增button
const showAddButton = computed(() => {
  return (
    props.showAddButton && ['line', 'card', 'card-gutter'].includes(props.type)
  );
});
// 当前的索引
const curIndex = computed(() => {
  const index = tabPaneNodes.findIndex(
    (item) => item?.props?.path == computedActiveKey.value
  );
  return index < 0 ? 0 : index;
});
// 是否可滚动
const isScroll = ref<boolean>(false);
// 检测List的宽度
const { stop } = useResizeObserver(listRef, () => {
  const { scrollWidth, offsetWidth, scrollHeight, offsetHeight } =
    listRef.value!;
  isScroll.value =
    (direction.value == 'horizontal ' && scrollWidth > offsetWidth) ||
    (direction.value == 'vertical' && scrollHeight > offsetHeight);
});
// 处理滚动
const handleScroll = (type: 'pre' | 'next') => {
  const { left, right } = listRef.value!.getBoundingClientRect();
  const tabs = type == 'pre' ? tabRefs.value.reverse() : tabRefs.value;
  const hideTab = tabs.find((tab) => {
    const { left: _left, right: _right } = tab.getBoundingClientRect();
    return type == 'pre' ? _right <= left : right <= _left;
  });
  if (!hideTab) return;
  hideTab.scrollIntoView({
    behavior: 'smooth',
  });
};
// 处理新增
const handleAdd = async () => {
  emits('add');
  await nextTick();
  if (!autoSwitch.value) return;
  computedActiveKey.value = tabPaneNodes[tabPaneNodes.length - 1]?.props?.path;
};
onBeforeUnmount(() => {
  stop();
});
</script>

<style lang="less" scoped>
@import './style/tabs.less';
</style>
