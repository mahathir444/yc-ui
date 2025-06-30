<template>
  <li role="alert" :class="['yc-message', `yc-message-${type}`]">
    <span
      v-if="(type != 'normal' || isFunction(icon)) && showIcon"
      class="yc-message-icon"
    >
      <component :is="icon ?? map[type]" />
    </span>
    <span class="yc-message-content">
      {{ content }}
    </span>
    <span v-if="closable" class="yc-message-close-btn">
      <icon-button :size="12" />
    </span>
  </li>
</template>

<script lang="ts" setup>
import { ref, toRefs } from 'vue';
import { MessageProps } from './type';
import { isFunction } from '@shared/utils';
import {
  IconInfo,
  IconWarning,
  IconSuccess,
  IconError,
  IconLoading,
} from '@shared/icons';
import { IconButton } from '@shared/components';
defineOptions({
  name: 'Message',
});
const props = withDefaults(defineProps<MessageProps>(), {
  type: 'info',
  content: '',
  id: '',
  showIcon: (props) => {
    return props.type != 'normal';
  },
  closable: false,
  icon: undefined,
  duration: 1500,
  onClose: undefined,
  resetOnHover: false,
});
const { type } = toRefs(props);
const map: Record<string, any> = {
  info: IconInfo,
  warning: IconWarning,
  success: IconSuccess,
  error: IconError,
  loading: IconLoading,
};
</script>

<style lang="less" scoped>
.yc-message {
  pointer-events: auto;
  position: relative;
  overflow: hidden;
  padding: 10px 16px;
  background-color: #fff;
  border: 1px solid rgb(229, 230, 235);
  border-radius: 2px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.1s cubic-bezier(0, 0, 1, 1);
  color: rgb(29, 33, 41);
  line-height: 1;
  text-align: center;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  .yc-message-icon {
    vertical-align: middle;
    font-size: 20px;
    animation:
      arco-msg-fade 0.1s cubic-bezier(0, 0, 1, 1),
      arco-msg-fade 0.4s cubic-bezier(0.3, 1.3, 0.3, 1);
  }
  .yc-message-content {
    vertical-align: middle;
    font-size: 14px;
  }
}
@type: {
  info: rgb(22, 93, 255);
  warning: rgb(255, 125, 0);
  success: rgb(0, 180, 42);
  error: rgb(245, 63, 63);
  loading: rgb(22, 93, 255);
};

each(@type,{
  .yc-message-@{key}{
    & when not(@key = normal){
      background-color: #fff;
      border-color: rgb(229,230,235);
    }
    .yc-message-icon{
      color: @value;
    }
  };
});
</style>
