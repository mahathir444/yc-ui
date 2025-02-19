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
      <a-trigger trigger="click">
        <a-button>Click Me</a-button>
        <template #content>
          <div
            class="trigger-demo-nest"
            style="background-color: aquamarine; padding: 20px"
          >
            <a-empty />
          </div>
        </template>
      </a-trigger>
    </div>

    <div ref="btnRef">
      <yc-trigger>
        <a-button class="test-btn">Click Me</a-button>
        <template #header>
          <div>
            <a-empty />
          </div>
        </template>
        <template #content>
          <div
            class="trigger-demo-nest"
            style="background-color: aquamarine; padding: 20px"
          >
            <a-empty />
          </div>
        </template>
      </yc-trigger>
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
import YcTrigger from '@/packages/Trigger/index.vue';
import { useElementBounding } from '@vueuse/core';

const btnRef = ref(null);

const visible = ref<boolean>(false);
const text = ref<string>('');
const text1 = ref<string>('');
const text2 = ref<string>('');
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
</style>
