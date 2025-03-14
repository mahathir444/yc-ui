import "../../../node_modules/vue/dist/vue.runtime.esm-bundler.js";
import _Message from "./index.vue.js";
import { getComponentPrefix } from "../_utils/global-config.js";
import { messageType, config } from "./constants.js";
import _MessageContainer from "./container.vue.js";
import { render } from "../../../node_modules/@vue/runtime-dom/dist/runtime-dom.esm-bundler.js";
import { ref, reactive } from "../../../node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js";
import { createVNode } from "../../../node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js";
const messageList = ref([]);
let id = 0;
const onClose = async (id2) => {
  var _a;
  const targetItem = messageList.value.find((item) => item.id === id2);
  if (!targetItem)
    return;
  (_a = targetItem == null ? void 0 : targetItem.onClose) == null ? void 0 : _a.call(targetItem, id2);
  const i = messageList.value.findIndex((item) => item.id === id2);
  messageList.value.splice(i, 1);
};
const createDiv = () => {
  if (!document.getElementById(config.containerId)) {
    const messageContainer = document.createElement("div");
    messageContainer.id = config.containerId;
    document.body.append(messageContainer);
    const vnode = createVNode(_MessageContainer, {
      messageList: messageList.value,
      onClose
    });
    render(vnode, messageContainer);
  }
};
const openMessage = (type, config2) => {
  createDiv();
  const nowId = (config2 == null ? void 0 : config2.id) ?? "__yc_message_" + id++;
  const existingIndex = messageList.value.findIndex(
    (item) => item.id === nowId
  );
  if (existingIndex !== -1) {
    Object.assign(messageList.value[existingIndex], {
      ...config2,
      type,
      id: nowId,
      resetFlag: !messageList.value[existingIndex].resetFlag
    });
  } else {
    messageList.value.push(reactive({ ...config2, type, id: nowId }));
  }
  return {
    close: () => onClose(nowId)
  };
};
const messageMethod = messageType.reduce(
  (acc, type) => {
    acc[type] = (config2) => openMessage(type, config2);
    return acc;
  },
  {}
);
const Message = Object.assign(_Message, {
  install: (app) => {
    app.component(getComponentPrefix() + _Message.name, _Message);
  },
  clear: () => {
    messageList.value.splice(0);
  },
  ...messageMethod
});
export {
  Message as default
};
