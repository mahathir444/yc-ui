<template>
  <div class="yc-dot-loading">
    <div v-for="i in 5" :key="i" class="yc-dot-loading-item"></div>
  </div>
</template>

<style lang="less" scoped>
@import '../style/spin.less';
</style>
