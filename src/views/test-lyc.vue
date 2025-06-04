<template>
  <div class="test">
    <a-row>
      <a-col :flex="1">
        <a-countdown
          title="Countdown"
          :value="now + 1000 * 60 * 60 * 2"
          :now="now"
        />
      </a-col>
      <a-col :flex="1">
        <a-countdown
          title="Milliseconds"
          :value="now + 1000 * 60 * 60 * 2"
          :now="now"
          format="HH:mm:ss.SSS"
        />
      </a-col>
      <a-col :flex="1">
        <a-countdown
          title="Days"
          :value="now + 1000 * 60 * 60 * 24 * 4"
          :now="now"
          format="D 天 H 时 m 分 s 秒"
        />
      </a-col>
    </a-row>
    <a-space direction="vertical" style="margin-top: 10px">
      <a-countdown
        title="Trigger on finish"
        :value="Date.now() + 5 * 1000"
        format="mm:ss.SSS"
        :now="Date.now()"
        :start="start"
        @finish="handleFinish"
      />
      <a-button @click="start = true" type="primary">Start</a-button>
    </a-space>
    <yc-row>
      <yc-col :flex="1">
        <yc-countdown
          title="Countdown"
          :value="now + 1000 * 60 * 60 * 2"
          :now="now"
        />
      </yc-col>
      <yc-col :flex="1">
        <yc-countdown
          title="Milliseconds"
          :value="now + 1000 * 60 * 60 * 2"
          :now="now"
          format="HH:mm:ss.SSS"
        />
      </yc-col>
      <yc-col :flex="1">
        <yc-countdown
          title="Days"
          :value="now + 1000 * 60 * 60 * 24 * 4"
          :now="now"
          format="D 天 H 时 m 分 s 秒"
        />
      </yc-col>
    </yc-row>
    <yc-space direction="vertical" style="margin-top: 10px">
      <yc-countdown
        title="Trigger on finish"
        :value="Date.now() + 5 * 1000"
        format="mm:ss.SSS"
        :now="Date.now()"
        :start="start"
        @finish="handleFinish"
      />
      <yc-button @click="start = true" type="primary">Start</yc-button>
    </yc-space>
    <div :style="{ position: 'relative', width: '440px', height: '280px' }">
      <yc-popover position="tl">
        <yc-button
          class="button"
          :style="{ position: 'absolute', top: '0', left: '70px' }"
          >TL</yc-button
        >
        <template #content>
          <p>Here is the text content</p>
          <p>Here is the text content</p>
        </template>
      </yc-popover>
      <yc-popover position="top">
        <yc-button
          class="button"
          :style="{ position: 'absolute', top: '0', left: '180px' }"
          >TOP</yc-button
        >
        <template #content>
          <p>Here is the text content</p>
          <p>Here is the text content</p>
        </template>
      </yc-popover>
      <yc-popover position="tr">
        <yc-button
          class="button"
          :style="{ position: 'absolute', top: '0', left: '290px' }"
          >TR</yc-button
        >
        <template #content>
          <p>Here is the text content</p>
          <p>Here is the text content</p>
        </template>
      </yc-popover>
      <yc-popover position="bl">
        <yc-button
          class="button"
          :style="{ position: 'absolute', top: '240px', left: '70px' }"
          >BL</yc-button
        >
        <template #content>
          <p>Here is the text content</p>
          <p>Here is the text content</p>
        </template>
      </yc-popover>
      <yc-popover position="bottom">
        <yc-button
          class="button"
          :style="{ position: 'absolute', top: '240px', left: '180px' }"
          >BOTTOM</yc-button
        >
        <template #content>
          <p>Here is the text content</p>
          <p>Here is the text content</p>
        </template>
      </yc-popover>
      <yc-popover position="br">
        <yc-button
          class="button"
          :style="{ position: 'absolute', top: '240px', left: '290px' }"
          >BR</yc-button
        >
        <template #content>
          <p>Here is the text content</p>
          <p>Here is the text content</p>
        </template>
      </yc-popover>
      <yc-popover position="lt">
        <yc-button
          class="button"
          :style="{ position: 'absolute', top: '60px', left: '10px' }"
          >LT</yc-button
        >
        <template #content>
          <p>Here is the text content</p>
          <p>Here is the text content</p>
        </template>
      </yc-popover>
      <yc-popover position="left">
        <yc-button
          class="button"
          :style="{ position: 'absolute', top: '120px', left: '10px' }"
          >LEFT</yc-button
        >
        <template #content>
          <p>Here is the text content</p>
          <p>Here is the text content</p>
        </template>
      </yc-popover>
      <yc-popover position="lb">
        <yc-button
          class="button"
          :style="{ position: 'absolute', top: '180px', left: '10px' }"
          >LB</yc-button
        >
        <template #content>
          <p>Here is the text content</p>
          <p>Here is the text content</p>
        </template>
      </yc-popover>
      <yc-popover position="rt">
        <yc-button
          class="button"
          :style="{ position: 'absolute', top: '60px', left: '350px' }"
          >RT</yc-button
        >
        <template #content>
          <p>Here is the text content</p>
          <p>Here is the text content</p>
        </template>
      </yc-popover>
      <yc-popover position="right">
        <yc-button
          class="button"
          :style="{ position: 'absolute', top: '120px', left: '350px' }"
          >RIGHT</yc-button
        >
        <template #content>
          <p>Here is the text content</p>
          <p>Here is the text content</p>
        </template>
      </yc-popover>
      <yc-popover position="rb">
        <yc-button
          class="button"
          :style="{ position: 'absolute', top: '180px', left: '350px' }"
          >RB</yc-button
        >
        <template #content>
          <p>Here is the text content</p>
          <p>Here is the text content</p>
        </template>
      </yc-popover>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { Message } from '@arco-design/web-vue';

const now = Date.now();
const start = ref(false);
const handleFinish = () => {
  Message.info('Finish');
};
const list = ref([
  ...Array(10000)
    .fill(null)
    .map((_, index) => {
      const prefix = `0000${index}`.slice(-5);
      return {
        title: 'Beijing Bytedance Technology Co., Ltd.',
        description: `(${prefix}) Beijing ByteDance Technology Co., Ltd. is an enterprise located in China.`,
      };
    }),
]);
</script>

<style lang="less" scoped>
.test {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  // align-items: center;
  // justify-content: center;
  gap: 10px;
  .list-demo-action-layout .image-area {
    width: 183px;
    height: 119px;
    border-radius: 2px;
    overflow: hidden;
  }

  .list-demo-action-layout .list-demo-item {
    padding: 20px 0;
    border-bottom: 1px solid var(--color-fill-3);
  }

  .list-demo-action-layout .image-area img {
    width: 100%;
  }

  .list-demo-action-layout .arco-list-item-action .arco-icon {
    margin: 0 4px;
  }
}
</style>
