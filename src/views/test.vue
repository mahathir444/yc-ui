<template>
  <div class="test">
    <div>
      <a-popconfirm trigger="click" content="pop">
        <a-button>click me</a-button>
      </a-popconfirm>
    </div>

    <a-scrollbar style="height: 200px; width: 200px; overflow: auto">
      <div style="height: 2000px; background-color: aqua">
        <div v-for="i in 200" :key="i">{{ i }}</div>
      </div>
    </a-scrollbar>

    <a-button @click="total += 10">点击total+10</a-button>
    <a-button @click="total -= 10">点击total-10</a-button>
    <yc-scrollbar
      style="height: 200px; width: 100%; overflow: auto"
      ref="scrollbarRef"
    >
      <div
        style="min-height: 200px; background-color: aquamarine; width: 200px"
      >
        <div v-for="i in total" :key="i">{{ i }}</div>
      </div>
    </yc-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, watchEffect } from 'vue';
import YcScrollbar from '@/packages/Scrollbar';
const total = ref(1);
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
}

.popover-content {
  width: 200px;
  background-color: #fff;
  border-radius: 4px;
}
</style>
