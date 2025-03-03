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
      <yc-popconfirm
        trigger="click"
        position="bottom"
        type="success"
        content="这是一个测试"
      >
        <a-button>popconfirm</a-button>
      </yc-popconfirm>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, watchEffect } from 'vue';
import YcTrigger from '@/packages/Trigger';
import YcPopover from '@/packages/Popover';
import YcTooltip from '@/packages/Tooltip';
import YcPopconfirm from '@/packages/Popconfirm';
import YcScrollbar from '@/packages/Scrollbar';

const visible = ref<boolean>(false);

const scrollbarRef = ref<InstanceType<typeof YcScrollbar>>();
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
