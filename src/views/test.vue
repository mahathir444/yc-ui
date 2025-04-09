<template>
  <div class="test">
    <div style="width: 600px; display: flex">
      <a-skeleton loading animation>
        <a-skeleton-line :rows="3" />
        <a-skeleton-shape />
      </a-skeleton>
    </div>
    <div style="width: 600px; display: flex">
      <yc-shape />
      <yc-skeleton loading>
        <yc-skeleton-line :rows="3" />
        <yc-skeleton-shape />
      </yc-skeleton>
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
