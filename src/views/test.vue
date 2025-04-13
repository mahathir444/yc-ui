<template>
  <a-layout class="container">
    <a-layout-header
      style="background-color: rgb(242, 243, 245); height: 50px"
    />
    <a-layout class="wrapper">
      <a-layout-sider />
      <a-layout-content class="main" id="main">
        <div class="content" id="content">
          <a-row style="width: 100%" :gutter="100">
            <a-col
              :span="8"
              :xs="{ offset: 1 }"
              :sm="{ offset: 2 }"
              :md="{ offset: 3 }"
              :lg="{ offset: 4 }"
              :xxl="{ offset: 5 }"
            >
              11
            </a-col>
            <a-col :span="8">22 </a-col>
            <a-col :span="8">33 </a-col>
            <a-col :span="8">44 </a-col>
            <a-col :span="8">55 </a-col>
            <!-- <a-col :span="8">bb </a-col> -->
          </a-row>
          <yc-row style="width: 100%" :gutter="100">
            <yc-col
              :span="8"
              :xs="{ offset: 1 }"
              :sm="{ offset: 2 }"
              :md="{ offset: 3 }"
              :lg="{ offset: 4 }"
              :xl="{ offset: 5 }"
              :xxl="{ offset: 6 }"
            >
              aa
            </yc-col>
            <yc-col :span="8">bb </yc-col>
          </yc-row>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { TableColumnData } from '@arco-design/web-vue';
import YcRow from '@/components/Grid/Row.vue';
import YcCol from '@/components/Grid/Col.vue';
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
.container {
  height: 100%;

  .wrapper {
    height: calc(100% - 50px);
    .main {
      overflow: auto;
    }
    .content {
      height: 100%;
      // height: 300vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .arco-col {
        background: blue;
        color: #fff;
      }
      .yc-col {
        background: blue;
        color: #fff;
      }
    }
    .content1 {
      height: 300vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
