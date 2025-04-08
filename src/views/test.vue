<template>
  <div class="test">
    <div class="wrapper">
      <ul id="basic-demo">
        <li v-for="(_, index) of Array(40)" :key="index">
          This is the content
        </li>
      </ul>
      <yc-back-top target-container="#basic-demo" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import YcBackTop from '@/components/BackTop/index.vue';
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
