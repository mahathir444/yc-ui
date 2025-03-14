import "../../../node_modules/vue/dist/vue.runtime.esm-bundler.js";
import _Notification from "./index.vue.js";
import { getComponentPrefix } from "../_utils/global-config.js";
import _NotificationContainer from "./notificationList.vue.js";
import { notificationPosition, notificationType, config } from "./constants.js";
import { isString } from "../_utils/is.js";
import { ref, reactive } from "../../../node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js";
import { createVNode } from "../../../node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js";
import { render } from "../../../node_modules/@vue/runtime-dom/dist/runtime-dom.esm-bundler.js";
const notifManager = notificationPosition.reduce(
  (result, item) => {
    const list = ref([]);
    result[item] = {
      id: 0,
      list
    };
    return result;
  },
  {}
);
const onClose = async (id, pos) => {
  var _a;
  const targetItem = notifManager[pos].list.value.find(
    (item) => item.id === id
  );
  if (!targetItem)
    return;
  (_a = targetItem == null ? void 0 : targetItem.onClose) == null ? void 0 : _a.call(targetItem, id);
  const i = notifManager[pos].list.value.findIndex((item) => item.id === id);
  notifManager[pos].list.value.splice(i, 1);
};
const createDiv = (pos) => {
  const id = config.containerId + "_" + pos;
  if (!document.getElementById(id)) {
    const listContainer = document.createElement("div");
    listContainer.id = id;
    document.body.append(listContainer);
    const vnode = createVNode(_NotificationContainer, {
      notificationList: notifManager[pos].list.value,
      onClose,
      position: pos
    });
    render(vnode, listContainer);
  }
};
const add = (type, config2) => {
  const { position = "topRight" } = config2;
  createDiv(position);
  const target = notifManager[position];
  const nowId = (config2 == null ? void 0 : config2.id) ?? "__yc_notification_" + target.id++;
  const existingIndex = target.list.value.findIndex(
    (item) => item.id === nowId
  );
  if (existingIndex !== -1) {
    Object.assign(target.list.value[existingIndex], {
      ...config2,
      type,
      id: nowId,
      resetFlag: !target.list.value[existingIndex].resetFlag
    });
  } else {
    target.list.value.push(reactive({ ...config2, type, id: nowId }));
  }
  return {
    close: () => onClose(nowId, position)
  };
};
const notificationMethod = notificationType.reduce(
  (acc, type) => {
    acc[type] = (config2) => {
      const calcCofig = isString(config2) ? { content: config2 } : config2;
      return add(type, calcCofig);
    };
    return acc;
  },
  {}
);
const Message = Object.assign(_Notification, {
  install: (app) => {
    app.component(getComponentPrefix() + _Notification.name, _Notification);
  },
  clear: (pos) => {
    if (!pos) {
      notificationPosition.forEach((item) => {
        notifManager[item].list.value.splice(0);
      });
      return;
    }
    if (!notifManager[pos])
      return;
    notifManager[pos].list.value.splice(0);
  },
  ...notificationMethod
});
export {
  Message as default
};
