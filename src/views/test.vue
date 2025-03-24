<template>
  <div class="test">
    <div style="width: 300px">
      inputNumber
      <yc-input-number
        v-model="value"
        :step="1.2"
        :precision="5"
        :min="-100000.0000001"
        :max="1000"
        placeholder="请输入"
      ></yc-input-number>
    </div>
    <div style="width: 300px">
      switch
      <yc-switch checked-text="启动" unchecked-text="关闭" :loading="loading">
        <template #checked-icon>
          <icon-check />
        </template>
        <template #unchecked-icon>
          <icon-close />
        </template>
      </yc-switch>
      <a-switch checked-text="启动" unchecked-text="关闭" :loading="loading">
        <template #checked-icon>
          <icon-check />
        </template>
        <template #unchecked-icon>
          <icon-close />
        </template>
      </a-switch>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import YcInputNumber from '@/components/InputNumber/index.vue';
const value = ref('');
const value1 = ref([]);
const loading = ref(false);
const options = ref<any[]>([]);
for (let i = 0; i < 20; i++) {
  options.value.push({
    label: '选项' + i,
    value: i,
  });
}

watch(value, () => {
  console.log(value.value);
  console.log(typeof value.value);
});
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
