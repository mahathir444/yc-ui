<template>
  <div
    class="yc-icon-button"
    :style="{
      fontSize,
    }"
    @mousedown.prevent=""
    @click.stop=""
    @dblclick.stop=""
    @contextmenu.stop=""
  >
    <slot name="icon">
      <yc-icon :name="name" />
    </slot>
  </div>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    name?: string;
    fontSize?: string;
    hoverColor?: string;
    hoverSize?: string;
  }>(),
  {
    name: 'close',
    fontSize: '12px',
    hoverColor: 'rgb(242, 243, 245)',
    hoverSize: '20px',
  }
);
</script>

<style lang="less" scoped>
.yc-icon-button {
  user-select: none;
  cursor: pointer;
  position: relative;
  color: rgb(29, 33, 41);
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover::before {
    background-color: v-bind(hoverColor);
  }
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: v-bind(hoverSize);
    height: v-bind(hoverSize);
    border-radius: 50%;
    background: transparent;
    transition: background-color 0.1s cubic-bezier(0, 0, 1, 1);
  }
  .svg-icon {
    z-index: 10;
  }
}
</style>
