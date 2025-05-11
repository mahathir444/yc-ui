import { toRefs, inject, ref, isReactive, reactive, Ref, useSlots } from 'vue';
import { ConfigProviderSlots } from '@/components/ConfigProvider';
import { PopupContainer, Props, Size } from '@shared/type';
import { isUndefined } from '../utils';

export const CONFIG_PROVIDER_PROVIDE_KEY = 'config-props';

export interface ConfigProviderProvide {
  zIndex: Ref<number>;
  size: Ref<Size>;
  popupContainer: Ref<PopupContainer>;
  updateAtScroll: Ref<boolean>;
  scrollToClose: Ref<boolean>;
  exchangeTime: Ref<boolean>;
  slots: Partial<ConfigProviderSlots>;
}

const getVar = (value: Ref<any>, _value: Ref<any>) => {
  return isUndefined(value?.value) ? _value : value;
};

export default (props: Props = {}) => {
  // 接收值
  const {
    zIndex,
    size: _size,
    updateAtScroll: _updateAtScroll,
    scrollToClose: _scrollToClose,
    exchangeTime: _exchangeTime,
    popupContainer: _popupContainer,
  } = inject<ConfigProviderProvide>(CONFIG_PROVIDER_PROVIDE_KEY, {
    zIndex: ref(1001),
    size: ref('medium'),
    updateAtScroll: ref(false),
    scrollToClose: ref(false),
    exchangeTime: ref(true),
    popupContainer: ref('body'),
    slots: {},
  });
  const slots = useSlots();
  // 接收属性
  const { size, updateAtScroll, scrollToClose, exchangeTime, popupContainer } =
    toRefs(isReactive(props) ? props : reactive(props));
  return {
    slots,
    zIndex,
    size: getVar(size, _size),
    updateAtScroll: getVar(updateAtScroll, _updateAtScroll),
    scrollToClose: getVar(scrollToClose, _scrollToClose),
    popupContainer: getVar(popupContainer, _popupContainer),
    exchangeTime: getVar(exchangeTime, _exchangeTime),
  };
};
