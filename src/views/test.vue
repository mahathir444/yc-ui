<template>
  <div class="test">
    <div style="width: 300px">
      <yc-input
        allow-clear
        :max-length="10"
        :word-length="(value) => value.length - 2"
        show-word-limit
      />
    </div>
    <div style="width: 300px">
      input-tag
      <yc-input-tag
        placeholder="请输入"
        :field-names="{
          label: 'text',
          value: 'key',
        }"
        allow-clear
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, watchEffect } from 'vue';
const value = ref([]);
const value1 = ref([]);
const options = ref<any[]>([]);
for (let i = 0; i < 20; i++) {
  options.value.push({
    label: '选项' + i,
    value: i,
  });
}
</script>

<style lang="less" scoped>
.test {
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.popover-content {
  width: 200px;
  background-color: #fff;
  border: 1px solid rgb(229, 230, 235);
  border-radius: 4px;
  box-shadow: 0 4px 10px #0000001a;
}
</style>
