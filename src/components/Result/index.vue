<template>
  <div class="yc-result">
    <div v-if="$slots.icon || status" class="yc-result-icon">
      <div :class="['yc-result-icon-tip', `yc-result-icon-${status}`]">
        <slot name="icon">
          <component
            v-if="status"
            :is="RESULT_ICON_MAP[status]"
            :color="RESULT_ICON_COLOR_MAP[status]"
          />
        </slot>
      </div>
    </div>
    <div v-if="$slots.title || title" class="yc-result-title">
      <slot name="title">
        {{ title }}
      </slot>
    </div>
    <div v-if="$slots.subtitle || subtitle" class="yc-result-subtitle">
      <slot name="subtitle">
        {{ subtitle }}
      </slot>
    </div>
    <div v-if="$slots.extra" class="yc-result-extra">
      <slot name="extra" />
    </div>
    <div v-if="$slots.default" class="yc-result-content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ResultProps } from './type';
import { RESULT_ICON_COLOR_MAP, RESULT_ICON_MAP } from './constants';
defineOptions({
  name: 'Result',
});
withDefaults(defineProps<ResultProps>(), {
  status: 'info',
  title: '',
  subtitle: '',
});
</script>

<style lang="less" scoped>
@import './style/result.less';
</style>
