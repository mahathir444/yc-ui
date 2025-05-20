import { App, h, render } from 'vue';
import { ModalConfig } from './type';
import _ModalService from './ModalService.vue';
import _Modal from './Modal.vue';

export type ModalInstance = InstanceType<typeof _Modal>;
export * from './type';
type ModalServiceData = { id: string; container: HTMLDivElement | null };
type ModalMethod = (props: ModalConfig) => { close: () => void };
type ModalMethods = {
  success: ModalMethod;
  error: ModalMethod;
  warning: ModalMethod;
  info: ModalMethod;
};

const Modal = Object.assign(_Modal, {
  modalConfig: {
    id: 'ycServiceModalContainer',
    container: null,
  },
  install: (app: App) => {
    app.component('Yc' + _Modal.name, _Modal);
  },
  open(props: ModalConfig) {
    const modalConfig = this.modalConfig as ModalServiceData;
    if (!modalConfig.container) {
      const container = document.createElement('div');
      container.id = this.modalConfig.id;
      modalConfig.container = container;
      document.body.append(container);
    }
    // 关闭函数
    const close = () => {
      render(null, modalConfig.container as HTMLDivElement);
    };
    const vnode = h(_ModalService, {
      ...props,
      serviceCloseFn: close,
    });
    // 渲染 VNode 到容器
    render(vnode, modalConfig.container);
    return {
      close,
    };
  },
  ...(Object.fromEntries(
    ['info', 'warning', 'error', 'success'].map((type) => {
      return [
        type,
        (props: ModalConfig) => {
          return Modal.open({
            ...props,
            type,
          });
        },
      ];
    })
  ) as ModalMethods),
});

declare module 'vue' {
  export interface GlobalComponents {
    YcModal: typeof Modal;
  }
}

export default Modal;
