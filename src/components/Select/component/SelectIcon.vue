<template>
  <!-- loading -->
  <yc-spin
    v-if="loading"
    :size="12"
    style="color: inherit"
    class="yc-select-loading-icon"
  >
    <template v-if="$slots['loading-icon']" #icon>
      <slot name="loading-icon" />
    </template>
  </yc-spin>
  <template v-else>
    <!-- default -->
    <div class="yc-select-suffix-icon">
      <slot name="arrow-icon">
        <yc-icon name="arrow-right" />
      </slot>
    </div>
    <!-- search -->
    <div v-if="allowSearch" class="yc-select-search-icon">
      <slot name="search-icon">
        <yc-icon name="search" />
      </slot>
    </div>
    <!-- clear -->
    <yc-icon-button
      v-if="showClearBtn"
      name="close"
      style="color: inherit"
      class="yc-select-clear-icon"
      @click.stop="(ev) => $emit('clear', ev)"
    />
  </template>
</template>

<script lang="ts" setup>
defineProps<{
  loading: boolean;
  allowSearch: boolean;
  allowClear: boolean;
  showClearBtn: boolean;
}>();
const emits = defineEmits<{
  (e: 'clear', ev: MouseEvent): void;
}>();
</script>

<style lang="less" scoped>
.yc-select-suffix-icon {
  transform: rotate(90deg);
}

.yc-select-suffix-icon,
.yc-select-search-icon {
  font-size: 12px;
  color: inherit;
}

.yc-select-clear-icon,
.yc-select-search-icon {
  display: none;
}
</style>
