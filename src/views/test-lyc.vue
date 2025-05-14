<template>
  <div class="test">
    <a-progress
      type="circle"
      :percent="1"
      :color="{
        '0%': 'rgb(22, 93, 255)',
        '100%': 'rgb(0, 180, 42)',
      }"
    />
    <yc-progress
      type="circle"
      :percent="1"
      :color="{
        '0%': 'rgb(22, 93, 255)',
        '100%': 'rgb(0, 180, 42)',
      }"
    />
    <!-- <a-progress type="line" status="danger" size="small" /> -->
    <icon-check color="rgb(0, 180, 42)" />
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { IconCheck } from '@shared/icons';
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
