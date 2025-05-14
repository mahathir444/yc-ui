<template>
  <div class="test">
    <div style="width: 600px">
      <yc-steps type="default" changeable>
        <yc-step description="This is a description">Succeeded</yc-step>
        <yc-step description="This is a description">Processing</yc-step>
        <yc-step description="This is a description"> Pending </yc-step>
      </yc-steps>
      <a-steps style="margin-top: 50px" type="navigation" small changeable>
        <a-step description="This is a description">Succeeded</a-step>
        <a-step description="This is a description">Processing</a-step>
        <a-step description="This is a description"> Pending </a-step>
      </a-steps>
    </div>
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
