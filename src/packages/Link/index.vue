<template>
  <a
    :href="resultHref"
    :class="[
      'yc-link',
      // link是否hoverable
      hoverable && !disabled && !loading ? 'yc-link-hoverable' : '',
      // loading
      loading ? 'yc-link-loading' : '',
      // disabled
      disabled ? 'yc-link-disabled' : '',
      // status
      STATUS_CLASS[status],
    ]"
    @click="handleEvent('click', $event)"
    @dblclick="handleEvent('dblclick', $event)"
    @contextmenu="handleEvent('contextmenu', $event)"
  >
    <span v-if="$slots.icon || loading" class="yc-link-icon">
      <slot v-if="!loading" name="icon" />
      <svg-icon v-else name="loading" size="12" />
    </span>
    <slot />
  </a>
</template>

<script lang="ts" setup>
import { toRefs, computed } from 'vue';
import { LinkProps } from './type';
import { STATUS_CLASS } from './constants';
const props = withDefaults(defineProps<LinkProps>(), {
  href: '',
  status: 'normal',
  hoverable: true,
  loading: false,
  disabled: false,
});
const emits = defineEmits<{
  (e: 'click', event: MouseEvent): void;
  (e: 'dblclick', event: MouseEvent): void;
  (e: 'contextmenu', event: MouseEvent): void;
}>();
const { disabled, loading, href } = toRefs(props);
// 最终的herf
const resultHref = computed(() => {
  if (loading.value || disabled.value) return 'javascript:void(0)';
  return href.value || 'javascript:void(0)';
});
// 拦截事件
const handleEvent = (type: string, e: MouseEvent) => {
  if (disabled.value || loading.value) return;
  emits(type as any, e);
};
</script>

<style lang="less" scoped>
@import './index.less';
</style>
