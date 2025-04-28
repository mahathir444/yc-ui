import { ref, provide, inject, watch, computed, Ref } from 'vue';
import { nanoid } from 'nanoid';
import { TriggerType } from '../type';

export const TRIGGER_PROVIDE_KEY = 'trigger-props';

export type TriggerProvide = {
  level: number;
  curHoverLevel: Ref<number>;
  groupIds: Ref<string[]>;
  timeout: Ref<NodeJS.Timeout | undefined>;
  hoverTimer: Ref<NodeJS.Timeout | undefined>;
  hide?: () => void;
};

export default (trigger: TriggerType, hideCallback?: () => void) => {
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
    hoverTimer,
  } = inject<TriggerProvide>(TRIGGER_PROVIDE_KEY, {
    level: -1,
    curHoverLevel: ref(0),
    groupIds: ref([]),
    hoverTimer: ref<NodeJS.Timeout>(),
    timeout: ref<NodeJS.Timeout>(),
  });
  // 设置level
  const level = _level + 1;
  // 设置groupId
  groupIds.value[level] = groupId;
  // 是否嵌套
  const isNested = computed(() => groupIds.value.length > 1);
  // 设置hoverLevel
  const setHoverLevel = (delay: number) => {
    // 处理trigger嵌套,以及多重触发的问题
    if (hoverTimer.value) clearTimeout(hoverTimer.value);
    hoverTimer.value = setTimeout(() => {
      curHoverLevel.value = level;
    }, delay);
  };
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
  provide<TriggerProvide>(TRIGGER_PROVIDE_KEY, {
    level,
    curHoverLevel,
    groupIds,
    hoverTimer,
    timeout,
  });

  return {
    level,
    curHoverLevel,
    groupId,
    groupIds,
    timeout,
    hoverTimer,
    isNested,
    setHoverLevel,
    isSameNestedGroup,
  };
};
