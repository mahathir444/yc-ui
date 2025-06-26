<template>
  <div class="test">
    <a-cascader
      :options="options"
      :style="{ width: '320px' }"
      placeholder="Please select ..."
      expand-child
    />
    <yc-cascader
      :options="options"
      :style="{ width: '320px' }"
      placeholder="Please select ..."
      expand-child
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
const fieldNames = { value: 'city', label: 'text' };
const options = [
  {
    value: 'beijing',
    label: 'Beijing',
    children: [
      {
        value: 'chaoyang',
        label: 'ChaoYang',
        children: [
          {
            value: 'datunli',
            label: 'Datunli',
          },
        ],
      },
      {
        value: 'haidian',
        label: 'Haidian',
      },
      {
        value: 'dongcheng',
        label: 'Dongcheng',
      },
      {
        value: 'xicheng',
        label: 'Xicheng',
        children: [
          {
            value: 'jinrongjie',
            label: 'Jinrongjie',
          },
          {
            value: 'tianqiao',
            label: 'Tianqiao',
          },
        ],
      },
    ],
  },
  {
    value: 'shanghai',
    label: 'Shanghai',
    children: [
      {
        value: 'huangpu',
        label: 'Huangpu',
      },
    ],
  },
];
</script>

<style lang="less" scoped>
.test {
  overflow: hidden;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
