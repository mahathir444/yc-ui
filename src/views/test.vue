<template>
  <div class="test">
    <div style="width: 300px; height: 300px">
      <yc-slider
        v-model="value"
        show-input
        :marks="{
          10: '10km',
          30: '30km',
          60: '60km',
          90: '90km',
        }"
      />
      <!-- <yc-input-number
        v-model="value"
        :step="1.2"
        :precision="1"
        :min="2"
        :max="13"
        placeholder="请输入"
      ></yc-input-number> -->
      <yc-popconfirm content="去INGQUES" type="warning">
        <yc-button>测试</yc-button>
      </yc-popconfirm>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
const value = ref(0);
//
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
