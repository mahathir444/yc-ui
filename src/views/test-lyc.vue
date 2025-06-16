<template>
  <div class="test">
    <a-timeline direction="horizontal" mode="top" reverse>
      <a-timeline-item label="2017-03-10">The first milestone</a-timeline-item>
      <a-timeline-item label="2018-05-12">The second milestone</a-timeline-item>
      <a-timeline-item label="2020-09-30">The third milestone</a-timeline-item>
    </a-timeline>
    <yc-timeline direction="horizontal" reverse>
      <yc-timeline-item label="2017-03-10">
        The first milestone
      </yc-timeline-item>
      <yc-timeline-item label="2018-05-12">
        The second milestone
      </yc-timeline-item>
      <yc-timeline-item label="2020-09-30">
        The third milestone
      </yc-timeline-item>
    </yc-timeline>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
</script>

<style lang="less" scoped>
.test {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  overflow: hidden;
}
</style>
