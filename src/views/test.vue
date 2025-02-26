<template>
  <div class="test">
    <yc-drawer
      v-model:visible="visible"
      title="这是一个测试这是一个测试这是一个测试"
    >
      这是一个测试drawer
    </yc-drawer>
    <!-- 
    <yc-modal
      v-model:visible="visible"
      draggable
      :mask-closable="false"
      title="测试yc"
    >
    </yc-modal> -->

    <!-- <a-modal
      v-model:visible="visible"
      title="测试arco"
      draggable
      :mask-closable="false"
      @cancel="console.log('关闭了')"
    >
      <div>sdadsa</div>
    </a-modal> -->

    <div>
      <a-popover trigger="click" position="br">
        <a-button>click me</a-button>
        <template #content>
          <div class="popover-content">
            <a-empty />
          </div>
        </template>
      </a-popover>
    </div>

    <div>
      <yc-popover trigger="click">
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
