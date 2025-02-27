<template>
  <div class="test">
    <div>
      <a-popconfirm trigger="click" content="pop">
        <a-button>click me</a-button>
      </a-popconfirm>
    </div>

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
import { ref, watch, onMounted } from 'vue';
import YcTrigger from '@/packages/Trigger';
import YcPopover from '@/packages/Popover/index.vue';
import YcTooltip from '@/packages/Tooltip/index.vue';
import YcPopconfirm from '@/packages/Popconfirm/index.vue';

const visible = ref<boolean>(false);
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
