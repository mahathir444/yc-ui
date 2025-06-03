<template>
  <div class="test">
    <a-row class="grid-demo">
      <a-col :xs="2" :sm="4" :md="6"> Col </a-col>
      <a-col :xs="20" :sm="16" :md="12"> Col </a-col>
      <a-col :xs="2" :sm="4" :md="6"> Col </a-col>
    </a-row>
    <yc-row class="grid-demo">
      <yc-col
        :span="{
          xs: 2,
          sm: 4,
          md: 6,
        }"
      >
        Col
      </yc-col>
      <yc-col
        :span="{
          xs: 20,
          sm: 16,
          md: 12,
        }"
      >
        Col
      </yc-col>
      <yc-col
        :span="{
          xs: 2,
          sm: 4,
          md: 6,
        }"
      >
        Col
      </yc-col>
    </yc-row>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
const value = ref('312321');
const str = ref('Click the icon to edit this text.');
</script>

<style lang="less" scoped>
.test {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  // align-items: center;
  // justify-content: center;
  gap: 10px;
}
.grid-demo {
  .arco-col,
  .yc-col {
    height: 48px;
    line-height: 48px;
    color: var(--color-white);
    text-align: center;
    &:nth-child(2n) {
      background-color: rgba(var(--arcoblue-6), 0.9);
    }
    &:nth-child(2n + 1) {
      background-color: var(--color-primary-light-4);
    }
  }
}
</style>
