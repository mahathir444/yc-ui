<template>
  <div
    :class="{
      'yc-menu-inline': true,
      // 'yc-menu-selected': computedSelectedKeys.includes(path),
    }"
  >
    <div class="yc-menu-inline-header" @click="handleClick">
      <div v-if="$slots.icon" class="yc-menu-icon">
        <slot name="icon" />
      </div>
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
import { ref, inject, toRefs } from 'vue';
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
// 接收父级注入的属性
const { computedSelectedKeys, computedOpenKeys, emits } = inject('menu-props', {
  computedSelectedKeys: ref(''),
  computedOpenKeys: ref<string[]>([]),
  emits: (() => {}) as any,
});
// 子级的key
const childKeys = ref<string[]>([]);

const handleClick = () => {
  const index = computedOpenKeys.value.findIndex((item) => item == path.value);
  if (index == -1) {
    computedOpenKeys.value.push(path.value);
  } else {
    computedOpenKeys.value = computedOpenKeys.value.filter(
      (item) => item != path.value
    );
  }
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
    .yc-menu-icon {
      line-height: 1;
    }
    &:not(.yc-menu-disabled) {
      &:hover {
        background-color: rgb(242, 243, 245);
      }
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
