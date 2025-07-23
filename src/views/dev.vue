<template>
  <div class="test">
    <a-alert banner center>This is an info alert.</a-alert>
    <yc-alert banner center>This is an info alert.</yc-alert>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
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
