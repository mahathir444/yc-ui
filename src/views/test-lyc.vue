<template>
  <div class="test">
    <a-descriptions title="User Info" :column="4" bordered size="small">
      <a-descriptions-item
        v-for="item of data"
        :label="item.label"
        :span="item.span ?? 1"
      >
        <a-tag>{{ item.value }}</a-tag>
      </a-descriptions-item>
    </a-descriptions>
    <yc-descriptions title="User Info" :column="4" bordered>
      <yc-descriptions-item
        v-for="item of data"
        :label="item.label"
        :span="item.span ?? 1"
      >
        <yc-tag>{{ item.value }}</yc-tag>
      </yc-descriptions-item>
    </yc-descriptions>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
const data = [
  {
    label: 'Name',
    value: 'Socrates',
    span: 2,
  },
  {
    label: 'Mobile',
    value: '123-1234-1234',
  },
  {
    label: 'Residence',
    value: 'Beijing',
  },
  {
    label: 'Hometown',
    value: 'Beijing',
  },
  {
    label: 'Address',
    value: 'Yingdu Building, Zhichun Road, Beijing',
  },
];
</script>

<style lang="less" scoped>
.test {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
</style>
