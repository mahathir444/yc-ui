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
      <div style="height: 4000px; width: 4000px; background-color: aqua">
        <div v-for="i in 200" :key="i">{{ i }}</div>
      </div>
    </yc-scrollbar>

    <div>
      <yc-popover trigger="click" position="bottom">
        <a-button>popover</a-button>
        <template #content>
          <div class="popover-content">
            <a-empty />
          </div>
        </template>
      </yc-popover>
    </div>

    <div>
      <yc-popover
        trigger="click"
        position="bottom"
        type="success"
        content="这是一个测试"
      >
        <a-button>popconfirm</a-button>
        <a-button>popconfirm</a-button>
        <a-button>popconfirm</a-button>
      </yc-popover>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue';
import YcTrigger from '@/packages/Trigger';
import YcPopover from '@/packages/Popover/index.vue';
import YcTooltip from '@/packages/Tooltip/index.vue';
import YcPopconfirm from '@/packages/Popconfirm/index.vue';
import YcScrollbar from '@/packages/Scrollbar/index.vue';

const visible = ref<boolean>(false);

const scrollbarRef = ref<InstanceType<typeof YcScrollbar>>();

setTimeout(() => {
  scrollbarRef.value?.scrollTop(1000);
}, 1000);
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
