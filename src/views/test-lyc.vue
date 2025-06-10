<template>
  <div class="test">
    <a-rate :color="color" />
  </div>
</template>

<script lang="ts" setup>
const color = {
  2: 'red',
  4: 'green',
  5: 'blue',
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
