<template>
  <!-- loading -->
  <yc-spin
    v-if="loading"
    v-prevent="'mousedown'"
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
    <div v-prevent="'mousedown'" class="yc-select-suffix-icon">
      <slot name="arrow-icon">
        <yc-icon name="arrow-right" />
      </slot>
    </div>
    <!-- search -->
    <div
      v-if="allowSearch"
      v-prevent="'mousedown'"
      class="yc-select-search-icon"
    >
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
      @click="(ev) => $emit('clear', ev)"
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
@import '../style/select-icon.less';
</style>
