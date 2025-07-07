<template>
  <div>
    <yc-button @click="Scan">扫描</yc-button>
    <div v-for="(item, index) in timgs" :key="index">
      <img :src="item.url" style="width: 500px" alt="" />
      <p>扫描结果: {{ item.result }}</p>
    </div>
    <canvas id="canvas" style="display: none"></canvas>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { BrowserMultiFormatReader } from '@zxing/library';
const timgs = ref<Record<string, any>[]>([]);
// 初始化读取器
const codeReader = new BrowserMultiFormatReader();

const identifyHandle = async (file: string) => {
  try {
    // 将文件转换为图像元素
    const img = await createImageFromFile(file);
    const result = await codeReader.decodeFromImage(img as HTMLImageElement);
    console.log('解码结果:', result.getText());
    return { url: file, result: result.getText() };
  } catch (error) {
    return null;
  }
};

const createImageFromFile = (file: string) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = file;
    img.onload = () => {
      const sourceWidth = img.width;
      const sourceHeight = img.height;
      // 计算裁剪区域
      // 如果图片高度小于300px，则填充空白（或拉伸，这里选择裁剪）
      const cropHeight = Math.min(sourceHeight, 320);
      // 创建Canvas
      const canvas = document.getElementById('canvas') as HTMLCanvasElement;
      canvas.width = sourceWidth;
      canvas.height = 300;
      const ctx = canvas.getContext('2d')!;
      // 绘制裁剪区域
      ctx.drawImage(
        img,
        1000,
        0, // 源图像裁剪起始坐标
        sourceWidth,
        cropHeight, // 源图像裁剪尺寸
        0,
        0, // 在画布上放置的坐标
        sourceWidth,
        300 // 在画布上的尺寸
      );
      // 如果源图像高度小于300px，填充剩余部分
      if (sourceHeight < 300) {
        ctx.fillStyle = '#ffffff'; // 白色背景填充
        ctx.fillRect(0, sourceHeight, sourceWidth, 300 - sourceHeight);
      }
      // 创建新的图片元素显示结果
      const processedImg = new Image();
      processedImg.src = canvas.toDataURL('image/jpeg', 0.95);
      resolve(processedImg);
    };

    img.onerror = reject;
    img.src = url;
  });
};

const Scan = () => {
  let strmsg = '连接Canon扫描仪网页服务程序失败!';
  const socket = new WebSocket('ws://127.0.0.1:18596/');
  try {
    socket.onclose = (_msg: Event) => {
      if (strmsg != '') {
        console.log(strmsg);
      }
    };
    socket.onopen = (_msg: Event) => {
      strmsg = '连接异常中断';
      let command = { command: 'scan', resolution: 200, duplex: 0 };
      socket.send(JSON.stringify(command));
    };
    socket.onmessage = (ev) => {
      if (typeof ev.data == 'string') {
        strmsg = '';
        alert(JSON.stringify(JSON.parse(ev.data)));
        console.log('finish');
      } else {
        console.log('result');
        let reader = new FileReader();
        reader.onload = async (e) => {
          if (!e.target) return;
          if (e.target!.readyState == FileReader.DONE) {
            // 调用识别方法
            const result = await identifyHandle(e.target.result as string);
            timgs.value.push(result!);
          }
        };
        reader.readAsDataURL(ev.data);
      }
    };
  } catch (ex) {
    console.log(ex);
  }
};
</script>
<style scoped lang="less"></style>
