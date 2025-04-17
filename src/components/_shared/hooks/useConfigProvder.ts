import { toRefs, inject, ref } from 'vue';
import { useControlValue } from './index';
import { CONFIG_PROVIDER_PROVIDE_KEY } from '../constants';
import { ConfigProviderProvide } from '@/components/ConfigProvider';

export default (props: Record<string, any> = {}) => {
  // 接收值
  const {
    zIndex: _zIndex,
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
  });
  // 接收属性
  const {
    zIndex = ref(),
    size = ref(),
    updateAtScroll = ref(),
    scrollToClose = ref(),
    exchangeTime = ref(),
    popupContainer = ref(),
  } = toRefs(props);
  return {
    zIndex: useControlValue(zIndex, _zIndex.value),
    size: useControlValue(size, _size.value),
    updateAtScroll: useControlValue(updateAtScroll, _updateAtScroll.value),
    scrollToClose: useControlValue(scrollToClose, _scrollToClose.value),
    exchangeTime: useControlValue(exchangeTime, _exchangeTime.value),
    popupContainer: useControlValue(popupContainer, _popupContainer.value),
  };
};
