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
        <div
          class="yc-tabs-nav-tab-list"
          :style="{
            transform: `translateX(0px)`,
          }"
          ref="listRef"
        >
          <tabs-tab
            v-for="(item, i) in tabPaneNodes"
            :key="i"
            :node="item"
            :index="i"
          />
          <!-- 新增按钮 -->
          <yc-icon-button
            v-if="showAddButton"
            :size="12"
            :hover-size="20"
            class="yc-tabs-tab-add-btn"
            @click="handleAdd"
          >
            <icon-plus />
          </yc-icon-button>
          <!-- ink -->
          <tabs-nav-ink v-if="type == 'line'" :cur-index="curIndex" />
        </div>
      </div>
      <div v-if="$slots.extra" class="yc-tabs-nav-extra">
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
          <div v-if="!destoryOnHide || curIndex == i" class="yc-tabs-pane">
            <component :is="item.children.default" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, useSlots, nextTick } from 'vue';
import { TabsProps, TabsEmits, TabsSlots } from './type';
import { findComponentsFromVnodes } from '@shared/utils';
import useContext from './hooks/useContext';
import TabPane from './TabPane.vue';
import TabsTab from './TabsTab.vue';
import TabsNavInk from './TabsNavInk.vue';
import { IconPlus } from '@shared/icons';
import { YcIconButton } from '@shared/components';
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
const { computedActiveKey, size, direction, autoSwitch, position } = provide(
  props,
  emits,
  listRef
);
// 获取插槽nodes
const slots = useSlots();
// nodes
const tabPaneNodes = findComponentsFromVnodes(
  slots.default?.() || [],
  TabPane.name as string
);
// 当前的索引
const curIndex = computed(() => {
  const index = tabPaneNodes.findIndex(
    (item) => item?.props?.path == computedActiveKey.value
  );
  return index < 0 ? 0 : index;
});
// 处理新增
const handleAdd = async () => {
  emits('add');
  await nextTick();
  if (!autoSwitch.value) return;
  computedActiveKey.value = tabPaneNodes[tabPaneNodes.length - 1]?.props?.path;
};
</script>

<style lang="less" scoped>
@import './style/tabs.less';
</style>
