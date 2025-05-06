<template>
  <div class="test">
    <!-- divider -->
    <div>
      <p>
        A design is a plan or specification for the construction of an object.
      </p>
      <yc-divider orientation="left">Text</yc-divider>
      <p>
        A design is a plan or specification for the construction of an object.
      </p>
      <yc-divider orientation="center">Text</yc-divider>
      <p>
        A design is a plan or specification for the construction of an object.
      </p>
      <yc-divider orientation="right">Text</yc-divider>
      <yc-divider :margin="10"><icon-star /></yc-divider>
    </div>
    <!-- grid -->
    <div class="grid-demo-background">
      <yc-row class="grid-demo">
        <yc-col :span="24">
          <div>24 - 100%</div>
        </yc-col>
      </yc-row>
      <yc-row class="grid-demo">
        <yc-col :span="12">
          <div>12 - 50%</div>
        </yc-col>
        <yc-col :span="12">
          <div>12 - 50%</div>
        </yc-col>
      </yc-row>
      <yc-row class="grid-demo">
        <yc-col :span="8">
          <div>8 - 33.33%</div>
        </yc-col>
        <yc-col :span="8">
          <div>8 - 33.33%</div>
        </yc-col>
        <yc-col :span="8">
          <div>8 - 33.33%</div>
        </yc-col>
      </yc-row>
      <yc-row class="grid-demo">
        <yc-col :span="6">
          <div>6 - 25%</div>
        </yc-col>
        <yc-col :span="6">
          <div>6 - 25%</div>
        </yc-col>
        <yc-col :span="6">
          <div>6 - 25%</div>
        </yc-col>
        <yc-col :span="6">
          <div>6 - 25%</div>
        </yc-col>
      </yc-row>
      <yc-row class="grid-demo">
        <yc-col :span="4">
          <div>4 - 16.66%</div>
        </yc-col>
        <yc-col :span="4">
          <div>4 - 16.66%</div>
        </yc-col>
        <yc-col :span="4">
          <div>4 - 16.66%</div>
        </yc-col>
        <yc-col :span="4">
          <div>4 - 16.66%</div>
        </yc-col>
        <yc-col :span="4">
          <div>4 - 16.66%</div>
        </yc-col>
        <yc-col :span="4">
          <div>4 - 16.66%</div>
        </yc-col>
      </yc-row>
    </div>
    <!-- layout -->
    <div class="layout-demo" style="width: 100%">
      <yc-layout style="height: 400px">
        <yc-layout-header>Header</yc-layout-header>
        <yc-layout>
          <yc-layout-sider style="width: 64px">Sider</yc-layout-sider>
          <yc-layout-sider style="width: 206px; margin-left: 1px"
            >Sider</yc-layout-sider
          >
          <yc-layout-content>Content</yc-layout-content>
        </yc-layout>
        <yc-layout-footer>Footer</yc-layout-footer>
      </yc-layout>
    </div>
    <!-- space -->
    <yc-space>
      <template #split>
        <a-divider direction="vertical" />
      </template>
      <yc-tag v-if="false" color="arcoblue">Tag</yc-tag>
      <yc-button type="primary">Item1</yc-button>
      <yc-button type="primary">Item2</yc-button>
      <yc-switch defaultChecked />
    </yc-space>
  </div>
</template>

<style lang="less" scoped>
.test {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
.grid-demo-background {
  width: 100%;
  display: flex;
  flex-direction: column;
  background-image: linear-gradient(
    90deg,
    var(--color-fill-2) 4.16666667%,
    transparent 4.16666667%,
    transparent 8.33333333%,
    var(--color-fill-2) 8.33333333%,
    var(--color-fill-2) 12.5%,
    transparent 12.5%,
    transparent 16.66666667%,
    var(--color-fill-2) 16.66666667%,
    var(--color-fill-2) 20.83333333%,
    transparent 20.83333333%,
    transparent 25%,
    var(--color-fill-2) 25%,
    var(--color-fill-2) 29.16666667%,
    transparent 29.16666667%,
    transparent 33.33333333%,
    var(--color-fill-2) 33.33333333%,
    var(--color-fill-2) 37.5%,
    transparent 37.5%,
    transparent 41.66666667%,
    var(--color-fill-2) 41.66666667%,
    var(--color-fill-2) 45.83333333%,
    transparent 45.83333333%,
    transparent 50%,
    var(--color-fill-2) 50%,
    var(--color-fill-2) 54.16666667%,
    transparent 54.16666667%,
    transparent 58.33333333%,
    var(--color-fill-2) 58.33333333%,
    var(--color-fill-2) 62.5%,
    transparent 62.5%,
    transparent 66.66666667%,
    var(--color-fill-2) 66.66666667%,
    var(--color-fill-2) 70.83333333%,
    transparent 70.83333333%,
    transparent 75%,
    var(--color-fill-2) 75%,
    var(--color-fill-2) 79.16666667%,
    transparent 79.16666667%,
    transparent 83.33333333%,
    var(--color-fill-2) 83.33333333%,
    var(--color-fill-2) 87.5%,
    transparent 87.5%,
    transparent 91.66666667%,
    var(--color-fill-2) 91.66666667%,
    var(--color-fill-2) 95.83333333%,
    transparent 95.83333333%
  );
  .grid-demo {
    .yc-col {
      height: 48px;
      line-height: 48px;
      color: #fff;
      text-align: center;
      &:nth-child(2n) {
        background-color: rgba(22, 93, 255, 0.9);
      }
      &:nth-child(2n + 1) {
        background-color: var(--color-primary-light-4);
      }
    }
  }
}

.layout-demo :deep(.yc-layout-header),
.layout-demo :deep(.yc-layout-footer),
.layout-demo :deep(.yc-layout-sider-children),
.layout-demo :deep(.yc-layout-content) {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--color-white);
  font-size: 16px;
  font-stretch: condensed;
  text-align: center;
}

.layout-demo :deep(.yc-layout-header),
.layout-demo :deep(.yc-layout-footer) {
  height: 64px;
  background-color: var(--color-primary-light-4);
}

.layout-demo :deep(.yc-layout-sider) {
  width: 206px;
  background-color: var(--color-primary-light-3);
}

.layout-demo :deep(.yc-layout-content) {
  background-color: rgb(var(--arcoblue-6));
}
</style>
