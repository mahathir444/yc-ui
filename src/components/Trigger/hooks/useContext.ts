import { ref, provide, inject, watch, computed, Ref, onMounted } from 'vue';
import { nanoid } from 'nanoid';
import { TriggerType, TriggerProps as _TriggerProps } from '../type';
import { RequiredDeep } from '@shared/type';
import { unrefElement } from '@/components/_shared/utils';

export const TRIGGER_CONTEXT_KEY = 'trigger-context';

export type TriggerContext = {
  depth: number;
  curDepth: Ref<number>;
  groupIds: Ref<string[]>;
  timeout: Ref<NodeJS.Timeout | undefined>;
  hoverTimeout: Ref<NodeJS.Timeout | undefined>;
  hide?: () => void;
};

export type TriggerProps = RequiredDeep<_TriggerProps>;
/**
 *  depth 记录组件内部嵌套的层级,当curHoverLevel小于level关闭
 *  curDepth 记录当前hover的层级
 *  groupIds 同一个submenu里面的groupId集合
 *  groupId  组件标识，用于标识元素是否处于一个嵌套中
 */
export default (params: {
  trigger: TriggerType;
  popupRef: Ref<HTMLDivElement | undefined>;
  hideCallback?: () => void;
}) => {
  const { trigger, popupRef, hideCallback } = params;
  // 反向注入
  const {
    depth: _depth,
    curDepth,
    groupIds,
    timeout,
    hoverTimeout,
  } = inject<TriggerContext>(TRIGGER_CONTEXT_KEY, {
    depth: -1,
    curDepth: ref(0),
    groupIds: ref([]),
    timeout: ref<NodeJS.Timeout>(),
    hoverTimeout: ref<NodeJS.Timeout>(),
  });
  // 生成groupId
  const groupId = nanoid(32);
  // 设置level
  const depth = _depth + 1;
  // 设置groupId
  groupIds.value[depth] = groupId;
  // 是否嵌套
  const hasChildren = computed(() => groupIds.value.length > 1);
  // 设置hoverLevel
  const setDepth = (delay: number) => {
    // 处理trigger嵌套,以及多重触发的问题
    if (hoverTimeout.value) {
      clearTimeout(hoverTimeout.value);
    }
    hoverTimeout.value = setTimeout(() => {
      curDepth.value = depth;
    }, delay);
  };
  //   判断是否在一个嵌套组内
  const isSameGroup = (el: HTMLElement) => {
    const dataId = el.getAttribute('data-group-id') as string;
    const dataDepth = el.getAttribute('data-group-depth') as string;
    const isGroup = !!dataId && groupIds.value.includes(groupId);
    if (isGroup || el.tagName == 'BODY') {
      return {
        isGroup,
        groupId: dataId,
        depth: isGroup ? Number.parseInt(dataDepth) : -1,
      };
    } else {
      return isSameGroup(el.parentElement as HTMLElement);
    }
  };
  // 检测层级的改变自动关闭
  watch(curDepth, (v) => {
    if (depth <= v || trigger != 'hover') {
      return;
    }
    hideCallback?.();
  });
  // 检测popupRef设置depth和groupId
  watch(
    () => popupRef.value,
    () => {
      if (!popupRef.value) return;
      const popupDom = unrefElement(popupRef);
      if (!popupDom) return;
      popupDom.setAttribute('data-group-id', groupId);
      popupDom.setAttribute('data-group-depth', `${depth}`);
    },
    {
      immediate: true,
    }
  );
  provide<TriggerContext>(TRIGGER_CONTEXT_KEY, {
    depth,
    curDepth,
    groupIds,
    hoverTimeout,
    timeout,
  });
  return {
    depth,
    curDepth,
    timeout,
    hasChildren,
    setDepth,
    isSameGroup,
  };
};
