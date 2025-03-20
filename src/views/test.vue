<template>
  <div class="test">
    <div style="width: 300px">
      select
      <yc-select
        allow-clear
        allow-search
        multiple
        placeholder="请选择"
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
        @dropdown-reach-bottom="
          () => {
            console.log('触底了');
          }
        "
      >
        <template #prefix>
          <div>测试测</div>
        </template>
      </yc-select>
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
    <div style="width: 300px">
      auto-complete
      <yc-auto-complete />
    </div>
    <div style="width: 300px">
      input
      <yc-input allow-clear :max-length="100" show-word-limit />
    </div>
    <div style="width: 300px">
      text-area
      <yc-textarea allow-clear :max-length="100" show-word-limit />
    </div>

    <div style="width: 300px">
      <a-select
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
      <a-input-tag v-model="value1" allow-clear placeholder="请输入">
        <template #suffix>
          <icon-align-center />
        </template>
      </a-input-tag>
    </div>
    <div>
      <yc-button @click="visible = true">测试</yc-button>
    </div>
    <a-modal
      v-model:visible="visible"
      title="测试"
      :on-before-cancel="() => false"
      :on-before-ok="onBeforeOk"
      :ok-loading="loading"
    >
    </a-modal>

    <yc-popover trigger="click">
      <yc-link> 测试</yc-link>
      <template #content>
        <div style="width: 200px">
          <a-empty description="测试" />
        </div>
      </template>
    </yc-popover>
    <yc-checkbox-group></yc-checkbox-group>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, watchEffect } from 'vue';
import { sleep } from '@/components/_utils/fn';
const value = ref([]);
const value1 = ref([]);
const options = ref<any[]>([]);
for (let i = 0; i < 20; i++) {
  options.value.push({
    text: '选项' + i,
    key: i,
  });
}

const visible = ref(false);
const loading = ref(false);
const onBeforeOk = async () => {
  loading.value = true;
  await sleep(1000);
  loading.value = false;
  return true;
};
</script>

<style lang="less" scoped>
.test {
  height: 100%;
  width: 100%;
  height: 300vh;
  width: 300vw;
  overflow: auto;
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
