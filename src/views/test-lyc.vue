<template>
  <div class="test">
    <a-progress :steps="3" status="danger" size="small" :percent="0.3" />
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
const visible = ref<boolean>(false);
</script>

<style lang="less" scoped>
.test {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
</style>
