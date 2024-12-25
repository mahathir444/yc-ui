<template>
  <el-button
    v-bind="$attrs"
    @mousedown="(e) => e.preventDefault()"
    :class="['lsh-btn', type]"
  >
    <template v-if="showIcon" #icon>
      <slot name="icon" />
    </template>
    <slot></slot>
  </el-button>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    default: 'default',
  },
  showIcon: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="less" scoped>
.lsh-btn {
  border-radius: 4px;
  padding: 0 16px;
  &.default {
    border-color: rgba(140, 187, 255, 1);
    color: rgba(58, 139, 255, 1);

    &:not(:disabled):hover {
      background: rgba(234, 240, 255, 1);
    }

    &:not(:disabled):active {
      background: rgba(228, 236, 255, 1);
    }

    &:disabled {
      border: 1px solid rgba(140, 189, 255, 0.4);
      color: rgba(140, 189, 255, 0.4);
    }
  }
  &.primary {
    background-color: rgba(58, 139, 255, 1);
    color: #fff;

    &:not(:disabled):hover {
      background: rgba(89, 158, 255, 1);
    }

    &:not(:disabled):active {
      background: rgba(47, 112, 204, 1);
    }

    &:disabled {
      background: rgba(58, 139, 255, 0.4);
    }
  }
}
</style>
