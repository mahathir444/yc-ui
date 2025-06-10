<template>
  <div class="test">
    <a-space size="large">
      <a-switch>
        <template #checked-icon>
          <icon-check />
        </template>
        <template #unchecked-icon>
          <icon-close />
        </template>
      </a-switch>
      <a-switch type="round">
        <template #checked-icon>
          <icon-check />
        </template>
        <template #unchecked-icon>
          <icon-close />
        </template>
      </a-switch>
      <a-switch type="line">
        <template #checked-icon>
          <icon-check />
        </template>
        <template #unchecked-icon>
          <icon-close />
        </template>
      </a-switch>
    </a-space>
    <yc-space size="large">
      <yc-switch>
        <template #checked-icon>
          <icon-check />
        </template>
        <template #unchecked-icon>
          <icon-close />
        </template>
      </yc-switch>
      <yc-switch type="round">
        <template #checked-icon>
          <icon-check />
        </template>
        <template #unchecked-icon>
          <icon-close />
        </template>
      </yc-switch>
      <yc-switch type="line">
        <template #checked-icon>
          <icon-check />
        </template>
        <template #unchecked-icon>
          <icon-close />
        </template>
      </yc-switch>
    </yc-space>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const handleChangeIntercept = async (newValue) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return true;
};

const handleChangeIntercept2 = async (newValue) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  if (!newValue) {
    Message.error("OH, You can't change");
    return false;
  }
  return true;
};

const handleChangeIntercept3 = async (newValue) => {
  await new Promise((_, reject) =>
    setTimeout(() => {
      Message.error('OH, Something went wrong');
      reject();
    }, 1000)
  );
  return true;
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
  overflow: hidden;
}
</style>
