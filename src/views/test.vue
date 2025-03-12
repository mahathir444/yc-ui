<template>
  <div class="test">
    <a-button @click="total += 10">点击total+10</a-button>
    <a-button @click="total -= 10">点击total-10</a-button>
    <yc-scrollbar
      style="height: 200px; width: 100%; overflow: auto"
      ref="scrollbarRef"
    >
      <div
        style="min-height: 200px; background-color: aquamarine; width: 200px"
      >
        <div v-for="i in total" :key="i">{{ i }}</div>
      </div>
    </yc-scrollbar>

    <div style="width: 300px">
      <yc-select
        placeholder="请选择"
        :options="[
          {
            label: '1',
            value: 1,
          },
        ]"
      >
        <yc-option v-for="i in 6" :key="i" :value="i" :label="i.toString()">
          <template #icon>
            <icon-align-center />
          </template>
          <template #suffix>
            <icon-align-center />
          </template>
        </yc-option>
      </yc-select>
    </div>

    <div style="width: 300px">
      <a-select
        placeholder="请选择"
        :options="[
          {
            label: '1',
            value: 1,
          },
        ]"
        allow-search
        allow-clear
      >
        <a-option v-for="i in 6" :key="i" :value="i" :label="i.toString()">
          <template #icon>
            <icon-align-center />
          </template>
          test
          <template #suffix>
            <icon-align-center />
          </template>
        </a-option>
      </a-select>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, watchEffect } from 'vue';
import YcScrollbar from '@/components/Scrollbar';
import YcTag from '@/components/Tag/index.vue';
import YcSelect from '@/components/Select/Select.vue';
import YcOption from '@/components/Select/Option.vue';
import YcDropdown, { DOption as YcDoption } from '@/components/Dropdown';
import YcButton, { ButtonGroup } from '@/components/Button';
const total = ref(1);
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
