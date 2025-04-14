<template>
  <yc-prevent-focus
    v-if="computedVisible && (min <= 0 || tagIndex < min)"
    tag="label"
    :prevent-focus="preventFocus"
    :class="[
      'yc-tag',
      SIZE_CLASS[size],
      (COLOR_CLASS[color] ?? ['default', 'white'].includes(color))
        ? 'yc-tag-preset-color'
        : 'yc-tag-custom-color',
      loading ? 'yc-tag-loading' : '',
      bordered ? 'yc-tag-bordered' : '',
      computedChecked ? 'yc-tag-checked' : '',
      nowrap ? 'yc-tag-no-wrap' : 'yc-tag-wrap',
    ]"
    @click="handleEvent('check', $event)"
  >
    <!-- icon -->
    <div v-if="$slots.icon" class="yc-tag-icon">
      <slot name="icon" />
    </div>
    <!-- content -->
    <span class="yc-tag-label">
      <slot />
    </span>
    <!-- close -->
    <yc-icon-button
      v-if="closeable"
      :hover-size="16"
      hover-color="rgba(255, 255, 255, 0.2)"
      class="yc-tag-close-button"
      @click="handleEvent('close', $event)"
    >
      <slot v-if="$slots.closeIcon" name="closeIcon" />
    </yc-icon-button>
    <!-- loading -->
    <yc-spin v-if="loading" class="yc-tag-loading-icon" />
  </yc-prevent-focus>
</template>

<script lang="ts" setup>
import { toRefs, inject, ref, onBeforeUnmount, watch, computed } from 'vue';
import { TagProps, TagEventType } from './type';
import { SIZE_CLASS, COLOR_CLASS, COLOR_MAP } from '@shared/constants/tag';
import { isUndefined } from '@shared/utils/is';
import { OVERFLOW_LIST_PROVIDE_KEY } from '@shared/constants';
import { OverListProvide } from '@/components/OverflowList/type';
import YcSpin from '@/components/Spin';
import useControlValue from '@shared/hooks/useControlValue';
import YcPreventFocus from '@shared/components/PreventFocus';
import YcIconButton from '@shared/components/IconButton';
defineOptions({
  name: 'Tag',
});
const props = withDefaults(defineProps<TagProps>(), {
  color: 'default',
  size: 'medium',
  bordered: false,
  loading: false,
  closeable: false,
  checkable: false,
  visible: undefined,
  defaultVisible: true,
  checked: undefined,
  defaultChecked: true,
  nowrap: false,
  preventFocus: false,
  tagIndex: undefined,
});
const emits = defineEmits<{
  (e: 'update:visible', value: boolean): void;
  (e: 'update:checked', value: boolean): void;
  (e: 'close', ev: MouseEvent, value?: string): void;
  (e: 'check', value: boolean, ev: MouseEvent): void;
}>();
const {
  visible,
  defaultVisible,
  checked,
  defaultChecked,
  checkable,
  preventFocus,
  color,
  tagIndex: _tagIndex,
} = toRefs(props);
// visible
const computedVisible = useControlValue<boolean>(
  visible,
  defaultVisible.value,
  (val) => emits('update:visible', val)
);
// checked
const computedChecked = useControlValue<boolean>(
  checked,
  defaultChecked.value,
  (val) => emits('update:checked', val)
);
// 背景色
const background = computed(() => {
  if (!computedChecked.value) return '';
  return COLOR_CLASS[color.value]
    ? ''
    : (COLOR_MAP[color.value] ?? color.value);
});
// 用于折叠面板
const { tagIndex, min } = initTagIndex();
// 处理事件
const handleEvent = (type: TagEventType, ev: MouseEvent) => {
  if (type == 'close') {
    computedVisible.value = false;
    emits('close', ev);
  } else if (type == 'check' && checkable.value) {
    computedChecked.value = !computedChecked.value;
    emits('check', computedChecked.value, ev);
  }
};
// 初始化tagIndex
function initTagIndex() {
  const { tagNumber, min } = inject<OverListProvide>(
    OVERFLOW_LIST_PROVIDE_KEY,
    {
      min: ref(0),
      tagNumber: ref(-1),
    }
  );
  if (!isUndefined(_tagIndex.value) || tagNumber.value == -1) {
    return {
      tagIndex: _tagIndex,
      min,
    };
  }
  const tagIndex = ref<number>(tagNumber.value++);
  onBeforeUnmount(() => {
    tagNumber.value--;
  });
  watch(tagNumber, (newVal, oldVal) => {
    if (newVal < oldVal && tagNumber.value > newVal) {
      tagIndex.value--;
    }
  });
  return {
    tagIndex,
    min,
  };
}
</script>

<style lang="less" scoped>
@import './style/tag.less';
.yc-tag {
  background: v-bind(background);
}
</style>
