<template>
  <yc-config-provider :z-index="3000" size="large">
    <a-config-provider>
      <router-view />
      <template #empty="{ component }">
        <yc-empty v-if="component == 'select'" description="这是自定义Select" />
        <yc-empty
          v-else-if="component == 'list'"
          description="这是自定义List"
        />
      </template>
    </a-config-provider>
  </yc-config-provider>
</template>

<style lang="less">
#app {
  height: 100vh;
  width: 100vw;
  overflow: auto;
}
</style>
