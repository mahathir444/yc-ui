<template>
  <Teleport to="body">
    <div v-if="loading" class="loading-wrapper">
      <div class="loading-mask"></div>
      <div class="loading-body">
        <div class="loading-icon">
          <svg-icon name="loading" size="72" />
        </div>
        <div class="loading-text">{{ text }}</div>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    loading: boolean;
    text: string;
  }>(),
  {
    loading: false,
    text: '',
  }
);
</script>

<style lang="less" scoped>
@keyframes spinner-b87k6z {
  to {
    transform: rotate(360deg);
  }
}
.loading-wrapper {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
  .loading-mask {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgba(246, 249, 255, 0.5);
  }
  .loading-body {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 200px;
    height: 200px;
    border-radius: 6px;
    background: #fff;
    box-shadow: 0px 2px 12px 0px rgba(0, 37, 89, 0.2);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 12px;
    .loading-icon {
      width: 72px;
      height: 72px;
      display: flex;
      justify-content: center;
      align-items: center;
      animation: spinner-b87k6z 1s infinite linear;
    }
    .loading-text {
      color: #131b26;
      text-align: justify;
      font-family: 'Microsoft YaHei';
      font-size: 14px;
      font-weight: 400;
    }
  }
}
</style>
