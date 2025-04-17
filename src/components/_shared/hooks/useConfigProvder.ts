import { ConfigProviderProps } from '@/components/ConfigProvider/type';
import { RequiredDeep } from '@shared/type';
import { toRefs, provide, inject, ref, Ref } from 'vue';
import { useControlValue } from './index';

export default (props: Record<string, any> = {}) => {
  const ProvideConfig = (props: ConfigProviderProps) => {
    const {
      zIndex,
      size,
      updateAtScroll,
      scrollToClose,
      exchangeTime,
      popupContainer,
    } = toRefs(props as RequiredDeep<ConfigProviderProps>);
    provide('global-props', {
      zIndex,
      size,
      updateAtScroll,
      scrollToClose,
      exchangeTime,
      popupContainer,
    });
  };

  const {
    zIndex = ref(undefined),
    size = ref(undefined),
    updateAtScroll = ref(undefined),
    scrollToClose = ref(undefined),
    exchangeTime = ref(undefined),
    popupContainer = ref(undefined),
  } = toRefs(props);
  const {
    zIndex: _zIndex,
    size: _size,
    updateAtScroll: _updateAtScroll,
    scrollToClose: _scrollToClose,
    exchangeTime: _exchangeTime,
    popupContainer: _popupContainer,
  } = inject('global-props', {
    zIndex: ref(1001),
    size: ref('medium'),
    updateAtScroll: ref(false),
    scrollToClose: ref(false),
    exchangeTime: ref(true),
    popupContainer: ref('body'),
  });
  return {
    ProvideConfig,
    zIndex: useControlValue(zIndex, _zIndex.value),
    size: useControlValue(size, _size.value),
    updateAtScroll: useControlValue(updateAtScroll, _updateAtScroll.value),
    scrollToClose: useControlValue(scrollToClose, _scrollToClose.value),
    exchangeTime: useControlValue(exchangeTime, _exchangeTime.value),
    popupContainer: useControlValue(popupContainer, _popupContainer.value),
  };
};
