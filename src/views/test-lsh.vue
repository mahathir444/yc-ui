<!-- 测试lsh -->
<template>
  <div class="lsh-box">
    <a-button @click="hanClick"> 点击测试 </a-button>
    <div class="lsh-split">
      <div class="lsh-split-right">
        <div
          :style="{
            flex: 1,
            minHeight: 0,
          }"
        >
          <a-typography-paragraph
            >We are building the future of content discovery and
            creation.</a-typography-paragraph
          >
          <a-divider />
          <a-typography-paragraph>
            ByteDance's content platforms enable people to enjoy content powered
            by AI technology. We inform, entertain, and inspire people across
            language, culture and geography.
          </a-typography-paragraph>
          <a-divider>ByteDance</a-divider>
          <a-typography-paragraph
            >Yiming Zhang is the founder and CEO of
            ByteDance.</a-typography-paragraph
          >
        </div>
        <yc-resize-box
          :directions="['top']"
          component="div"
          :style="{
            background: 'rgb(255, 255, 255)',
          }"
        >
          <a-typography-paragraph
            >We are building the future of content discovery and
            creation.</a-typography-paragraph
          >
          <a-divider />
          <a-typography-paragraph>
            ByteDance's content platforms enable people to enjoy content powered
            by AI technology. We inform, entertain, and inspire people across
            language, culture and geography.
          </a-typography-paragraph>
          <a-divider>ByteDance</a-divider>
          <a-typography-paragraph
            >Yiming Zhang is the founder and CEO of
            ByteDance.</a-typography-paragraph
          >
        </yc-resize-box>
      </div>
      <yc-resize-box
        :directions="['left']"
        class="lsh-test-resize"
        component="span"
        :style="{
          // width: '5%',
          minWidth: '2%',
          maxWidth: '10%',
        }"
      >
        <a-typography-paragraph
          >We are building the future of content discovery and
          creation.</a-typography-paragraph
        >
        <a-divider />
        <a-typography-paragraph>
          ByteDance's content platforms enable people to enjoy content powered
          by AI technology. We inform, entertain, and inspire people across
          language, culture and geography.
        </a-typography-paragraph>
        <a-divider>ByteDance</a-divider>
        <a-typography-paragraph
          >Yiming Zhang is the founder and CEO of
          ByteDance.</a-typography-paragraph
        >
      </yc-resize-box>
    </div>
    <yc-resize-box
      :directions="['right', 'bottom']"
      class="lsh-test-resize"
      v-model:height="resizeBox.height"
      v-model:width="resizeBox.width"
      component="span"
    >
      <a-typography-paragraph
        >We are building the future of content discovery and
        creation.</a-typography-paragraph
      >
      <a-divider />
      <a-typography-paragraph>
        ByteDance's content platforms enable people to enjoy content powered by
        AI technology. We inform, entertain, and inspire people across language,
        culture and geography.
      </a-typography-paragraph>
      <a-divider>ByteDance</a-divider>
      <a-typography-paragraph
        >Yiming Zhang is the founder and CEO of
        ByteDance.</a-typography-paragraph
      >
    </yc-resize-box>
    <a-resize-box
      :directions="['right', 'bottom']"
      class="lsh-test-resize"
      v-model:height="resizeBox.height"
      v-model:width="resizeBox.width"
      component="span"
      :style="{
        width: '5%',
        minWidth: '2%',
        maxWidth: '10%',
      }"
    >
      <a-typography-paragraph
        >We are building the future of content discovery and
        creation.</a-typography-paragraph
      >

      <a-divider />
      <a-typography-paragraph>
        ByteDance's content platforms enable people to enjoy content powered by
        AI technology. We inform, entertain, and inspire people across language,
        culture and geography.
      </a-typography-paragraph>
      <a-divider>ByteDance</a-divider>
      <a-typography-paragraph
        >Yiming Zhang is the founder and CEO of
        ByteDance.</a-typography-paragraph
      >
    </a-resize-box>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, h, reactive } from 'vue';
import { Message, Notification } from '@arco-design/web-vue';
import YcMessage from '@/packages/Message/index.ts';
import { messageType } from '@/packages/Message/constants';
import YcNotifi from '@/packages/Notification/index.ts';
import SvgIcon from '@/packages/_components/SvgIcon/index.vue';
import YcResizeBox from '@/packages/ResizeBox/index.vue';
onMounted(() => {});
const resizeBox = reactive({
  width: 0,
  height: 0,
});
let total = 0;
const hanClick = () => {};
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
