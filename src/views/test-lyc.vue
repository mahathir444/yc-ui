<template>
  <div class="test" id="test">
    <!-- <yc-popover
      :contentStyle="{
        width: '200px',
      }"
    >
      <yc-input />
      <template #content>
        <yc-empty />
      </template>
    </yc-popover> -->
    <a-form auto-label-width>
      <a-form-item label="Tag Number">
        <a-input-number
          v-model="number"
          :min="0"
          :max="20"
          style="width: 200px"
        />
      </a-form-item>
      <a-form-item label="List Width">
        <a-slider v-model="width" :min="0" :max="800" />
      </a-form-item>
    </a-form>
    <div :style="{ width: `${width}px`, marginTop: '20px' }">
      <a-overflow-list from="start">
        <div>DIV Element</div>
        <a-tag v-for="item of tags" :key="item">Tag{{ item }}</a-tag>
      </a-overflow-list>
    </div>
    <div :style="{ width: `${width}px`, marginTop: '20px' }">
      <yc-overflow-list from="start">
        <div>DIV Element</div>
        <yc-tag v-for="item of tags" :key="item">Tag{{ item }}</yc-tag>
      </yc-overflow-list>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
const size = ref(0.5);
const width = ref(500);
const number = ref(10);
const tags = computed(() =>
  Array.from({ length: number.value }, (_, idx) => idx + 1)
);
</script>

<style lang="less" scoped>
.test {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  gap: 10px;
  overflow: auto;
}

.trigger-demo-nest {
  padding: 10px;
  width: 200px;
  background-color: var(--color-bg-popup);
  border-radius: 4px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
}

.trigger-demo-nest-popup-content {
  text-align: right;
}
</style>
