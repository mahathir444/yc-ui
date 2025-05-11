<template>
  <div class="test">
    <a-steps direction="vertical" type="arrow" small changeable>
      <a-step description="This is a description">Succeeded</a-step>
      <a-step description="This is a description">Processing</a-step>
      <a-step description="This is a description">Pending</a-step>
    </a-steps>
    <!-- label-placement="vertical" -->
    <yc-steps direction="vertical" type="arrow" small changeable>
      <yc-step description="This is a description">Succeeded</yc-step>
      <yc-step description="This is a description">Processing</yc-step>
      <yc-step description="This is a description"> Pending </yc-step>
    </yc-steps>
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
