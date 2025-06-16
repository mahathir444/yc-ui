<template>
  <div class="test">
    <div style="width: 800px">
      <a-tabs editable show-add-button>
        <a-tab-pane v-for="item of data" :key="item.key" :title="item.title">
          {{ item?.content }}
        </a-tab-pane>
      </a-tabs>
    </div>
    <yc-tabs editable :default-active-key="15">
      <yc-tab-pane
        v-for="item of data"
        :key="item.key"
        :path="item.key"
        :title="item.title"
      >
        {{ item?.content }}
      </yc-tab-pane>
    </yc-tabs>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
const data = ref(
  new Array(20).fill(0).map((_, i) => {
    return {
      key: `${i}`,
      title: `tab ${i}`,
      content: `Content of Tab Panel ${i}`,
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
