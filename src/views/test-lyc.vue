<template>
  <div class="test">
    <div style="width: 500px"></div>
    <!-- <div style="width: 100%">
      <a-tabs editable show-add-button>
        <a-tab-pane v-for="item of data" :key="item.key" :title="item.title">
          {{ item?.content }}
        </a-tab-pane>
      </a-tabs>
    </div>
    <yc-tabs editable show-add-button>
      <yc-tab-pane
        v-for="item of data"
        :key="item.key"
        :path="item.key"
        :title="item.title"
      >
        {{ item?.content }}
      </yc-tab-pane>
    </yc-tabs> -->
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
const data = ref(
  new Array(15).fill(0).map((_, i) => {
    return {
      key: `${i}`,
      title: `tab ${i}`,
      content: `Content of Tab Panel ${i}`,
    };
  })
);
const value = ref('');
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
