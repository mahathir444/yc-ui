<template>
  <div class="test">
    <div>
      <a-tooltip trigger="click" position="bottom" content="123" mini>
        <a-button>click me</a-button>
        <!-- <template #content>
          <div class="popover-content">
            <a-empty />
          </div>
        </template> -->
      </a-tooltip>
    </div>

    <div>
      <yc-tooltip trigger="contextMenu" position="bottom">
        <a-button>click me</a-button>
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
import { ref, watch, onMounted } from 'vue';
import YcTrigger from '@/packages/Trigger';
import YcPopover from '@/packages/Popover/index.vue';
import YcTooltip from '@/packages/Tooltip/index.vue';

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
  // background-color: #fff;
  // border-radius: 4px;
}
</style>
