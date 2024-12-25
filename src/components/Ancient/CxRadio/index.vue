<!--  -->
<template>
  <div :class="{ 'radio-box': true, 'disabled': disabled, 'active': active }" @click="hanClick">
    <div class="radio-icon">
    </div>
    <div class="radio-label">{{ label }}</div>
  </div>
</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue';
const props = withDefaults(defineProps<{
  label: string
  value: string
  disabled: boolean
  active: boolean
}>(), {
  disabled: false,
  active: false
})
const emits =defineEmits(['select'])
const hanClick = () =>{
  if(props.disabled)return
  emits('select')
}
</script>
<style scoped lang='less' >
.radio-box {
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 10px;
  user-select: none;

  &.disabled {
    cursor: not-allowed;

    .radio-label {
      color: rgba(172, 180, 191, 1);
    }

    .radio-icon {
      background-color: rgba(235, 238, 242, 1);
      border-color: rgba(225, 227, 229, 1);
    }
  }

  &.active {
    .radio-icon{
      background: url('./images/active.png') no-repeat;
      background-size: contain;
      border: none;
    }
  }

  .radio-icon {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: rgba(195, 204, 217, 1) 1px solid;
  }

  .radio-label {
    color: #131B26;
    font-family: "PingFang SC";
    font-size: 14px;
    font-weight: 400;
  }
}</style>