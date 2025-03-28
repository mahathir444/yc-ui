import { ref, provide, inject, watch, computed } from 'vue';
import { nanoid } from 'nanoid';
import { Fn } from '../type';
import { TRIGGER_PROVIDE_KEY } from '../constants';
import { ProvideType, TriggerType } from '@/components/Trigger/type';
export default (trigger: TriggerType, hideCallback?: Fn) => {
  // 组件标识，用于标识submenu是否处于一个嵌套中
  const groupId = nanoid(32);
  /**
   * @param level 记录组件内部嵌套的层级,当curHoverLevel小于level关闭
   * @param curHoverLevel 记录当前hover的层级
   * @param groupIds 同一个submenu里面的groupId集合
   */
  const {
    level: _level,
    curHoverLevel,
    groupIds,
    timeout,
  } = inject<ProvideType>(TRIGGER_PROVIDE_KEY, {
    level: -1,
    curHoverLevel: ref(0),
    groupIds: ref([]),
    timeout: ref<NodeJS.Timeout>(),
  });
  // 设置level
  const level = _level + 1;
  // 设置groupId
  groupIds.value[level] = groupId;
  // 是否嵌套
  const isNested = computed(() => groupIds.value.length > 1);
  //   判断是否在一个嵌套组内
  const isSameNestedGroup = (el: HTMLElement) => {
    const dataId = el.getAttribute('data-group-id') as string;
    const dataLevel = el.getAttribute('data-group-level') as string;
    if (dataId && groupIds.value.includes(groupId)) {
      return {
        isGroup: true,
        groupId: dataId,
        level: Number.parseInt(dataLevel),
      };
    } else if (el.tagName == 'BODY') {
      return {
        isGroup: false,
        groupId: '',
        level: -1,
      };
    } else {
      return isSameNestedGroup(el.parentElement as HTMLElement);
    }
  };
  // 处理hover关闭
  if (hideCallback) {
    // 检测层级的改变自动关闭
    watch(curHoverLevel, (v) => {
      if (level <= v || trigger != 'hover') {
        return;
      }
      hideCallback();
    });
  }
  // trigger提供的值
  provide<ProvideType>(TRIGGER_PROVIDE_KEY, {
    level,
    curHoverLevel,
    groupIds,
    timeout,
  });

  return {
    level,
    curHoverLevel,
    groupId,
    groupIds,
    timeout,
    isNested,
    isSameNestedGroup,
  };
};
