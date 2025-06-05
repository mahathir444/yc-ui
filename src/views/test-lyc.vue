<template>
  <div class="test">
    <a-result status="error" title="No internet ">
      <template #icon>
        <IconFaceFrownFill />
      </template>
      <template #subtitle> DNS_PROBE_FINISHED_NO_INTERNET </template>

      <template #extra>
        <a-button type="primary">Refresh</a-button>
      </template>
      <a-typography style="background: var(--color-fill-2); padding: 24px">
        <a-typography-paragraph>Try:</a-typography-paragraph>
        <ul>
          <li>Checking the network cables, modem, and router</li>
          <li>Reconnecting to Wi-Fi</li>
        </ul>
      </a-typography>
    </a-result>
    <yc-result status="error" title="No internet ">
      <template #icon>
        <IconFaceFrownFill />
      </template>
      <template #subtitle> DNS_PROBE_FINISHED_NO_INTERNET </template>

      <template #extra>
        <yc-button type="primary">Refresh</yc-button>
      </template>
      <yc-typography style="background: var(--color-fill-2); padding: 24px">
        <yc-typography-paragraph>Try:</yc-typography-paragraph>
        <ul>
          <li>Checking the network cables, modem, and router</li>
          <li>Reconnecting to Wi-Fi</li>
        </ul>
      </yc-typography>
    </yc-result>
  </div>
</template>

<script lang="ts" setup>
import { ref, h } from 'vue';
const percent = ref(0.2);
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
