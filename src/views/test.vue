<template>
  <div class="test">
    <YcDrawer v-model:visible="visible" title="这是一个测试">
      这是一个测试drawer
    </YcDrawer>

    <!-- <YcModal v-model:visible="visible" /> -->

    <!-- <a-modal v-model:visible="visible" @cancel="console.log('关闭了')" /> -->

    <YcButton type="secondary" @click="visible = true">
      <template #icon>
        <IconApps />
      </template>
      测试按钮
    </YcButton>

    <div>
      <YcInput />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import YcDrawer from '@/packages/Drawer';
import YcButton from '@/packages/Button';
import YcLink from '@/packages/Link';
import YcModal, { ModalService } from '@/packages/Modal';
import YcInput from '@/packages/Input/index.vue';
const visible = ref<boolean>(false);
</script>

<style lang="less" scoped>
.test {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
}
</style>
