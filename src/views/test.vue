<template>
  <div class="test">
    <YcDrawer v-model:visible="visible" title="这是一个测试">
      这是一个测试drawer
    </YcDrawer>

    <!-- <a-button-group status="warning" type="dashed">
      <a-button>测试</a-button>
      <a-button>测试1</a-button>
    </a-button-group> -->
    <a-link>
      <template #icon> <IconApps /> </template>
      测试
    </a-link>

    <YcLink>
      <template #icon>
        <IconApps />
      </template>
      测试
    </YcLink>

    <!-- <YcModal v-model:visible="visible" :top="300" /> -->

    <!-- <a-modal v-model:visible="visible" :align-center="false" :top="200" /> -->

    <YcButton type="secondary" @click="visible = true">
      <template #icon>
        <IconApps />
      </template>
      测试按钮
    </YcButton>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import YcDrawer from '@/packages/YcDrawer/index.vue';
import YcButton from '@/packages/YcButton/index.vue';
import YcLink from '@/packages/YcLink/index.vue';
import YcModal from '@/packages/YcModal/index.vue';
const visible = ref<boolean>(true);
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
