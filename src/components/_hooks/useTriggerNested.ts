import { ref, provide, inject, watch } from 'vue';
import { nanoid } from 'nanoid';
import { Fn } from '../_type';
import { ProvideType, TriggerType } from '@/components/Trigger/type';
import { TRIGGER_PROVIDE_KEY } from '@/components/_constants';
export default (trigger: TriggerType, hideCallback?: Fn) => {
  // 组件标识，用于标识submenu是否处于一个嵌套中
  const groupId = nanoid(32);
  /**
   * @param level 记录组件内部嵌套的层级,当curLevel小于level关闭
   * @param curLevel 记录当前的层级
   * @param groupIds 同一个submenu里面的groupId集合
   */
  const {
    level: _level,
    curLevel,
    groupIds,
    timeout,
  } = inject<ProvideType>(TRIGGER_PROVIDE_KEY, {
    level: -1,
    curLevel: ref(0),
    groupIds: ref([]),
    timeout: ref<NodeJS.Timeout>(),
  });
  // 设置level
  const level = _level + 1;
  // 设置groupId
  groupIds.value[level] = groupId;
  //   判断是否在一个组内
  const isSameGroup = (el: HTMLElement): boolean => {
    const _groupId = el.getAttribute('data-group-id') as string;
    if (_groupId && groupIds.value.includes(_groupId)) {
      return true;
    } else if (el.tagName == 'BODY') {
      return false;
    } else {
      return isSameGroup(el.parentElement as HTMLElement);
    }
  };
  if (hideCallback) {
    // 检测层级的改变自动关闭
    watch(curLevel, (v) => {
      if (v >= level || trigger != 'hover') {
        return;
      }
      hideCallback();
    });
  }
  // trigger提供的值
  provide(TRIGGER_PROVIDE_KEY, {
    level,
    curLevel,
    groupIds,
    timeout,
  });

  return {
    level,
    curLevel,
    groupId,
    groupIds,
    timeout,
    isSameGroup,
  };
};
