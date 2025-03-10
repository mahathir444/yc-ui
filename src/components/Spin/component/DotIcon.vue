<template>
  <div class="yc-dot-loading">
    <div class="yc-dot-loading-item"></div>
    <div class="yc-dot-loading-item"></div>
    <div class="yc-dot-loading-item"></div>
    <div class="yc-dot-loading-item"></div>
    <div class="yc-dot-loading-item"></div>
  </div>
</template>

<style lang="less" scoped>
.yc-dot-loading {
  position: relative;
  display: inline-block;
  width: 56px;
  height: 8px;
  transform-style: preserve-3d;
  perspective: 200px;
  .yc-dot-loading-item {
    position: absolute;
    top: 0;
    left: 50%;
    width: 8px;
    height: 8px;
    background-color: rgb(22, 93, 255);
    border-radius: 50%;
    transform: translate(-50%) scale(0);
    animation: dot-loading 2s cubic-bezier(0, 0, 1, 1) infinite forwards;
    &:nth-child(2) {
      background-color: rgb(64, 128, 255);
      animation-delay: 0.4s;
    }
    &:nth-child(3) {
      background-color: rgb(106, 161, 255);
      animation-delay: 0.8s;
    }
    &:nth-child(4) {
      background-color: rgb(106, 161, 255);
      animation-delay: 1.2s;
    }
    &:nth-child(5) {
      background-color: rgb(190, 218, 255);
      animation-delay: 1.6s;
    }
  }
}

/* prettier-ignore */
@keyframes dot-loading {
  each(range(36), {
    @percent: round(percentage(((@value - 1) / 36)), 3);
    // 半径
    @radius: 280%;
    @xOffset: round(sin((pi() / 180 * @value * 10)) * @radius, 3) * -1;
    @zOffset: round(cos((pi() / 180 * @value * 10)), 3) * -1px;
    @scaleOffset: round((1 - cos((pi() / 180) * @value * 10)) * 0.75 + 0.5, 3);
    @{percent} {
      transform: ~'translate3D(@{xOffset}, 0, @{zOffset}) scale(@{scaleOffset})'
    }
  });
}
</style>
