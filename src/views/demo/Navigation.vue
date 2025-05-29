<template>
  <div class="navigation">
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
        <dropdown-content
          v-for="(item, i) in dropdowns"
          :key="i"
          :item="<any>item"
        />
      </template>
    </yc-dropdown>
    <!-- menu -->
    <yc-menu show-collapse-button theme="dark" class="menu">
      <template v-for="v in menus" :key="v.path">
        <yc-menu-item v-if="v.type == 'item'" :path="v.path">
          {{ v.title }}
        </yc-menu-item>
        <yc-sub-menu v-else :path="v.path" :title="v.title">
          <template v-for="v1 in v.children" :key="v1.path">
            <yc-menu-item v-if="v1.type == 'item'" :path="v1.path">
              {{ v1.title }}
            </yc-menu-item>
            <yc-sub-menu v-else :path="v1.path" :title="v1.title">
              <yc-menu-item
                v-for="v2 in v1.children"
                :key="v2.path"
                :path="v2.path"
              >
                {{ v1.title }}
              </yc-menu-item>
            </yc-sub-menu>
          </template>
        </yc-sub-menu>
      </template>
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
    <!-- page -->
    <yc-pagination
      :total="200"
      show-total
      show-jumper
      show-page-size
      :bufferSize="3"
    />
    <!-- label-placement="vertical" -->
    <div style="width: 700px">
      <yc-steps changeable label-placement="vertical">
        <yc-step description="This is a description">Succeeded</yc-step>
        <yc-step description="This is a description">Processing</yc-step>
        <yc-step description="This is a description"> Pending </yc-step>
      </yc-steps>
    </div>
  </div>
</template>

<script lang="ts" setup>
import DropdownContent from './component/DropdownContent.vue';
import MenuContent from './component/MenuContent.vue';
import { nanoid } from 'nanoid';
// dropdowns
const dropdowns = generateDropdown();
// menus
const menus = generateMenus();
// 生成menus
function generateMenus() {
  const arr = [1, 2, 3, 4, 5];
  return arr.map((i) => {
    return i == 1
      ? {
          title: `菜单${i}`,
          path: nanoid(),
          type: 'submenu',
          children: arr.map((i1) => {
            return i1 == 1
              ? {
                  title: `菜单${i}-${i1}`,
                  path: nanoid(),
                  type: 'submenu',
                  children: arr.map((i2) => {
                    return {
                      title: `菜单${i}-${i1}-${i2}`,
                      path: nanoid(),
                      type: 'item',
                    };
                  }),
                }
              : {
                  title: `菜单${i}-${i1}`,
                  path: nanoid(),
                  type: 'item',
                };
          }),
        }
      : {
          title: `菜单${i}`,
          path: nanoid(),
          type: 'item',
        };
  });
}
function generateDropdown() {
  return [
    {
      type: 'submenu',
      label: '分组1',
      children: [
        {
          type: 'submenu',
          label: '分组2',
          children: [
            {
              type: 'submenu',
              label: '分组3',
              children: [
                {
                  type: 'submenu',
                  label: '分组4',
                  children: Array.from({ length: 6 }, (_, i) => ({
                    type: 'option',
                    value: i + 1,
                    label: `选项${i + 1}`,
                  })),
                },
                ...Array.from({ length: 6 }, (_, i) => ({
                  type: 'option',
                  value: i + 1,
                  label: `选项${i + 1}`,
                })),
              ],
            },
            ...Array.from({ length: 6 }, (_, i) => ({
              type: 'option',
              value: i + 1,
              label: `选项${i + 1}`,
            })),
          ],
        },
        ...Array.from({ length: 6 }, (_, i) => ({
          type: 'option',
          value: i + 1,
          label: `选项${i + 1}`,
        })),
      ],
    },
    ...Array.from({ length: 6 }, (_, i) => ({
      type: 'option',
      value: i + 1,
      label: `选项${i + 1}`,
    })),
  ];
}
</script>

<style lang="less" scoped>
.navigation {
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
  height: 800px;
}
</style>
