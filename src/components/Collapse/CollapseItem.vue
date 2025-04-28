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
          <icon-right :rotate="computedActiveKey.includes(value) ? 90 : 0" />
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
          <icon-right :rotate="computedActiveKey.includes(value) ? -90 : 180" />
        </slot>
      </yc-icon-button>
    </div>
    <expand-transition
      v-if="!destroyOnHide || computedActiveKey.includes(value)"
      v-show="computedActiveKey.includes(value)"
    >
      <div class="yc-collapse-item-content">
        <slot />
      </div>
    </expand-transition>
  </div>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue';
import { CollapseItemProps } from './type';
import useProvide from './hooks/useProvide';
import { IconRight } from '@shared/icons';
import { YcIconButton, ExpandTransition } from '@shared/components';
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
const { value, disabled } = toRefs(props);
// 注入数据
const { inject } = useProvide();
const {
  computedActiveKey,
  accordion,
  expandIconPosition,
  showExpandIcon,
  destroyOnHide,
} = inject(props);
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
