<template>
  <TransitionGroup tag="div" name="cascader-slide" class="yc-cascader-panel">
    <yc-spin v-if="loading" />
    <template v-else>
      <div
        v-for="i in curLevel"
        :key="i"
        :style="{
          zIndex: curLevel + 1 - i,
        }"
        class="yc-cascader-panel-column"
      >
        <yc-scrollbar class="yc-cascader-column-content">
          <ul role="menu" class="yc-cascader-list">
            <yc-cascader-option
              v-for="(option, i1) in findOptions(
                options,
                i,
                curPath.slice(0, i - 1)
              )"
              :key="i1"
              v-bind="option"
            />
          </ul>
        </yc-scrollbar>
      </div>
    </template>
  </TransitionGroup>
</template>

<script lang="ts" setup>
import { default as useContext, findOptions } from './hooks/useContext';
import YcCascaderOption from './CascaderOption.vue';
import YcScrollbar from '@/components/Scrollbar';
import YcSpin from '@/components/Spin';
const { options, curLevel, curPath, loading } = useContext().inject();
</script>

<style lang="less" scoped>
.yc-cascader-panel {
  height: 200px;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid rgb(229, 230, 235);
  box-shadow: 0 4px 10px #0000001a;
  display: inline-flex;
  .yc-cascader-panel-column {
    position: relative;
    min-width: 120px;
    background-color: #fff;
    border-right: 1px solid transparent;
    display: inline-flex;
    flex-direction: column;
    &:not(:last-child) {
      border-right-color: rgb(229, 230, 235);
    }
    .yc-scrollbar {
      &:deep(.yc-scrollbar-container) {
        max-height: 200px;
        overflow-y: auto;
      }
    }
  }
  .yc-spin {
    height: 100%;
    min-width: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
