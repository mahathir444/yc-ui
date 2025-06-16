<template>
  <div class="test">
    <yc-list
      :maxHeight="500"
      :virtualListProps="{
        itemHeight: 103,
      }"
      :data="list"
      @reachBottom="() => console.log('触底了')"
    >
      <template #item="{ item, index }">
        <yc-list-item :key="index">
          <yc-list-item-meta
            :title="item.title"
            :description="item.description"
          >
            <template #avatar>
              <yc-avatar shape="square"> A </yc-avatar>
            </template>
          </yc-list-item-meta>
        </yc-list-item>
      </template>
    </yc-list>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
const list = reactive(
  Array(10000)
    .fill(null)
    .map((_, index) => {
      const prefix = `0000${index}`.slice(-5);
      return {
        title: 'Beijing Bytedance Technology Co., Ltd.',
        description: `(${prefix}) Beijing ByteDance Technology Co., Ltd. is an enterprise located in China.`,
      };
    })
);
</script>

<style lang="less" scoped>
.test {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  overflow: hidden;
}
</style>
