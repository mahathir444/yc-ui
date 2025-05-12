<template>
  <yc-prevent-focus :prevent-focus="preventFocus" class="yc-spin">
    <!-- 定义通用模板 -->
    <define-template>
      <div
        v-if="!hideIcon"
        :class="{
          'yc-spin-icon': true,
          'yc-spin-icon-loading': !dot,
        }"
      >
        <slot name="icon">
          <template v-if="!dot">
            <component
              v-if="$slots.loading"
              :is="getSlotFunction(slots.loading)"
            />
            <icon-loading
              name="loading"
              :size="!isSizeInherit ? size : undefined"
            />
          </template>
          <div v-else class="yc-dot-loading">
            <div v-for="i in 5" :key="i" class="yc-dot-loading-item"></div>
          </div>
        </slot>
      </div>
      <div v-if="tip" class="yc-spin-tip">
        <slot name="tip">
          {{ tip }}
        </slot>
      </div>
    </define-template>
    <!-- 只有单独icon -->
    <reuse-template v-if="!$slots.default" />
    <!-- 有容器 -->
    <template v-else>
      <transition name="fade">
        <div v-if="loading" class="yc-spin-mask">
          <reuse-template />
        </div>
      </transition>
    </template>
    <slot />
  </yc-prevent-focus>
</template>

<script lang="ts" setup>
import { SpinProps, SpinSlots } from './type';
import { createReusableTemplate } from '@vueuse/core';
import { useConfigProvder } from '@shared/hooks';
import { getSlotFunction } from '@shared/utils';
import { YcPreventFocus } from '@shared/components';
defineOptions({
  name: 'Spin',
});
defineSlots<SpinSlots>();
withDefaults(defineProps<SpinProps>(), {
  size: 20,
  loading: false,
  dot: false,
  tip: '',
  hideIcon: false,
  preventFocus: false,
  isSizeInherit: false,
});
const { define: DefineTemplate, reuse: ReuseTemplate } =
  createReusableTemplate();
const { slots } = useConfigProvder();
</script>

<style lang="less" scoped>
@import './style/spin.less';
.a {
  color: inherit;
}
</style>
