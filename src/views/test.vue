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

    <div style="width: 200px">
      <a-spin :loading="true" dot tip="aa">
        <YcTextarea :autoSize="{ minRows: 1, maxRows: 10 }" />
      </a-spin>
    </div>
    <!--  -->
    <a-tag loading bordered closable color="rgb(0, 180, 42)">
      <template #icon>
        <IconAlignCenter />
      </template>
      测试</a-tag
    >
    <!--  -->
    <YcTag loading bordered closable color="rgb(0, 180, 42)">
      <template #icon>
        <IconAlignCenter />
      </template>
      测试
    </YcTag>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, watchEffect } from 'vue';
import YcScrollbar from '@/components/Scrollbar';
import YcButton, { ButtonGroup as YcButtonGroup } from '@/components/Button';
import YcTextarea from '@/components/Textarea';
import YcTag from '@/components/Tag/index.vue';
const total = ref(1);
const handleSelect = (v: any) => {
  console.log(v);
};
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
  border-radius: 4px;
}
</style>
