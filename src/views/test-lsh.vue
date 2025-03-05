<!-- 测试lsh -->
<template>
  <div class="lsh-box">
    <a-button @click="hanClick"> 点击测试 </a-button>
    <!-- <div class="lsh-test-box"></div> -->
    1111
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, h } from 'vue';
import { Message, Notification } from '@arco-design/web-vue';
import YcMessage from '@/packages/Message/index.ts';
import { messageType } from '@/packages/Message/constants';
import YcNotifi from '@/packages/Notification/index.ts';
import SvgIcon from '@/packages/_components/SvgIcon/index.vue';
onMounted(() => {});
let total = 0;
const hanClick = () => {
  // messageType.forEach((item, index) => {
  //   const config = {
  //     duration: 1000 * (index + 1),
  //     content: '测试' + item,
  //     // icon: () => h(SvgIcon, {
  //     //   name: 'success'
  //     // }),
  //     closable: true,
  //     showIcon: !false,
  //     onClose: (id: any) => {
  //     },
  //     resetOnHover: true,
  //   }
  //   const m = YcMessage[item](config)
  //   Message[item](config)
  // })
  const pos = ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'];
  const arr = [pos[1]];
  const num = ++total;
  pos.forEach((item) => {
    const config = {
      // id:'111',
      title: 'Notification',
      content: 'This is a notification!->' + num,
      closable: true,
      style: { width: '500px' },
      class:{
        'lsh-test':true,
      },
      duration: 0,
      position: item,
      onClose: (id) => {
        console.log('close', id);
      },
      footer: () => 'this is footer',
      closeIcon:()=>"x"
    }
    // Notification.info('1111');
    // YcNotifi.info('测试');
    // Notification.info(config);
    const m = YcNotifi.info(config);
    // setTimeout(()=>{
    //   // Notification.clear();
    //   // YcNotifi.clear();
    //   m.close();
    // },5000)
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
