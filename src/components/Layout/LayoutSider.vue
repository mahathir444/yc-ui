<template>
  <div
    class="yc-layout-sider"
    :class="{
      'yc-layout-sider-light': theme == 'light',
      'yc-layout-sider-dark': theme == 'dark',
    }"
    :style="{
      width: `${!computedCollapsed ? width : collapsedWidth}px`,
    }"
  >
    <slot v-if="!hideTrigger" name="trigger" :collapsed="computedCollapsed">
      <yc-icon-button
        :hover-size="24"
        class="yc-collapse-button"
        @click="handleCollapse"
      >
        <icon-arrow-right
          :rotate="computedCollapsed && !reverseArrow ? 0 : 180"
        />
      </yc-icon-button>
    </slot>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, inject, toRefs } from 'vue';
import { LayoutSiderProps } from './type';
import { useControlValue } from '@shared/hooks';
import { MediaQueryManager } from '@shared/utils';
import { RESPONSIVE_NUMBER_MAP } from '@shared/constants';
import { YcIconButton } from '@shared/components';
import { IconArrowRight } from '@shared/icons';
defineOptions({
  name: 'LayoutSider',
});
const props = withDefaults(defineProps<LayoutSiderProps>(), {
  theme: 'light',
  collapsed: undefined,
  defaultCollapsed: false,
  collapsible: false,
  width: 200,
  collapsedWidth: 48,
  reverseArrow: false,
  breakpoint: undefined,
  hideTrigger: false,
});
const emits = defineEmits<{
  (e: 'update:collapsed', collapsed: boolean): void;
  (
    e: 'collapse',
    collapsed: boolean,
    type: 'clickTrigger' | 'responsive'
  ): void;
  (e: 'breakpoint', collapsed: boolean): void;
}>();
const { collapsed, defaultCollapsed, collapsible, breakpoint } = toRefs(props);
// 当前的type
const curType = ref<'clickTrigger' | 'responsive'>('clickTrigger');
// 受控的收缩
const computedCollapsed = useControlValue<boolean>(
  collapsed,
  defaultCollapsed.value,
  (val) => {
    emits('update:collapsed', val);
    emits('collapse', val, curType.value);
  }
);
// 媒体查询器
const mqm = new MediaQueryManager();
// 注入数据
const { curLevel, hasSider } = inject('layout-props', {
  curLevel: ref(0),
  hasSider: ref(false),
});
// 处理点击收缩
const handleCollapse = () => {
  if (!collapsible.value) return;
  curType.value = 'clickTrigger';
  computedCollapsed.value = !computedCollapsed.value;
};

onMounted(() => {
  if (hasSider.value) return;
  hasSider.value = true;
  curLevel.value++;
  mqm.addHandler((name) => {
    if (!collapsible.value || !breakpoint.value) return;
    curType.value = 'responsive';
    computedCollapsed.value =
      RESPONSIVE_NUMBER_MAP[name] <= RESPONSIVE_NUMBER_MAP[breakpoint.value];
    emits('breakpoint', computedCollapsed.value);
  });
});
</script>

<style lang="less" scoped>
.yc-layout-sider {
  position: relative;
  transition: width 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
  .yc-collapse-button {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 17px;
    color: inherit;
  }
}
.yc-layout-sider-light {
  background: #fff;
  box-shadow: 0 2px 5px #00000014;
  color: rgb(29, 33, 41);
}
.yc-layout-sider-dark {
  background-color: #232324;
  color: #fff;
  .yc-collapse-button {
    &:hover::before {
      background-color: rgba(255, 255, 255, 0.2);
    }
  }
}
</style>
