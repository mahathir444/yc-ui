<template>
  <div class="test">
    <div style="width: 80%">
      <yc-steps changeable :current="current" @change="setCurrent">
        <yc-step description="This is a description">Succeeded</yc-step>
        <yc-step description="This is a description">Processing</yc-step>
        <yc-step description="This is a description">Pending</yc-step>
      </yc-steps>
    </div>
    <div
      :style="{
        width: '100%',
        height: '200px',
        textAlign: 'center',
        background: 'var(--color-bg-2)',
        color: '#C2C7CC',
      }"
    >
      <div style="line-height: 160px">Step{{ current }} Content</div>
      <yc-space size="large">
        <yc-button type="secondary" :disabled="current <= 1" @click="onPrev">
          <IconLeft /> Back
        </yc-button>
        <yc-button type="primary" :disabled="current >= 3" @click="onNext">
          Next <IconRight />
        </yc-button>
      </yc-space>
    </div>
    <!-- <div style="width: 100%">
      <yc-tabs editable show-add-button>
        <yc-tab-pane v-for="item of data" :key="item.key" :title="item.title">
          {{ item?.content }}
        </yc-tab-pane>
      </yc-tabs>
    </div>
    <yc-tabs editable show-add-button>
      <yc-tab-pane
        v-for="item of data"
        :key="item.key"
        :path="item.key"
        :title="item.title"
      >
        {{ item?.content }}
      </yc-tab-pane>
    </yc-tabs> -->
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
const current = ref(1);
function onPrev() {
  current.value = Math.max(1, current.value - 1);
}

function onNext() {
  current.value = Math.min(3, current.value + 1);
}
function setCurrent(value: number) {
  console.log(value, 'value');

  current.value = value;
}
const data = ref(
  new Array(15).fill(0).map((_, i) => {
    return {
      key: `${i}`,
      title: `tab ${i}`,
      content: `Content of Tab Panel ${i}`,
    };
  })
);
const value = ref('');
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
  overflow: hidden;
}
</style>
