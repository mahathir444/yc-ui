<template>
  <div class="test">
    <div style="width: 300px">
      select
      <yc-select
        allow-clear
        allow-search
        multiple
        placeholder="请选择"
        :options="[
          {
            label: '分组1',
            isGroup: true,
            options,
          },
        ]"
      >
      </yc-select>
    </div>
    <div style="width: 300px; height: 300px">
      slider
      <yc-slider v-model="value" />
      <a-slider direction="vertical" show-ticks :step="5" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import YcSlider from '@/components/Slider/index.vue';
const value = ref(60);
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
