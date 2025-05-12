<template>
  <div class="test">
    <a-pagination :total="100" show-total show-jumper show-page-size />
    <yc-pagination :total="100" show-total show-jumper show-page-size />
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
</script>

<style lang="less" scoped>
.test {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  // align-items: center;
  // justify-content: center;
  gap: 10px;
}
</style>
