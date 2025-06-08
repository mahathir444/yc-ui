<template>
  <div class="test">
    <a-steps changeable :current="current" @change="setCurrent">
      <a-step description="This is a description">Succeeded</a-step>
      <a-step description="This is a description">Processing</a-step>
      <a-step description="This is a description">Pending</a-step>
    </a-steps>
    <yc-steps changeable :current="current" @change="setCurrent">
      <yc-step description="This is a description">Succeeded</yc-step>
      <yc-step description="This is a description">Processing</yc-step>
      <yc-step description="This is a description">Pending</yc-step>
    </yc-steps>
    <a-space size="large">
      <a-button type="secondary" :disabled="current <= 1" @click="onPrev">
        <IconLeft /> Back
      </a-button>
      <a-button type="primary" :disabled="current >= 3" @click="onNext">
        Next <IconRight />
      </a-button>
    </a-space>
  </div>
</template>

<script lang="ts" setup>
import { ref, h } from 'vue';
const current = ref(1);

function onPrev() {
  current.value = Math.max(1, current.value - 1);
}

function onNext() {
  current.value = Math.min(3, current.value + 1);
}

function setCurrent(current) {
  current = current;
}
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
}

.frame-bg {
  max-width: 780px;
  padding: 40px;
  background: var(--color-fill-2);
}

.frame-body {
  display: flex;
  background: var(--color-bg-2);
}

.frame-aside {
  padding: 24px;
  height: 272px;
  border-right: 1px solid var(--color-border);
}

.frame-main {
  width: 100%;
}

.main-content {
  text-align: center;
  line-height: 200px;
}

.main-bottom {
  display: flex;
  justify-content: center;

  button {
    margin: 0 20px;
  }
}
</style>
