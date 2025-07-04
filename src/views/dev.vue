<template>
  <div class="test">
    <div style="width: 300px">
      <a-select :options="options" multiple allow-clear />
    </div>
    <div style="width: 300px">
      <yc-select :options="options" multiple allow-clear />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, h } from 'vue';
const options = ref<any[]>(
  new Array(30).fill('').map((_v, i) => {
    return {
      label: '选项' + i,
      value: i,
    };
  })
);
</script>

<style lang="less" scoped>
.test {
  height: 100%;
  width: 100%;
  display: flex;
  gap: 10px;
  .resize-left {
    flex: 1;
    height: 500px;
    background-color: blueviolet;
  }
}
</style>
