<template>
  <transition-group name="input-tag-zoom" tag="div">
    <yc-tag
      v-for="item in curList.visibleList"
      :key="item?.[fieldKey.id]"
      :closeable="item?.[fieldKey.closeable] ?? true"
      :bordered="item?.[fieldKey.tagProps]?.bordered ?? true"
      :nowrap="item?.[fieldKey.tagProps]?.nowrap ?? tagNowrap"
      :size="size == 'mini' ? 'small' : size"
      :checked="false"
      prevent-focus
      @close="(ev) => $emit('close', ev, item.id)"
    >
      {{ formatTag ? formatTag(item) : item[fieldKey.label] }}
    </yc-tag>
    <yc-tag
      v-if="maxTagCount > 0 && computedValue.length > maxTagCount"
      key="yc-select-value-tag"
      :size="size == 'mini' ? 'small' : size"
      :nowrap="tagNowrap"
      :checked="false"
      bordered
      prevent-focus
    >
      +{{ curList.hideList.length }}...
    </yc-tag>
    <slot name="extra" />
  </transition-group>
</template>

<script lang="ts" setup>
import { computed, toRefs } from 'vue';
import { InputTagValue, FormatTag } from '../type';
import { ObjectData, Size } from '@shared/type';
import YcTag from '@/components/Tag';
const props = defineProps<{
  computedValue: InputTagValue;
  tagNowrap: boolean;
  fieldKey: Record<string, string>;
  size: Size;
  maxTagCount: number;
  formatTag?: FormatTag;
}>();
defineEmits<{
  (e: 'close', ev: MouseEvent, id: string): void;
}>();
const { computedValue, maxTagCount } = toRefs(props);
// 当前展示的list
const curList = computed(() => {
  const visibleList =
    maxTagCount.value > 0
      ? computedValue.value.slice(0, maxTagCount.value)
      : computedValue.value;
  return {
    visibleList: visibleList as ObjectData,

    hideList: computedValue.value.slice(maxTagCount.value),
  };
});
</script>
