<template>
  <!-- loading -->
  <yc-spin
    v-if="loading"
    v-prevent="{
      event: 'mousedown',
    }"
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
    <yc-prevent-focus
      :class="{
        'yc-select-suffix-icon': true,
        'yc-select-suffix-icon-focus': popupVisible,
      }"
    >
      <slot name="arrow-icon">
        <yc-icon name="arrow-right" />
      </slot>
    </yc-prevent-focus>
    <!-- search -->
    <yc-prevent-focus v-if="allowSearch" class="yc-select-search-icon">
      <slot name="search-icon">
        <yc-icon name="search" />
      </slot>
    </yc-prevent-focus>
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
  popupVisible: boolean;
}>();
const emits = defineEmits<{
  (e: 'clear', ev: MouseEvent): void;
}>();
</script>

<style lang="less" scoped>
@import '../style/select-icon.less';
</style>
