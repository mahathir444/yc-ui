<template>
  <div class="test">
    <div style="width: 300px">
      <yc-select
        v-model="value"
        placeholder="请选择"
        :multiple="true"
        :field-names="{
          label: 'text',
          value: 'key',
        }"
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
    <div style="width: 300px">
      <yc-input-tag
        v-model="value"
        placeholder="请输入"
        :field-names="{
          label: 'text',
          value: 'key',
        }"
      />
    </div>
    <div style="width: 300px">
      <yc-auto-complete />
    </div>
    <div style="width: 300px">
      <a-select
        v-model="value1"
        placeholder="请选择"
        allow-search
        allow-clear
        :multiple="true"
        :search-delay="500"
        :options="[
          {
            label: '分组1',
            isGroup: true,
            options,
          },
        ]"
        :limit="10"
        :field-names="{
          label: 'text',
          value: 'key',
        }"
        @search="() => console.log('search')"
      >
      </a-select>
    </div>
    <div style="width: 300px">
      <a-input-tag
        v-model="value1"
        placeholder="请输入"
        size="small"
        :max-tag-count="4"
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
    text: '选项' + i,
    key: i,
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
