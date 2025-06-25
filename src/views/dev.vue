<template>
  <div class="test">
    <a-cascader multiple path-mode :options="options" />

    <yc-cascader v-model="value" :options="options" multiple allow-clear />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
const value = ref([]);
watch(
  () => value.value.length,
  () => {
    console.log(value.value);
  }
);
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
  {
    value: 'chongqing',
    label: 'chongqing',
  },
  {
    value: 'shichuan',
    label: 'shichuan',
  },
  {
    value: 'tianjing',
    label: 'tianjing',
  },
  {
    value: 'henan',
    label: 'henan',
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
  // justify-content: center;
  // align-items: center;
  gap: 10px;
}
</style>
