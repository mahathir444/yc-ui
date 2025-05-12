<template>
  <div class="test">
    <a-pagination
      :total="200"
      show-total
      show-jumper
      show-page-size
      :bufferSize="3"
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
