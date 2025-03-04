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

    <yc-scrollbar
      style="height: 200px; width: 200px; overflow: auto"
      ref="scrollbarRef"
    >
      <div
        style="height: 4000px; width: 4000px; background-color: aqua"
        ref="contentRef"
      >
        <div v-for="i in 200" :key="i">{{ i }}</div>
      </div>
    </yc-scrollbar>

    <div>
      <yc-tooltip trigger="click" position="bottom">
        <a-button>测试</a-button>
        <template #content>
          <div class="popover-content">
            <a-empty />
          </div>
        </template>
      </yc-tooltip>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, watchEffect } from 'vue';
import YcScrollbar from '@/packages/Scrollbar';
// const visible = ref<boolean>(false);

// const scrollbarRef = ref<InstanceType<typeof YcScrollbar>>();
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
