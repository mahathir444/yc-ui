<template>
  <div
    :class="{
      'yc-menu-inline': true,
      'yc-menu-selected': childKeys.includes(computedSelectedKeys),
    }"
  >
    <div class="yc-menu-inline-header" @click="handleClick">
      <div v-if="$slots.icon" class="yc-menu-icon">
        <slot name="icon" />
      </div>
      <span v-if="subMenuLevel" class="yc-menu-indent-list">
        <div
          v-for="i in subMenuLevel"
          :key="i"
          class="yc-menu-indent"
          :style="{
            width: levelIndent + 'px',
            height: levelIndent + 'px',
          }"
        ></div>
      </span>
      <div class="yc-menu-title">
        <slot name="title">
          {{ title }}
        </slot>
      </div>
      <div class="yc-menu-icon-suffix">
        <icon-arrow-down v-if="!computedOpenKeys.includes(path)" />
        <icon-arrow-up v-else />
      </div>
    </div>
    <transition name="submenu-expand" v-bind="transitions">
      <div
        v-show="computedOpenKeys.includes(path)"
        class="yc-menu-inline-content"
      >
        <slot />
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { ref, inject, provide, toRefs } from 'vue';
import { IconArrowDown, IconArrowUp } from '@shared/icons';
defineOptions({
  name: 'SubMenu',
});
const props = withDefaults(
  defineProps<{
    path?: string;
    title?: string;
    selectable?: boolean;
    popup?: boolean;
  }>(),
  {
    path: '',
    title: '',
  }
);
const { path } = toRefs(props);
// 接收
const { childKeys, level } = inject('sub-menu-props', {
  childKeys: ref<string[]>([]),
  level: ref<number>(1),
});
// 当前的level
const subMenuLevel = level.value - 1;
// 子级的level
const childLevel = level.value++;
// 继续注入
provide('sub-menu-props', {
  childKeys,
  level,
  childLevel,
});
// 接收父级注入的属性
const { computedSelectedKeys, computedOpenKeys, levelIndent, emits } = inject(
  'menu-props',
  {
    computedSelectedKeys: ref(''),
    computedOpenKeys: ref<string[]>([]),
    levelIndent: ref(20),
    emits: (() => {}) as any,
  }
);
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
// 过渡时间
const transitions: Record<string, any> = {
  onBeforeEnter(el: HTMLDivElement) {
    el.style.height = '0';
    el.style.opacity = '0';
  },
  onEnter(el: HTMLDivElement) {
    el.style.height = `${el.scrollHeight}px`;
    el.style.opacity = '1';
  },
  onAfterEnter(el: HTMLDivElement) {
    el.style.height = '';
  },
  onBeforeLeave(el: HTMLDivElement) {
    el.style.height = `${el.scrollHeight}px`;
    el.style.opacity = '1';
  },
  onLeave(el: HTMLDivElement) {
    el.style.height = '0';
    el.style.opacity = '0';
  },
  onAfterLeave(el: HTMLElement) {
    el.style.height = '';
  },
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
    .yc-menu-indent-list {
      display: flex;
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
