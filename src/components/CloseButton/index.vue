<template>
  <div class="yc-close-button">
    <svg-icon name="close" />
  </div>
</template>

<style lang="less" scoped>
.yc-close-button {
  cursor: pointer;
  position: relative;
  font-size: 12px;
  color: rgb(29, 33, 41);
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover::before {
    display: block;
  }
  &::before {
    content: '';
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    width: 20px;
    height: 20px;
    background-color: rgb(242, 243, 245);
    border-radius: 50%;
    display: none;
  }
  .svg-icon {
    position: relative;
    z-index: 10;
  }
}
</style>
