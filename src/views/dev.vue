<template>
  <div class="test">
    <a-collapse :default-active-key="[1]" accordion>
      <a-collapse-item header="Beijing Toutiao Technology Co., Ltd." key="1">
        <div>Beijing Toutiao Technology Co., Ltd.</div>
      </a-collapse-item>
      <a-collapse-item header="Beijing Toutiao Technology Co., Ltd." key="2">
        <div>Beijing Toutiao Technology Co., Ltd.</div>
      </a-collapse-item>
      <a-collapse-item header="Beijing Toutiao Technology Co., Ltd." key="3">
        <div>Beijing Toutiao Technology Co., Ltd.</div>
      </a-collapse-item>
    </a-collapse>
    <yc-collapse :default-active-key="[1]" accordion>
      <yc-collapse-item header="Beijing Toutiao Technology Co., Ltd." path="1">
        <div>Beijing Toutiao Technology Co., Ltd.</div>
      </yc-collapse-item>
      <yc-collapse-item header="Beijing Toutiao Technology Co., Ltd." path="2">
        <div>Beijing Toutiao Technology Co., Ltd.</div>
      </yc-collapse-item>
      <yc-collapse-item header="Beijing Toutiao Technology Co., Ltd." path="3">
        <div>Beijing Toutiao Technology Co., Ltd.</div>
      </yc-collapse-item>
    </yc-collapse>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
.test {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.card-demo {
  width: 360px;
  margin-left: 24px;
  transition-property: all;
}
.card-demo:hover {
  transform: translateY(-4px);
}
</style>
