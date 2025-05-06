<template>
  <!-- loading -->
  <yc-spin
    v-if="loading"
    :size="12"
    prevent-focus
    class="yc-select-loading-icon"
  >
    <template v-if="$slots['loading-icon']" #icon>
      <component :is="slots['loading-icon']" />
    </template>
  </yc-spin>
  <template v-else>
    <!-- default -->
    <yc-prevent-focus class="yc-select-suffix-icon">
      <component v-if="slots['arrow-icon']" :is="slots['arrow-icon']" />
      <template v-else>
        <icon-arrow-up v-if="popupVisible" />
        <icon-arrow-down v-else />
      </template>
    </yc-prevent-focus>
    <!-- search -->
    <yc-prevent-focus v-if="allowSearch" class="yc-select-search-icon">
      <component v-if="slots['search-icon']" :is="slots['search-icon']" />
      <icon-search v-else />
    </yc-prevent-focus>
    <!-- clear -->
    <yc-icon-button
      v-if="showClearBtn"
      class="yc-select-clear-icon"
      @click="emits('clear')"
    />
  </template>
</template>

<script lang="ts" setup>
import useProvide from './hooks/useProvide';
import { IconArrowDown, IconArrowUp } from '@shared/icons';
import { YcIconButton, YcPreventFocus } from '@shared/components';
import YcSpin from '@/components/Spin';
defineProps<{
  loading: boolean;
  popupVisible: boolean;
  showClearBtn: boolean;
  allowSearch: boolean;
}>();
// 接收注入
const { inject } = useProvide();
const { slots, emits } = inject();
</script>

<style lang="less" scoped>
@import './style/select.less';
</style>
