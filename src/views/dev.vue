<template>
  <div class="test">
    <a-space size="large" direction="vertical">
      <a-space size="large">
        <a-avatar :size="64">Arco</a-avatar>
        <a-avatar :size="40">Arco</a-avatar>
        <a-avatar :size="32">Arco</a-avatar>
        <a-avatar :size="24">Arco</a-avatar>
      </a-space>
      <a-space size="large">
        <a-avatar :size="64" shape="square">Arco</a-avatar>
        <a-avatar :size="40" shape="square">Arco</a-avatar>
        <a-avatar :size="32" shape="square">Arco</a-avatar>
        <a-avatar :size="24" shape="square">Arco</a-avatar>
      </a-space>
    </a-space>
    <yc-space size="large" direction="vertical">
      <yc-space size="large">
        <yc-avatar :size="64">Arco</yc-avatar>
        <yc-avatar :size="40">Arco</yc-avatar>
        <yc-avatar :size="32">Arco</yc-avatar>
        <yc-avatar :size="24">Arco</yc-avatar>
      </yc-space>
      <yc-space size="large">
        <yc-avatar :size="64" shape="square">Arco</yc-avatar>
        <yc-avatar :size="40" shape="square">Arco</yc-avatar>
        <yc-avatar :size="32" shape="square">Arco</yc-avatar>
        <yc-avatar :size="24" shape="square">Arco</yc-avatar>
      </yc-space>
    </yc-space>
  </div>
</template>

<script lang="ts" setup>
import { ref, h } from 'vue';
</script>

<style lang="less" scoped>
.test {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
