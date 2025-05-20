<template>
  <div
    :class="[
      'yc-tabs',
      `yc-tabs-${direction}`,
      `yc-tabs-${position}`,
      `yc-tabs-type-${type}`,
      `yc-tabs-size-${size}`,
    ]"
  >
    <div :class="['yc-tabs-nav']">
      <div class="yc-tabs-nav-tab">
        <div
          class="yc-tabs-nav-tab-list"
          style="transform: translateX(0px)"
          ref="listRef"
        >
          <div
            v-for="(item, i) in tabPaneNodes"
            :key="i"
            tabindex="0"
            :class="[
              'yc-tabs-tab',
              `yc-tabs-tab-type-${type}`,
              `yc-tabs-tab-${direction}`,
              {
                'yc-tabs-tab-active': computedActiveKey == item?.props?.path,
              },
            ]"
            @click="handleClick(item)"
          >
            <span
              class="yc-tabs-tab-title"
              :ref="(el) => (titleRefs[i] = el as HTMLSpanElement)"
            >
              <component :is="renderTitle(item)" />
            </span>
          </div>
          <div
            v-if="type == 'line'"
            class="yc-tabs-nav-ink"
            :style="sliderStyle"
          ></div>
        </div>
      </div>
      <div v-if="$slots.extra" class="yc-tabs-nav-extra">
        <slot name="extra" />
      </div>
    </div>
    <div class="yc-tabs-content">
      <div class="yc-tabs-content-list" style="margin-left: -100%">
        <div
          v-for="(item, i) in tabPaneNodes"
          :key="i"
          class="yc-tabs-content-item"
        >
          <div class="yc-tabs-pane">
            <component :is="item.children.default" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { ObjectData } from '@shared/type';
import { TabProps, TabEmits, TabSlots } from './type';
import useContext from './hooks/useContext';
defineOptions({
  name: 'Tabs',
});
defineSlots<TabSlots>();
const props = withDefaults(defineProps<TabProps>(), {
  activeKey: undefined,
  defaultActiveKey: '',
  position: 'top',
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
});
const emit = defineEmits<TabEmits>();
// 出入数据
const { provide } = useContext();
const { computedActiveKey, tabPaneNodes } = provide(props, emit);
// titleRefs
const titleRefs = ref<HTMLSpanElement[]>([]);
// tablist
const listRef = ref<HTMLDivElement>();
// 计算sliderWidth
const sliderStyle = computed(() => {
  const index = tabPaneNodes.findIndex(
    (item) => item?.props?.path == computedActiveKey.value
  );
  const targetIndex = index == -1 ? 0 : index;
  const listLeft = listRef.value?.getBoundingClientRect?.()?.left || 0;
  const targetLeft =
    titleRefs.value[targetIndex]?.getBoundingClientRect?.()?.left || 0;
  return {
    width: `${titleRefs.value[targetIndex]?.offsetWidth}px`,
    left: `${targetLeft - listLeft}px`,
  };
});
// 渲染title
const renderTitle = (node: ObjectData) => {
  return node.children.title ? node.children.title : () => node.props.title;
};
// 处理点击
const handleClick = (node: ObjectData) => {
  const key = node?.props?.path;
  const disabled = node?.props?.disabled;
  if (computedActiveKey.value == key || disabled) return;
  computedActiveKey.value = key;
};
</script>

<style lang="less" scoped>
@import './style/tabs.less';
@import './style/tabs-tab.less';
</style>
