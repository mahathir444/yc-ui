<template>
  <div
    :class="{
      'yc-collapse-item': true,
      'yc-collapse-item-disabled': disabled,
    }"
  >
    <div class="yc-collapse-item-header" @click="handleClick">
      <yc-icon-button
        v-if="showExpandIcon && expandIconPosition == 'left'"
        class="yc-collapse-item-header-icon"
      >
        <slot name="expand-icon">
          <icon-down v-if="computedActiveKey.includes(value)" />
          <icon-right v-else />
        </slot>
      </yc-icon-button>
      <div class="yc-collapse-item-header-title text-ellipsis">
        <slot name="header">
          {{ title }}
        </slot>
      </div>
      <div v-if="$slots.extra" class="yc-collapse-item-header-extra">
        <slot name="extra" />
      </div>
      <yc-icon-button
        v-if="showExpandIcon && expandIconPosition == 'right'"
        class="yc-collapse-item-header-icon"
      >
        <slot name="expand-icon">
          <icon-down v-if="computedActiveKey.includes(value)" />
          <icon-left v-else />
        </slot>
      </yc-icon-button>
    </div>
    <expand-transition>
      <div
        v-if="!destroyOnHide || computedActiveKey.includes(value)"
        v-show="computedActiveKey.includes(value)"
        class="yc-collapse-item-content"
      >
        <slot />
      </div>
    </expand-transition>
  </div>
</template>

<script lang="ts" setup>
import { ref, inject, toRefs } from 'vue';
import { COLLAPSE_PROVIDE_KEY } from '@shared/constants';
import { CollapseItemProps, CollapseProvide } from './type';
import { IconDown, IconRight, IconLeft } from '@shared/icons';
import { ExpandTransition } from '@shared/components';
import YcIconButton from '@shared/components/IconButton.vue';
defineOptions({
  name: 'CollapseItem',
});
const props = withDefaults(defineProps<CollapseItemProps>(), {
  value: '',
  title: '',
  disabled: false,
  showExpandIcon: true,
  destroyOnHide: false,
});
const {
  value,
  disabled,
  showExpandIcon: _showExpandIcon,
  destroyOnHide: _destroyOnHide,
} = toRefs(props);
// 接收注入属性
const {
  computedActiveKey,
  accordion,
  expandIconPosition,
  showExpandIcon,
  destroyOnHide,
} = inject<CollapseProvide>(COLLAPSE_PROVIDE_KEY, {
  computedActiveKey: ref([]),
  accordion: ref(false),
  expandIconPosition: ref('left'),
  showExpandIcon: _showExpandIcon,
  destroyOnHide: _destroyOnHide,
});
// 处理点击
const handleClick = () => {
  if (disabled.value) return;
  if (computedActiveKey.value.includes(value.value)) {
    computedActiveKey.value = computedActiveKey.value.filter(
      (item) => item != value.value
    );
  } else {
    if (accordion.value) {
      computedActiveKey.value = [value.value];
    } else {
      computedActiveKey.value.push(value.value);
    }
  }
};
</script>

<style lang="less" scoped>
@import './style/collapse-item.less';
</style>
