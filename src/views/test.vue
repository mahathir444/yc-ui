<template>
  <div class="test">
    <div style="width: 600px; height: 10px; display: flex">
      <!-- <a-divider direction="horizontal" :size="2"> text </a-divider> -->
      <!-- <yc-divider direction="vertical" /> -->
      <yc-button-group>
        <yc-button> 测试 </yc-button>
        <yc-button> 测试 </yc-button>
        <yc-button> 测试 </yc-button>
        <yc-button> 测试 </yc-button>
      </yc-button-group>
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
