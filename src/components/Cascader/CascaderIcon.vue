<template>
  <!-- loading -->
  <yc-spin v-if="loading" :size="12" class="yc-cascader-loading-icon">
    <template v-if="$slots['loading-icon']" #icon>
      <component :is="renderIcon('loading-icon')" />
    </template>
  </yc-spin>
  <template v-else>
    <!-- default -->
    <div class="yc-cascader-suffix-icon">
      <condition-render :render="renderIcon('arrow-icon')">
        <icon-arrow-down
          v-if="!slots['arrow-icon']"
          :rotate="popupVisible ? 180 : 0"
        />
      </condition-render>
    </div>
    <!-- search -->
    <div v-if="allowSearch" class="yc-cascader-search-icon">
      <condition-render :render="renderIcon('search-icon')">
        <icon-search v-if="!slots['search-icon']" />
      </condition-render>
    </div>
    <!-- clear -->
    <icon-button
      v-if="showClearBtn"
      class="yc-cascader-clear-icon"
      @click="$emit('clear')"
    />
  </template>
</template>

<script lang="ts" setup>
import useContext from './hooks/useContext';
import { IconArrowDown } from '@shared/icons';
import { IconButton, ConditionRender } from '@shared/components';
import YcSpin from '@/components/Spin';
defineProps<{
  loading: boolean;
  popupVisible: boolean;
  showClearBtn: boolean;
  allowSearch: boolean;
}>();
defineEmits<{
  (e: 'clear'): void;
}>();
// 接收注入
const { slots } = useContext().inject();
// 渲染icon
const renderIcon = (name: string) => {
  return slots[name];
};
</script>

<style lang="less" scoped>
@import './style/cascader.less';
</style>
