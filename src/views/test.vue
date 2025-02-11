<template>
  <div class="test">
    <YcDrawer v-model:visible="visible" title="这是一个测试">
      这是一个测试drawer
    </YcDrawer>

    <!-- <YcModal v-model:visible="visible" /> -->

    <!-- <a-modal v-model:visible="visible" @cancel="console.log('关闭了')" /> -->

    <YcButton type="secondary" @click="visible = true">
      <template #icon>
        <svg-icon name="loading" />
      </template>
      测试按钮
    </YcButton>
    <div>
      <a-input
        default-value="text"
        size="mini"
        allow-clear
        show-word-limit
        error
      >
        <template #prefix>
          <svg-icon name="loading" />
        </template>
        <template #prepend> +86 </template>
        <template #suffix>
          <IconPenFill />
        </template>
        <template #append> RMB </template>
      </a-input>
    </div>
    <div>
      <YcInput v-model="text">
        <template #prefix>
          <IconApps />
        </template>
        <template #suffix>
          <IconPenFill />
        </template>
      </YcInput>
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
const text = ref<string>('');
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
