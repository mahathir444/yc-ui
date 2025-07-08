<template>
  <div class="test">
    <a-timeline>
      <a-timeline-item>
        Code Review
        <template #label>
          <a-tag>
            <template #icon>
              <icon-check-circle-fill />
            </template>
            Passed
          </a-tag>
        </template>
      </a-timeline-item>
    </a-timeline>
    <yc-timeline>
      <yc-timeline-item>
        Code Review
        <template #label>
          <yc-tag>
            <template #icon>
              <icon-check-circle-fill />
            </template>
            Passed
          </yc-tag>
        </template>
      </yc-timeline-item>
    </yc-timeline>
  </div>
</template>

<script lang="ts" setup>
import { ref, nextTick } from 'vue';
const mode = ref('left');
const pos = ref('same');

const onLabelPositionChange = (_pos) => {
  pos.value = _pos;
};

const onModeChange = (_mode) => {
  mode.value = _mode;
};
</script>

<style lang="less" scoped>
.test {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
