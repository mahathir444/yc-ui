<template>
  <div class="test">
    <!-- breadcrumb -->
    <yc-breadcrumb>
      <yc-breadcrumb-item>breadcrumb</yc-breadcrumb-item>
      <yc-breadcrumb-item>
        <template #droplist>
          <yc-doption>Option 1</yc-doption>
          <yc-dsubmenu value="option-1">
            <template #default>Option 2</template>
            <template #content>
              <yc-doption>Option 2-1</yc-doption>
              <yc-doption>Option 2-2</yc-doption>
              <yc-doption>Option 2-3</yc-doption>
            </template>
            <template #footer>
              <div style="padding: 6px; text-align: center">
                <yc-button>Click</yc-button>
              </div>
            </template>
          </yc-dsubmenu>
          <yc-doption>Option 3</yc-doption>
        </template>
        Channel
      </yc-breadcrumb-item>
      <yc-breadcrumb-item>News</yc-breadcrumb-item>
    </yc-breadcrumb>
    <!-- dropdown -->
    <yc-dropdown @select="(v) => console.log('选中', v)">
      <yc-button>dropdown</yc-button>
      <template #content>
        <yc-dsubmenu>
          分组1
          <template #content>
            <yc-dsubmenu>
              分组2
              <template #content>
                <yc-dsubmenu>
                  分组3
                  <template #content>
                    <yc-dsubmenu>
                      分组4
                      <template #content>
                        <yc-doption v-for="i in 6" :key="i" :value="i">
                          选项{{ i }}
                        </yc-doption>
                      </template>
                    </yc-dsubmenu>
                    <yc-doption v-for="i in 6" :key="i" :value="i">
                      选项{{ i }}
                    </yc-doption>
                  </template>
                </yc-dsubmenu>
                <yc-doption v-for="i in 6" :key="i" :value="i">
                  选项{{ i }}
                </yc-doption>
              </template>
            </yc-dsubmenu>
            <yc-doption v-for="i in 6" :key="i" :value="i">
              选项{{ i }}
            </yc-doption>
          </template>
        </yc-dsubmenu>
        <yc-doption v-for="i in 6" :key="i" :value="i">
          选项{{ i }}
        </yc-doption>
      </template>
    </yc-dropdown>
    <!-- menu -->
    <yc-menu show-collapse-button theme="dark" class="menu">
      <yc-sub-menu title="层级1" path="321">
        <template #icon>
          <icon-dashboard />
        </template>
        <yc-sub-menu title="层级2" path="3221">
          <yc-menu-item
            v-for="item in menus"
            :key="item.path + '1'"
            :path="item.path + '1'"
          >
            {{ '层级3' + item.title }}
          </yc-menu-item>
        </yc-sub-menu>
        <yc-menu-item v-for="item in menus" :key="item.path" :path="item.path">
          {{ item.title }}
        </yc-menu-item>
      </yc-sub-menu>
    </yc-menu>
    <!-- page-header -->
    <yc-page-header
      :style="{ background: 'var(--color-bg-2)', width: '100%' }"
      title="ArcoDesign"
      subtitle="ArcoDesign Vue 2.0"
    >
      <template #extra>
        <yc-radio-group type="button" default-value="large">
          <yc-radio value="mini">Mini</yc-radio>
          <yc-radio value="small">Small</yc-radio>
          <yc-radio value="large">Large</yc-radio>
        </yc-radio-group>
      </template>
    </yc-page-header>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
const menus = Array(5)
  .fill(undefined)
  .map((_, i) => {
    return {
      title: `菜单${i + 1}`,
      path: `菜单 ${i + 1}`,
    };
  });
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
}
:deep(.menu) {
  width: 260px;
  height: 300px;
}
</style>
