<template>
  <div class="test">
    <div>
      <a-popover
        trigger="hover"
        position="right"
        content="123"
        :popup-offset="100"
        :popup-hover-stay="false"
      >
        <a-button>click me</a-button>
        <template #content>
          <div class="popover-content">
            <a-empty />
          </div>
        </template>
      </a-popover>
    </div>

    <a-alert>This is an info alert.</a-alert>

    <div>
      <yc-tooltip trigger="click" position="bottom">
        <a-button>click me</a-button>
        <template #content>
          <a-empty />
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
  background-color: #fff;
  border-radius: 4px;
}
</style>
