<template>
  <div class="test">
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

    <yc-trigger>
      <a-button>trigger</a-button>
      <template #content>
        <div class="popover-content">
          <a-empty />
        </div>
      </template>
    </yc-trigger>

    <yc-popconfirm type="warning" content="你要删除嘛">
      <a-button>popconfirm</a-button>
    </yc-popconfirm>

    <yc-popover>
      <a-button>popover</a-button>
      <template #content>
        <div class="popover-content">
          <a-empty />
        </div>
      </template>
    </yc-popover>

    <yc-tooltip>
      <a-button>tooltip</a-button>
      <template #content>
        <div class="popover-content">
          <a-empty />
        </div>
      </template>
    </yc-tooltip>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, watchEffect } from 'vue';
import YcScrollbar from '@/packages/Scrollbar';
import YcPopconfirm from '@/packages/Popconfirm';
import YcPopover from '@/packages/Popover';
import YcTooltip from '@/packages/Tooltip';
import YcTrigger from '@/packages/Trigger';
const total = ref(1);
const visible = ref(true);
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
