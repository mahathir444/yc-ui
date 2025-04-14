<template>
  <a-layout class="container">
    <a-layout-header
      style="background-color: rgb(242, 243, 245); height: 50px"
    />
    <a-layout class="wrapper">
      <a-layout-sider />
      <a-layout-content class="main" id="main">
        <div class="content" id="content">
          <!-- <yc-row style="width: 100%" :gutter="100">
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
          </yc-row> -->
          <yc-transfer :data="options" show-search one-way disabled />
          <a-transfer
            :data="options"
            show-search
            :show-select-all="false"
            one-way
            simple
          />
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import YcTransfer from '@/components/Transfer/index.vue';
const value = ['option1', 'option3', 'option5'];
const options = Array(8)
  .fill(undefined)
  .map((_, index) => ({
    value: `option${index + 1}`,
    label: `Option ${index + 1}`,
  }));
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
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
