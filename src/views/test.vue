<template>
  <div class="test">
    <div style="width: 300px">
      <yc-color-picker show-text />
      <color-picker
        show-text
        disabled
        :trigger-props="{
          popupVisible: true,
        }"
        :show-preset="true"
      />
    </div>
    <!-- <div style="width: 300px">
      <yc-input prefix-text="年纪" :max-length="100" show-word-limit />
      <a-button type="primary">测试</a-button>
    </div> -->
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { ColorPicker } from '@arco-design/web-vue';
import YcColorPicker from '@/components/ColorPicker/index.vue';

const value = ref('dsadsa');
const options = [
  'Bytedance',
  'Bytedesign',
  'Bytenumner',
  '1',
  '2',
  '3',
  '4',
].map((item) => {
  return {
    label: item,
    value: item,
  };
});
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
}
</style>
