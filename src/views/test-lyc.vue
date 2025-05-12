<template>
  <div class="test">
    <a-pagination
      :total="200"
      show-total
      show-jumper
      show-page-size
      :base-size="100"
      :bufferSize="3"
      size="large"
    />
    <yc-pagination
      :total="200"
      show-total
      show-jumper
      show-page-size
      :bufferSize="3"
    />
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
  align-items: center;
  justify-content: center;
  gap: 10px;
}
</style>
