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
        <yc-textarea :autoSize="{ minRows: 1, maxRows: 10 }" />
      </a-spin>
    </div>
    <!--  -->
    <a-tag
      :nowrap="false"
      loading
      bordered
      closable
      color="white"
      style="width: 200px"
    >
      <template #icon>
        <icon-align-center />
      </template>
      测试aaaaaaaa 测试aaaaaaaa 测试aaaaaaaa 测试aaaaaaaa 测试aaaaaaaa
      测试aaaaaaaa 测试aaaaaaaa 测试aaaaaaaa 测试aaaaaaaa 测试aaaaaaaa
    </a-tag>
    <!--  -->
    <yc-tag loading bordered closable color="white">
      <template #icon>
        <icon-align-center />
      </template>
      测试
    </yc-tag>

    <yc-trigger trigger="focus" preventFocus>
      <a-input style="width: 200px"></a-input>
      <template #content>
        <div class="popover-content">
          <a-empty></a-empty>
        </div>
      </template>
    </yc-trigger>

    <yc-textarea style="width: 200px" allow-clear></yc-textarea>
    <yc-input style="width: 200px" allow-clear></yc-input>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, watchEffect } from 'vue';
import YcTrigger from '@/components/Trigger';
import YcScrollbar from '@/components/Scrollbar';
import YcTag from '@/components/Tag/index.vue';
import Message from '@/components/Message';
import YcInput from '@/components/Input';
import YcTextarea from '@/components/Textarea';
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
