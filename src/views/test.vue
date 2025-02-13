<template>
  <div class="test">
    <!-- <yc-drawer
      v-model:visible="visible"
      title="这是一个测试这是一个测试这是一个测试"
    >
      这是一个测试drawer
    </yc-drawer> -->

    <yc-modal
      v-model:visible="visible"
      draggable
      :mask-closable="false"
      title="测试yc"
    >
    </yc-modal>

    <!-- <a-modal
      v-model:visible="visible"
      title="测试arco"
      simple
      :mask-closable="false"
      @cancel="console.log('关闭了')"
    >
      <div>sdadsa</div>
    </a-modal> -->

    <yc-button type="outline" status="warning" @click="visible = true">
      <template #icon>
        <svg-icon name="close" />
      </template>
      测试按钮
    </yc-button>

    <yc-link status="success" disabled>
      <template #icon>
        <svg-icon name="close" />
      </template>
      测试link
    </yc-link>

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
          <icon-pen-fill />
        </template>
        <template #append> RMB </template>
      </a-input>
    </div>

    <div>
      <yc-input v-model="text">
        <template #prefix>
          <svg-icon name="close" />
        </template>
        <template #suffix>
          <icon-pen-fill />
        </template>
      </yc-input>
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
const visible = ref<boolean>(true);
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
