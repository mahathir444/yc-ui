<template>
  <div class="test">
    <div>
      <a-badge
        status="processing"
        :dot-style="{
          width: '10px',
          height: '10px',
        }"
      >
        <a-avatar> aa </a-avatar>
      </a-badge>
      <yc-badge
        status="processing"
        :dot-style="{
          width: '10px',
          height: '10px',
        }"
      >
        <a-avatar> aa </a-avatar>
      </yc-badge>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { Message } from '@arco-design/web-vue';
const colors = [
  'red',
  'orangered',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'arcoblue',
  'purple',
  'pinkpurple',
  'magenta',
  'gray',
];

const customColors = [
  '#F53F3F',
  '#7816FF',
  '#00B42A',
  '#165DFF',
  '#FF7D00',
  '#EB0AA4',
  '#7BC616',
  '#86909C',
  '#B71DE8',
  '#0FC6C2',
  '#FFB400',
  '#168CFF',
  '#FF5722',
];
</script>

<style lang="less" scoped>
.test {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  // align-items: center;
  // justify-content: center;
  gap: 10px;
}
</style>
