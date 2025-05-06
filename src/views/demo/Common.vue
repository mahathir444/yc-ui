<template>
  <div class="common">
    <yc-space>
      <yc-button type="primary">Primary</yc-button>
      <yc-button>Secondary</yc-button>
      <yc-button type="dashed">Dashed</yc-button>
      <yc-button type="outline">Outline</yc-button>
      <yc-button type="text">Text</yc-button>
    </yc-space>
    <yc-space>
      <yc-link loading>Link</yc-link>
      <yc-link>Link</yc-link>
      <yc-link>
        <template #icon>
          <icon-edit />
        </template>
        Link
      </yc-link>
    </yc-space>
  </div>
</template>

<style lang="less" scoped>
.common {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
</style>
