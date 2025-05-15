<template>
  <yc-config-provider :z-index="3000">
    <template #empty="{ component }">
      <div v-if="component == 'Select'">暂无数据111</div>
    </template>
    <router-view />
  </yc-config-provider>
</template>

<style lang="less">
#app {
  height: 100vh;
  width: 100vw;
  overflow: auto;
}
</style>
