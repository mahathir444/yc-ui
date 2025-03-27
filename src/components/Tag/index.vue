<template>
  <yc-prevent-focus
    v-if="computedVisible && (min <= 0 || tagIndex < min)"
    :prevent-focus="preventFocus"
    tag="label"
    :class="[
      'yc-tag',
      SIZE_CLASS[size],
      COLOR_CLASS[color] ?? 'yc-tag-custom-color',
      loading ? 'yc-tag-loading' : '',
      bordered ? 'yc-tag-bordered' : '',
      computedChecked ? 'yc-tag-checked' : '',
      nowrap ? 'yc-tag-no-wrap' : 'yc-tag-wrap',
    ]"
    :style="{
      background: COLOR_CLASS[color] ? '' : (COLOR_MAP[color] ?? color),
      color: ['default', 'white'].includes(color) ? 'rgb(29, 33, 41)' : '',
    }"
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
      hover-size="16px"
      hover-color="rgba(255, 255, 255, 0.2)"
      style="color: inherit"
      class="yc-tag-close-button"
      @click="handleEvent('close', $event)"
    >
      <template v-if="$slots.closeIcon" #icon>
        <slot name="closeIcon" />
      </template>
    </yc-icon-button>
    <!-- loading -->
    <yc-spin
      v-if="loading"
      style="color: inherit; font-size: inherit"
      class="yc-tag-loading-icon"
    />
  </yc-prevent-focus>
</template>

<script lang="ts" setup>
import { toRefs, inject, ref, onBeforeUnmount, watch } from 'vue';
import { TagProps, TagEventType } from './type';
import { SIZE_CLASS, COLOR_CLASS, COLOR_MAP } from './constants';
import { OVERFLOW_LIST_PROVIDE_KEY } from '@shared/constants';
import { ProvideType } from '@/components/OverflowList/type';
import YcSpin from '@/components/Spin';
import useControlValue from '@shared/hooks/useControlValue';
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
  tagIndex: -1,
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
  const { tagNumber, min } = inject<ProvideType>(OVERFLOW_LIST_PROVIDE_KEY, {
    min: ref(0),
    tagNumber: ref(0),
  });
  if (_tagIndex.value != -1) {
    return {
      tagIndex: _tagIndex,
      min,
      tagNumber,
    };
  }
  const tagIndex = ref<number>(tagNumber.value++);
  onBeforeUnmount(() => {
    tagNumber.value--;
  });
  watch(tagNumber, (newVal, oldVal) => {
    if (newVal < oldVal && tagNumber.value > newVal) {
      console.log(tagIndex.value, tagNumber.value);
      tagIndex.value--;
    }
  });
  return {
    tagIndex,
    min,
    tagNumber,
  };
}
</script>

<style lang="less" scoped>
@import './style/tag.less';
</style>
