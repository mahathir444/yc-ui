<template>
  <div class="test">
    <a-typography-title :heading="4" ellipsis>
      A design is a plan or specification for the construction of an object or
      system or for the implementation of an activity or process.
    </a-typography-title>
    <yc-typography-title :heading="4" ellipsis>
      A design is a plan or specification for the construction of an object or
      system or for the implementation of an activity or process.
    </yc-typography-title>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
const value = ref('312321');
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
