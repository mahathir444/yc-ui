<template>
  <yc-config-provider :z-index="3000" size="large">
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
