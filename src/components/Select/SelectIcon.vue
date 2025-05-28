<template>
  <!-- loading -->
  <yc-spin
    v-if="loading"
    :size="12"
    prevent-focus
    class="yc-select-loading-icon"
  >
    <template v-if="$slots['loading-icon']" #icon>
      <component :is="renderIcon('loading-icon')" />
    </template>
  </yc-spin>
  <template v-else>
    <!-- default -->
    <yc-prevent-focus class="yc-select-suffix-icon">
      <component v-if="slots['arrow-icon']" :is="renderIcon('arrow-icon')" />
      <icon-arrow-up v-else :rotate="popupVisible ? 0 : 180" />
    </yc-prevent-focus>
    <!-- search -->
    <yc-prevent-focus v-if="allowSearch" class="yc-select-search-icon">
      <component v-if="slots['search-icon']" :is="renderIcon('search-icon')" />
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
import useContext from './hooks/useContext';
import { IconArrowUp } from '@shared/icons';
import { YcIconButton, YcPreventFocus } from '@shared/components';
import YcSpin from '@/components/Spin';
defineProps<{
  loading: boolean;
  popupVisible: boolean;
  showClearBtn: boolean;
  allowSearch: boolean;
}>();
// 接收注入
const { inject } = useContext();
const { slots, emits } = inject();
// 渲染icon
const renderIcon = (name: string) => {
  return slots[name];
};
</script>

<style lang="less" scoped>
@import './style/select.less';
</style>
