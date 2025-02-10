<template>
  <div class="test">
    <!-- <a-drawer v-model:visible="visible"></a-drawer> -->
    <YcDrawer v-model:visible="visible" title="这是一个测试">
      这是一个测试drawer
    </YcDrawer>
    <a-button href="https://v1.chaoxing.com/manage?refer=">测试</a-button>
    <YcButton status="warning" @click="visible = true">
      <template #icon>
        <IconApps />
      </template>
      这是一个test
    </YcButton>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import YcDrawer from '@/packages/YcDrawer/index.vue';
import YcButton from '@/packages/YcButton/index.vue';
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
