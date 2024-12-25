<template>
  <Transition name="down">
    <div class="cx-message" :style="style[type]" v-show="visible">
      <!-- 上面绑定的是样式 -->
      <!-- 不同提示图标会变 -->
      <i class="iconfont" :class="[style[type].icon]"></i>
      <span class="text">{{ text }}</span>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted } from 'vue';

defineProps({
  type: {
    type: String,
    default: 'success',
  },
  text: {
    type: String,
    // default: '成功',
  },
});
const style = {
  warn: {
    icon: 'icon-warn',
    color: '#fff',
  },
  error: {
    icon: 'icon-error',
    color: '#fff',
  },
  success: {
    icon: 'icon-success',
    color: '#fff',
  },
  wait: {
    icon: 'icon-wait',
    color: '#fff',
  },
};
const visible = ref(false);
onMounted(() => {
  visible.value = true;
});
</script>

<style scoped lang="less">
.icon-error {
  width: 20px;
  height: 20px;
  background: url(./images/error.png) no-repeat;
  background-size: 20px 20px;
}

.icon-success {
  width: 20px;
  height: 20px;
  background: url(./images/success.png) no-repeat;
  background-size: 20px 20px;
}

.icon-warn {
  width: 20px;
  height: 20px;
  background: url(./images/warn.png) no-repeat;
  background-size: 20px 20px;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.icon-wait {
  width: 20px;
  height: 20px;
  background: url(./images/wait.png) no-repeat;
  background-size: 20px 20px;
  animation: rotate 3s linear infinite;
}

.cx-message {
  white-space: nowrap;
  height: 40px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding: 9px 16px;
  position: fixed;
  z-index: 9999;
  left: 50%;
  transform: translate(-50%);
  top: 100px;
  line-height: 30px;
  background: rgba(255, 255, 255, 1);
  border-radius: 8px;
  color: #fff;
  box-shadow: 0px 6px 24px 0px rgba(31, 35, 41, 0.1);
  border: 1px solid rgba(240, 240, 240, 1);

  .text {
    margin-left: 8px;
    font-family: PingFang SC;
    font-size: 16px;
    font-weight: 400;
    line-height: 22.4px;
    color: rgba(0, 0, 0, 0.8);
  }
}
</style>
