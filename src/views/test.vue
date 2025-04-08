<template>
  <div class="test">
    <div style="width: 600px; display: flex">
      <yc-result subtitle="This page isn’t working." title="404" status="404">
        <template #extra>
          <yc-button type="primary" style="margin-right: 8px"
            >go back</yc-button
          >
          <yc-button>cancel</yc-button>
        </template>
      </yc-result>
      <a-result subtitle="This page isn’t working." title="404" status="404">
        <template #extra>
          <yc-button type="primary" style="margin-right: 8px"
            >go back</yc-button
          >
          <yc-button>cancel</yc-button>
        </template>
      </a-result>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
const value = ref('dsadsa');
const options = [
  'Bytedance',
  'Bytedesign',
  'Bytenumner',
  '1',
  '2',
  '3',
  '4',
].map((item) => {
  return {
    label: item,
    value: item,
  };
});
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
  .wrapper {
    position: relative;

    ul {
      height: 200px;
      overflow-y: auto;

      li {
        line-height: 30px;
      }
    }
  }
}
</style>
