<template>
  <div
    role="progressbar"
    aria-valuemin="0"
    aria-valuemax="100"
    :aria-valuenow="percent"
    class="yc-progress-steps-wrapper"
  >
    <div class="yc-progress-steps" :style="{ height: `${strokeWidth}px` }">
      <div
        v-for="(active, index) of stepList"
        :key="index"
        :class="[
          'yc-progress-steps-item',
          {
            'yc-progress-steps-item-active': active,
          },
        ]"
        :style="{
          backgroundColor: active ? color : trackColor,
        }"
      />
    </div>
    <div v-if="showText" class="yc-progress-steps-text">
      <slot name="text" :percent="percent">
        {{ text }}
        <!-- <icon-exclamation-circle-fill v-if="status === 'danger'" /> -->
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, toRefs } from 'vue';
import { Size } from '@shared/type';
const props = defineProps<{
  steps: number;
  percent: number;
  size: Size;
  color: string | Record<string, string>;
  trackColor: string;
  strokeWidth: number;
  status: string;
  showText: boolean;
}>();
const { strokeWidth: _strokeWidth, size, steps, percent } = toRefs(props);
// strokes
const strokeWidth = computed(() => {
  if (_strokeWidth.value) return _strokeWidth.value;
  return size.value === 'small' ? 8 : 4;
});
// stepList
const stepList = computed(() => {
  return [...Array(steps.value)].map((_, i) => {
    {
      return percent.value > 0 && percent.value > (1 / steps.value) * i;
    }
  });
});
// text
const text = computed(() => `${(percent.value * 100).toFixed(0)}%`);
</script>
