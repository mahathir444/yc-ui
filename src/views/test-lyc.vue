<template>
  <div class="test">
    <a-pagination :total="200">
      <template #page-item="{ page }"> - {{ page }} - </template>
      <template #page-item-step="{ type }">
        <icon-send
          :style="
            type === 'previous' ? { transform: `rotate(180deg)` } : undefined
          "
        />
      </template>
      <template #page-item-ellipsis>
        <icon-sun-fill />
      </template>
    </a-pagination>
    <yc-pagination :total="200">
      <template #page-item="{ page }"> - {{ page }} - </template>
      <template #page-item-step="{ type }">
        <icon-send
          :style="
            type === 'previous' ? { transform: `rotate(180deg)` } : undefined
          "
        />
      </template>
      <template #page-item-ellipsis>
        <icon-sun-fill />
      </template>
    </yc-pagination>
  </div>
</template>

<script lang="ts" setup>
import { ref, h } from 'vue';
const size = ref('medium');
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
