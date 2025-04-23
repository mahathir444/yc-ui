<template>
  <div
    :class="{
      'yc-menu-inline': true,
      'yc-menu-selected': childKeys.includes(computedSelectedKeys),
    }"
  >
    <div class="yc-menu-inline-header" @click="handleClick">
      <!-- 缩进 -->
      <div
        v-if="subMenuLevel"
        class="yc-menu-indent"
        :style="{
          width: `${levelIndent * subMenuLevel}px`,
          height: `${levelIndent}px`,
        }"
      ></div>
      <!-- icon -->
      <div v-if="$slots.icon" class="yc-menu-icon">
        <slot name="icon" />
      </div>
      <!-- title -->
      <transition name="fade">
        <div v-if="!computedCollapsed" class="yc-menu-title">
          <slot name="title">
            {{ title }}
          </slot>
        </div>
      </transition>
      <!-- 后缀 -->
      <div class="yc-menu-icon-suffix">
        <slot v-if="!computedOpenKeys.includes(path)" name="expand-icon-down">
          <icon-arrow-down />
        </slot>
        <slot v-else name="expand-icon-up">
          <icon-arrow-up />
        </slot>
      </div>
    </div>
    <!-- 过渡 -->
    <expand-transition :expand="computedOpenKeys.includes(path)">
      <template #default="{ expand }">
        <div v-show="expand" class="yc-menu-inline-content">
          <slot />
        </div>
      </template>
    </expand-transition>
  </div>
</template>

<script lang="ts" setup>
import { ref, inject, provide, toRefs } from 'vue';
import { SubMenuProps, MenuProvide, SubMenuProvide } from './type';
import { IconArrowDown, IconArrowUp } from '@shared/icons';
import { SUBMENU_PROVIDE_KEY, MENU_PROVIDE_KEY } from '@shared/constants';
import { ExpandTransition } from '@shared/components';
defineOptions({
  name: 'SubMenu',
});
const props = withDefaults(defineProps<SubMenuProps>(), {
  path: '',
  title: '',
  selectable: false,
  popup: false,
  popupMaxHeight: true,
});
const { path } = toRefs(props);
// 接收
const { childKeys, level } = inject<SubMenuProvide>(SUBMENU_PROVIDE_KEY, {
  childKeys: ref<string[]>([]),
  level: ref<number>(1),
  childLevel: 0,
});
// 当前的level
const subMenuLevel = level.value - 1;
// 子级的level
const childLevel = level.value++;
// 继续注入
provide<SubMenuProvide>(SUBMENU_PROVIDE_KEY, {
  childKeys,
  level,
  childLevel,
});
// 接收父级注入的属性
const {
  computedSelectedKeys,
  computedOpenKeys,
  computedCollapsed,
  levelIndent,
  emits,
} = inject<MenuProvide>(MENU_PROVIDE_KEY, {
  computedSelectedKeys: ref(''),
  computedOpenKeys: ref([]),
  levelIndent: ref(20),
  computedCollapsed: ref(false),
  emits: () => {},
});
// 处理子菜单点击
const handleClick = () => {
  const index = computedOpenKeys.value.findIndex((item) => item == path.value);
  if (index == -1) {
    computedOpenKeys.value.push(path.value);
  } else {
    computedOpenKeys.value = computedOpenKeys.value.filter(
      (item) => item != path.value
    );
  }
  emits('sub-menu-click', path.value, computedOpenKeys.value);
};
</script>

<style lang="less" scoped>
.yc-menu-inline {
  .yc-menu-inline-header {
    overflow: hidden;
    cursor: pointer;
    padding: 0 12px;
    margin-bottom: 4px;
    background-color: #fff;
    border-radius: 2px;
    line-height: 40px;
    color: rgb(78, 89, 105);
    font-size: 14px;
    transition: color 0.2s cubic-bezier(0, 0, 1, 1);
    display: flex;
    align-items: center;
    gap: 16px;
    &:not(.yc-menu-disabled) {
      &:hover {
        background-color: rgb(242, 243, 245);
      }
    }
    .yc-menu-icon {
      line-height: 1;
    }
    .yc-menu-indent {
      margin-right: -16px;
    }
    .yc-menu-title {
      flex: 1;
    }
  }
}
// 选中
.yc-menu-selected {
  .yc-menu-inline-header {
    font-weight: 500;
    background-color: rgb(242, 243, 245);
    color: rgb(22, 93, 255);
  }
}
</style>
