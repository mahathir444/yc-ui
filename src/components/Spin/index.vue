<template>
  <div
    class="yc-spin"
    :class="{
      'yc-spin': true,
      'yc-spin-loading': loading,
    }"
    :style="{
      fontSize: size + 'px',
    }"
  >
    <spin-icon
      v-if="!$slots.default"
      :hide-icon="hideIcon"
      :dot="dot"
      :tip="tip"
    >
      <template v-if="$slots.icon" #icon>
        <slot name="icon" />
      </template>
      <template v-if="$slots.tip" #tip>
        <slot name="tip" />
      </template>
    </spin-icon>
    <transition name="fade">
      <div v-if="$slots.default && loading" class="yc-spin-mask">
        <spin-icon :hide-icon="hideIcon" :dot="dot" :tip="tip">
          <template v-if="$slots.icon" #icon>
            <slot name="icon" />
          </template>
          <template v-if="$slots.tip" #tip>
            <slot name="tip" />
          </template>
        </spin-icon>
      </div>
    </transition>
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { SpinProps } from './type';
import SpinIcon from './component/SpinIcon.vue';
defineOptions({
  name: 'Spin',
});
withDefaults(defineProps<SpinProps>(), {
  size: 20,
  loading: false,
  dot: false,
  tip: '',
  hideIcon: false,
});
</script>

<style lang="less" scoped>
@import './style/spin.less';
</style>
