<template>
  <div class="test">
    <div style="width: 300px">
      <a-select
        placeholder="请选择"
        allow-search
        allow-clear
        :multiple="false"
        :bordered="false"
      >
        <a-option
          v-for="i in 6"
          :key="i"
          :value="i"
          :index="6 - i"
          :label="i.toString()"
        >
          <template #icon>
            <icon-align-center />
          </template>
          test{{ i }}
          <template #suffix>
            <icon-align-center />
          </template>
        </a-option>
      </a-select>
    </div>
    <div style="width: 300px">
      <yc-select
        v-model="value"
        placeholder="请选择"
        :multiple="true"
        :field-names="{
          label: 'text',
          value: 'key',
        }"
        :options="options"
      >
      </yc-select>
    </div>
    <div style="width: 300px">
      <yc-input-tag
        v-model="value1"
        placeholder="请输入"
        :field-names="{
          label: 'text',
          value: 'key',
        }"
      />
      <!-- <yc-input />
      <yc-textarea /> -->
    </div>
    <div style="width: 300px">
      <a-input-tag placeholder="请输入" size="small" :max-tag-count="4" />
      <a-tag size="large">测试</a-tag>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, watchEffect } from 'vue';
const total = ref(1);
const value = ref([]);
const value1 = ref([]);
const options = ref<any[]>([]);
for (let i = 0; i < 20; i++) {
  options.value.push({
    text: '选项' + i,
    value: i,
  });
}
watch(
  value1,
  () => {
    console.log(value1.value, 'value1');
  },
  {
    deep: true,
  }
);
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
