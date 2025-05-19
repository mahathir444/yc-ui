<template>
  <div class="test">
    <!-- <a-list
      :style="{ width: `600px` }"
      :maxHeight="560"
      :data="list"
      @reach-bottom="handleReach"
    >
      <template #scroll-loading>
        <yc-spin :loading="true">
          <div style="height: 30px; width: 100%"></div>
        </yc-spin>
      </template>
      <template #item="{ item, index }">
        <a-list-item :key="index">
          <a-list-item-meta :title="item.title" :description="item.description">
            <template #avatar>
              <yc-avatar shape="square"> A </yc-avatar>
            </template>
          </a-list-item-meta>
        </a-list-item>
      </template>
    </a-list> -->
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
</script>

<style lang="less" scoped>
.test {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
</style>
