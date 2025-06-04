<template>
  <div class="test"></div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
const position = ref('left');
const hideIcon = ref(false);
</script>

<style lang="less" scoped>
.test {
  height: 150vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  // align-items: center;
  // justify-content: center;
  gap: 10px;
}
</style>
