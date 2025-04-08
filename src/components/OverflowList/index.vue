<template>
  <div
    class="yc-overflow-list"
    :style="{
      gap: margin + 'px',
    }"
  >
    <yc-tag
      v-if="min > 0 && tagNumber > min && from == 'start'"
      :tag-index="0"
      v-bind="extraTagProps"
    >
      +{{ tagNumber - min }}
    </yc-tag>
    <slot />
    <yc-tag
      v-if="min > 0 && tagNumber > min && from == 'end'"
      :tag-index="0"
      v-bind="extraTagProps"
    >
      +{{ tagNumber - min }}
    </yc-tag>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs, provide } from 'vue';
import { OverflowListProps, OverListProvide } from './type';
import { OVERFLOW_LIST_PROVIDE_KEY } from '@shared/constants';
defineOptions({
  name: 'OverflowList',
});
const props = withDefaults(defineProps<OverflowListProps>(), {
  min: 9,
  margin: 8,
  from: 'end',
  extraTagProps: () => {
    return {};
  },
});
const { min } = toRefs(props);
// 插槽内tag的总数
const tagNumber = ref<number>(0);
// 提供给tag
provide<OverListProvide>(OVERFLOW_LIST_PROVIDE_KEY, {
  min,
  tagNumber,
});
</script>

<style lang="less">
@import './style/overflow-list.less';
</style>
