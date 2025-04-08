<template>
  <div class="test">
    <div style="width: 600px; display: flex">
      <yc-space>
        <template #split>
          <a-divider direction="vertical" />
        </template>
        <yc-link>测试</yc-link>
        <yc-button>测试</yc-button>
        <yc-button>测试</yc-button>
      </yc-space>
      <!-- 4 8 16 24 -->
      <a-space>
        <template #split>
          <a-divider direction="vertical" />
        </template>
        <yc-link>测试</yc-link>
        <yc-button>测试</yc-button>
        <yc-button>测试</yc-button>
      </a-space>
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
