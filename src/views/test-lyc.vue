<template>
  <div class="test">
    <yc-steps changeable label-placement="vertical">
      <yc-step description="This is a description">Succeeded</yc-step>
      <yc-step description="This is a description">Processing</yc-step>
      <yc-step description="This is a description"> Pending </yc-step>
    </yc-steps>
    <yc-progress
      type="circle"
      :percent="1"
      :color="{
        '0%': 'rgb(22, 93, 255)',
        '100%': 'rgb(0, 180, 42)',
      }"
    />
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
