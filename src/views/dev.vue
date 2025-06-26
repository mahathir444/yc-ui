<template>
  <div class="test">
    <a-cascader
      :options="options"
      :style="{ width: '320px' }"
      placeholder="Please select ..."
      :load-more="loadMore"
    />
    <yc-cascader
      :options="options"
      :style="{ width: '320px' }"
      placeholder="Please select ..."
      :load-more="loadMore"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { IconLoading } from '@shared/icons';
const options = [
  {
    value: 'beijing',
    label: 'Beijing',
    children: [
      {
        value: 'chaoyang',
        label: 'ChaoYang',
      },
      {
        value: 'haidian',
        label: 'Haidian',
        isLeaf: true,
      },
      {
        value: 'dongcheng',
        label: 'Dongcheng',
        isLeaf: true,
      },
      {
        value: 'xicheng',
        label: 'Xicheng',
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
        isLeaf: true,
      },
    ],
  },
];
const loadMore = (option, done) => {
  window.setTimeout(() => {
    const nodes = [
      {
        value: `${option.value}-option1`,
        label: `${option.label}-Option1`,
      },
      {
        value: `${option.value}-option2`,
        label: `${option.label}-Option2`,
      },
    ];
    done(nodes);
  }, 1000);
};
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
