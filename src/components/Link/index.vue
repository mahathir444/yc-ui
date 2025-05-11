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
      `yc-link-status-${status}`,
    ]"
    @click="handleEvent('click', $event)"
    @dblclick="handleEvent('dblclick', $event)"
    @contextmenu="handleEvent('contextmenu', $event)"
  >
    <span v-if="$slots.icon || icon || loading" class="yc-link-icon">
      <slot v-if="!loading" name="icon">
        <icon-link v-if="icon" />
      </slot>
      <yc-spin v-else />
    </span>
    <slot />
  </a>
</template>

<script lang="ts" setup>
import { toRefs, computed } from 'vue';
import { LinkProps, LinkEmits, LinkSlots } from './type';
import YcSpin from '@/components/Spin';
import { IconLink } from '@shared/icons';
defineOptions({
  name: 'Link',
});
defineSlots<LinkSlots>();
const props = withDefaults(defineProps<LinkProps>(), {
  href: '',
  status: 'normal',
  hoverable: true,
  loading: false,
  disabled: false,
  icon: false,
});
const emits = defineEmits<LinkEmits>();
const { disabled, loading, href } = toRefs(props);
// 最终的herf
const resultHref = computed(() => {
  if (loading.value || disabled.value) return 'javascript:void(0)';
  return href.value || 'javascript:void(0)';
});
// 拦截事件
const handleEvent = (type: string, e: MouseEvent) => {
  if (disabled.value || loading.value) return;
  emits(type as keyof LinkEmits, e);
};
</script>

<style lang="less" scoped>
@import './style/link.less';
</style>
