<template>
  <!-- loading -->
  <yc-spin
    v-if="loading"
    :size="12"
    prevent-focus
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
        <icon-arrow-right />
      </slot>
    </yc-prevent-focus>
    <!-- search -->
    <yc-prevent-focus v-if="allowSearch" class="yc-select-search-icon">
      <slot name="search-icon">
        <icon-search />
      </slot>
    </yc-prevent-focus>
    <!-- clear -->
    <yc-icon-button
      v-if="showClearBtn"
      style="color: inherit"
      class="yc-select-clear-icon"
      @click="(ev) => $emit('clear', ev)"
    />
  </template>
</template>

<script lang="ts" setup>
import IconSearch from '@shared/icons/IconSearch.vue';
import IconArrowRight from '@shared/icons/IconArrowRight.vue';
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
