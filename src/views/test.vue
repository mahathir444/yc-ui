<template>
  <!-- <a-layout class="container">
    <a-layout-header style="height: 60px" />
    <a-layout class="wrapper">
      <a-layout-sider />
      <a-layout-content class="main">
        <div class="content" id="content">
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

          <yc-verification-code />
          <a-verification-code @finish="handleFinish" />
          <a-cascader
            :options="classOptions"
            multiple
            placeholder="请选择"
            :max-tag-count="1"
            tag-nowrap
          />
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout> -->
  <yc-layout>
    <yc-header> </yc-header>
    <yc-content></yc-content>
    <yc-footer></yc-footer>
  </yc-layout>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
const value = ['option1', 'option3', 'option5'];
const classOptions = new Array(3).fill(1).map((_, i) => {
  return {
    label: `高${i + 1}`,
    value: 'g' + i,
    children: new Array(3).fill(1).map((_, v) => {
      return {
        label: `高${i + 1}-${v + 1}班`,
        value: `c${i}-${v}`,
      };
    }),
  };
});
const options = Array(8)
  .fill(undefined)
  .map((_, index) => ({
    value: `option${index + 1}`,
    label: `Option ${index + 1}`,
  }));
const handleFinish = () => {
  console.log('finish');
};
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

.yc-layout-header {
  background-color: aqua;
  height: 60px;
}
.yc-layout-content {
  background-color: blue;
}
.yc-layout-footer {
  background-color: black;
  height: 60px;
}
</style>
