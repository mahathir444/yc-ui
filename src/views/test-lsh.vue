<!-- 测试lsh -->
<template>
  <div class="lsh-box">
    <a-button @click="hanClick"> 点击测试 </a-button>
    <ATimePicker v-bind="config" type="time" />
    <ATimePicker
      v-bind="config"
      v-model:model-value="v"
      @change="hanChange"
      @select="hanSelect"
    >
      <template #extra> 11 </template>
    </ATimePicker>
    <YcTimePicker
      v-bind="config"
      v-model:model-value="v"
      @change="hanChange"
      @select="hanSelect"
    >
      <template #extra> 11 </template>
    </YcTimePicker>
    <a-popover title="Title">
      <a-button>Hover</a-button>
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </a-popover>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, h, reactive } from 'vue';
import { Message, Notification } from '@arco-design/web-vue';
import YcMessage from '@/components/Message/index.ts';
import { MESSAGE_TYPE } from '@/components/Message/constants';
import YcNotifi from '@/components/Notification/index.ts';
import YcResizeBox from '@/components/ResizeBox/index.vue';
import YcTimePicker from '@/components/TimePicker/index.vue';
onMounted(() => {});
const resizeBox = reactive({
  width: 0,
  height: 0,
});
let total = 0;
const v = ref('');
const config = {
  format: 'HH:mm:ss',
  type: 'time-range',
  use12Hours: !true,
  // disableConfirm: true,
  // disabledHours: () => [1, 2, 4, 14],
  // disabledMinutes: (v) => {
  //   return [];
  // },
  // disabledSeconds: () => [1, 2, 3, 4, 5, 6, 7, 10, 14, 60],
  hideDisabledOptions: true,
  // error:true,
  // readonly:!true,
  // disabled:true,
  // step: {
  //   hour: 2,
  //   minute: 5,
  //   second: 10,
  // },
  placeholder: ['测试', '测试'],
};
const hanClick = () => {};
const hanChange = (...rest) => {
  console.log('change', rest);
};
const hanSelect = (...rest) => {
  console.log('select', rest);
};
</script>
<style scoped lang="less">
.lsh-box {
  width: 100%;
  height: 100%;
  display: flex;
  gap: 20px;
  // background-image: radial-gradient(red 1px, rgba(0, 0, 0, 0) 1px);
  // background-size: 16px 16px;
  // align-items: center;
  .resizebox-demo {
    width: 100%;
    height: 100%;
    &.resizebox-demo-vertical {
      flex-direction: column;
      .resizebox-demo-line {
        width: 10px;
        height: 100%;
        // &:hover {
        //   width: 20px;
        // }
      }
    }
    &.resizebox-demo-horizontal {
      .resizebox-demo-line {
        height: 10px;
      }
    }
    .resizebox-demo-line {
      background-color: red;
      flex: 1;
    }
  }
  .lsh-test-resize {
    width: 200px;
    min-width: 100px;
    // max-width: 300px;
  }
  .lsh-split {
    display: flex;
    max-width: 800px;
    border: 1px solid red;
    flex: 1;
    overflow: hidden;
    .lsh-split-right {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
  }
}
</style>
