<template>
  <div
    tabindex="0"
    :class="[
      'yc-tabs-tab',
      `yc-tabs-tab-type-${type}`,
      `yc-tabs-tab-${direction}`,
      `yc-tabs-tab-size-${size}`,
      {
        [`yc-tabs-tab-${position}`]: position,
        'yc-tabs-tab-no-padding':
          !headerPadding &&
          direction == 'horizontal' &&
          ['line', 'text'].includes(type),
        'yc-tabs-tab-active': computedActiveKey == node?.props?.path,
      },
    ]"
    ref="tabRef"
    @mouseenter="handleChange(node, 'hover')"
    @click="handleChange(node, 'click')"
  >
    <span
      class="yc-tabs-tab-title"
      :ref="(el) => (titleRefs[index] = el as HTMLSpanElement)"
    >
      <component :is="renderTitle(node)" />
    </span>
    <!-- 删除按钮 -->
    <yc-icon-button
      v-if="editable"
      :size="14"
      :hover-size="20"
      class="yc-tabs-tab-close-btn"
      @click="handleDel(node)"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, nextTick } from 'vue';
import { ObjectData } from '@shared/type';
import useContext from './hooks/useContext';
import { YcIconButton } from '@shared/components';
const props = defineProps<{
  node: ObjectData;
  index: number;
}>();
// 接收注入
const { inject } = useContext();
const {
  computedActiveKey,
  titleRefs,
  trigger,
  editable,
  type,
  direction,
  position,
  headerPadding,
  size,
  emits,
} = inject();
const tabRef = ref<HTMLDivElement>();
// 渲染title
const renderTitle = (node: ObjectData) => {
  return node.children.title ? node.children.title : () => node.props.title;
};
// 处理状态改变
const handleChange = (node: ObjectData, triggerType: string) => {
  const key = node?.props?.path;
  const disabled = node?.props?.disabled;
  if (
    computedActiveKey.value == key ||
    disabled ||
    triggerType != trigger.value
  )
    return;
  computedActiveKey.value = key;
  emits('change', key);
  emits('tab-click', key);
};
// 处理删除
const handleDel = async (node: ObjectData) => {
  emits('delete', node?.props?.path);
  await nextTick();
};
watch(
  () => computedActiveKey.value,
  async (v) => {
    await nextTick();
    if (v == props?.node?.props?.path) {
      tabRef.value?.scrollIntoView({});
    }
  }
);
console.log('重新初始化了');
</script>

<style lang="less" scoped>
@import './style/tabs-tab.less';
</style>
