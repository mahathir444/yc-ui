<template>
  <div class="test">
    <a-list
      :style="{ width: `600px` }"
      :virtual-list-props="{
        height: 560,
      }"
      :paginationProps="{
        defaultCurrent: 1,
        total: list.length,
      }"
      :data="list"
    >
      <template #item="{ item, index }">
        <a-list-item :key="index">
          <a-list-item-meta :title="item.title" :description="item.description">
            <template #avatar>
              <yc-avatar shape="square"> A </yc-avatar>
            </template>
          </a-list-item-meta>
        </a-list-item>
      </template>
    </a-list>
    <yc-list
      :max-height="560"
      :scrollbar="false"
      :data="list"
      :style="{ width: `600px` }"
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
  Array(100)
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
  align-items: center;
  justify-content: center;
  gap: 10px;
}
</style>
