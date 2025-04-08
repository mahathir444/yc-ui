<template>
  <yc-prevent-focus
    :prevent-focus="preventFocus"
    :font-size="size"
    :class="{
      'yc-spin': true,
      'yc-spin-loading': loading,
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
  </yc-prevent-focus>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue';
import { SpinProps } from './type';
import SpinIcon from './component/SpinIcon.vue';
import YcPreventFocus from '@shared/components/PreventFocus';
defineOptions({
  name: 'Spin',
});
const props = withDefaults(defineProps<SpinProps>(), {
  size: 20,
  loading: false,
  dot: false,
  tip: '',
  hideIcon: false,
  color: 'rgb(22, 93, 255)',
  preventFocus: false,
});
const { color } = toRefs(props);
</script>

<style lang="less" scoped>
@import './style/spin.less';
.yc-spin {
  color: v-bind(color);

  .yc-spin-tip {
    color: v-bind(color);
  }
}
</style>
