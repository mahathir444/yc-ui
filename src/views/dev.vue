<template>
  <div class="test">
    <yc-button
      @click="
        $notification.info({
          content: '测试',
          duration: 1000000000,
          position: 'bottomLeft',
        })
      "
    >
      测试Noti
    </yc-button>
  </div>
</template>

<script lang="ts" setup>
import { ref, h } from 'vue';
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
