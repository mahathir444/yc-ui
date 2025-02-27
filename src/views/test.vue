<template>
  <div class="test">
    <div>
      <a-popover trigger="click" position="bottom" content-class="aa">
        <a-button>click me</a-button>
        <template #content>
          <div class="popover-content">
            <a-empty />
          </div>
        </template>
      </a-popover>
    </div>

    <div>
      <yc-popover
        v-model:popup-visible="visible"
        trigger="click"
        position="bottom"
      >
        <a-button>click me</a-button>
        <template #content>
          <div class="popover-content">
            <a-empty />
          </div>
        </template>
      </yc-popover>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue';
import { Input } from '@arco-design/web-vue';
import YcDrawer from '@/packages/Drawer';
import YcButton from '@/packages/Button';
import YcLink from '@/packages/Link';
import YcModal from '@/packages/Modal';
import YcInput, {
  InputSearch as YcInputSearch,
  InputPassword as YcInputPassword,
} from '@/packages/Input';
import YcTrigger from '@/packages/Trigger';
import { useElementBounding } from '@vueuse/core';
import YcPopover from '@/packages/Popover/index.vue';

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
