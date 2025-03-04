<!-- 测试lsh -->
<template>
  <div class="lsh-box">
    <a-button @click="hanClick"> 点击测试 </a-button>
    <!-- <div class="lsh-test-box"></div> -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, h } from 'vue';
import { Message } from '@arco-design/web-vue';
import YcMessage from '@/packages/Message/index.ts';
import { messageType } from '@/packages/Message/constants';
import SvgIcon from '@/packages/_components/SvgIcon/index.vue';
onMounted(() => {});
const hanClick = () => {
  messageType.forEach((item, index) => {
    const config = {
      duration: 1000 * (index + 1),
      content: '测试' + item,
      icon: () =>
        h(SvgIcon, {
          name: 'success',
        }),
      closable: true,
      showIcon: !false,
      onClose: (id: any) => {},
      resetOnHover: true,
    };
    const m = YcMessage[item](config);
    Message[item](config);
  });
};
</script>
<style scoped lang="less">
.lsh-box {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;

  // justify-content: center;
  .lsh-test-box {
    width: 100%;
    height: 500px;
    background-color: antiquewhite;
  }
}
</style>
