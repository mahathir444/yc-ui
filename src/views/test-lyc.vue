<template>
  <div class="test">
    <a-input-password
      v-model:visibility="visibility"
      placeholder="Please enter something"
      :style="{ width: '320px' }"
      :defaultVisibility="false"
      allow-clear
    />
    <yc-input
      v-model:visibility="visibility"
      is-password
      placeholder="Please enter something"
      :style="{ width: '320px' }"
      :defaultVisibility="false"
      allow-clear
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const visibility = ref(true);
</script>

<style lang="less" scoped>
.test {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  overflow: hidden;
}
</style>
