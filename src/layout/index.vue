<template>
  <div class="layout">
    <div @click="visible = true">这是有个测试</div>
    <YcDrawer v-model:visible="visible" />
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import YcDrawer from '@/views/YcDrawer/index.vue';
const visible = ref<boolean>(false);
</script>

<style lang="less" scoped></style>
