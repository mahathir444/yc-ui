import { BORDER_MAP, BORDER_RADIUS_MAP, TRANSLATE_MAP } from "../Trigger/constants.js";
import "../../../node_modules/vue/dist/vue.runtime.esm-bundler.js";
import { ref } from "../../../node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js";
import { computed } from "../../../node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js";
const useTriggerPosition = (params) => {
  const {
    position,
    left,
    top,
    bottom,
    right,
    trigger,
    mouseX,
    mouseY,
    alignPoint,
    triggerHeight,
    triggerWidth,
    contentHeight,
    contentWidth,
    popupTranslate,
    popupOffset,
    autoFitPosition,
    emits
  } = params;
  const triggerPosition = ref(position.value);
  const wrapperPosition = computed(() => {
    const { offsetX, offsetY } = calcOffset();
    if (alignPoint.value && ["click", "contextMenu"].includes(trigger.value)) {
      return {
        top: `${mouseY.value + offsetY}px`,
        left: `${mouseX.value - contentWidth.value / 2 + offsetX}px`
      };
    }
    let offsetTop = 0;
    let offsetLeft = 0;
    if (["top", "tl", "tr", "bottom", "bl", "br"].includes(position.value)) {
      offsetTop = position.value.startsWith("t") ? top.value - contentHeight.value : bottom.value;
      if (["top", "bottom"].includes(position.value)) {
        offsetLeft = left.value + (triggerWidth.value - contentWidth.value) / 2;
      } else if (["tl", "bl"].includes(position.value)) {
        offsetLeft = left.value;
      } else {
        offsetLeft = right.value - contentWidth.value;
      }
    } else {
      offsetLeft = position.value.startsWith("l") ? left.value - contentWidth.value : right.value;
      if (["left", "right"].includes(position.value)) {
        offsetTop = top.value + (triggerHeight.value - contentHeight.value) / 2;
      } else if (["lt", "rt"].includes(position.value)) {
        offsetTop = top.value;
      } else {
        offsetTop = bottom.value - contentHeight.value;
      }
    }
    if (!autoFitPosition.value) {
      return {
        top: `${offsetTop + offsetY}px`,
        left: `${offsetLeft + offsetX}px`
      };
    }
    if (["top", "tl", "tr", "bottom", "bl", "br"].includes(position.value)) {
      if (offsetTop < 0 && ["top", "tl", "tr"].includes(position.value)) {
        offsetTop = bottom.value;
      } else if (offsetTop + contentHeight.value > window.innerHeight && ["bottom", "bl", "br"].includes(position.value)) {
        offsetTop = top.value - contentHeight.value;
      }
      if (offsetLeft < 0) {
        offsetLeft = left.value;
      } else if (offsetLeft + contentWidth.value > window.innerWidth) {
        offsetLeft = right.value - contentWidth.value;
      }
    } else {
      if (offsetLeft < 0 && ["left", "lt", "lb"].includes(position.value)) {
        offsetLeft = right.value;
      } else if (offsetLeft + contentWidth.value > window.innerWidth && ["right", "rt", "rb"].includes(position.value)) {
        offsetLeft = left.value - contentWidth.value;
      }
      if (offsetTop < 0) {
        offsetTop = top.value;
      } else if (offsetTop + contentHeight.value > window.innerHeight) {
        offsetTop = top.value - contentHeight.value;
      }
    }
    triggerPosition.value = calcCurrentPosition(
      offsetLeft,
      offsetTop
    );
    emits("position-change", triggerPosition.value);
    return {
      top: `${offsetTop + offsetY}px`,
      left: `${offsetLeft + offsetX}px`
    };
  });
  const arrowPostion = computed(() => {
    let inset;
    if (["top", "tl", "tr", "bottom", "bl", "br"].includes(triggerPosition.value)) {
      let arrowLeft = "";
      if (["top", "bottom"].includes(triggerPosition.value)) {
        arrowLeft = contentWidth.value / 2;
      } else {
        arrowLeft = triggerWidth.value / 2;
      }
      inset = {
        top: triggerPosition.value.startsWith("b") ? "0" : "",
        bottom: triggerPosition.value.startsWith("t") ? "0" : "",
        left: `${arrowLeft}px`
      };
    } else {
      let arrowTop = "";
      let arrowBottom = "";
      if (["left", "right"].includes(triggerPosition.value)) {
        arrowTop = contentHeight.value / 2;
      } else if (["lt", "rt"].includes(triggerPosition.value)) {
        arrowTop = triggerHeight.value / 2;
      } else {
        arrowBottom = triggerHeight.value / 2;
      }
      inset = {
        top: `${arrowTop}px`,
        right: triggerPosition.value.startsWith("l") ? "0" : "",
        bottom: `${arrowBottom}px`,
        left: triggerPosition.value.startsWith("r") ? "0" : ""
      };
    }
    return {
      ...inset,
      ...BORDER_MAP[triggerPosition.value],
      ...BORDER_RADIUS_MAP[triggerPosition.value],
      transform: `${TRANSLATE_MAP[triggerPosition.value]} rotate(45deg)`
    };
  });
  function calcOffset() {
    const [translateX, translateY] = popupTranslate.value;
    let offsetX = translateX;
    let offsetY = translateY;
    if (triggerPosition.value.startsWith("t")) {
      offsetY = -popupOffset.value;
    } else if (triggerPosition.value.startsWith("b")) {
      offsetY = popupOffset.value;
    } else if (triggerPosition.value.startsWith("l")) {
      offsetX = -popupOffset.value;
    } else if (triggerPosition.value.startsWith("r")) {
      offsetX = popupOffset.value;
    }
    return {
      offsetX,
      offsetY
    };
  }
  function calcCurrentPosition(offsetLeft, offsetTop) {
    const epsilon = 1e-5;
    const dirArray = [
      //上
      [
        top.value - contentHeight.value,
        left.value + (triggerWidth.value - contentWidth.value) / 2,
        "top"
      ],
      [top.value - contentHeight.value, left.value, "tl"],
      [top.value - contentHeight.value, right.value - contentWidth.value, "tr"],
      //下
      [
        bottom.value,
        left.value + (triggerWidth.value - contentWidth.value) / 2,
        "bottom"
      ],
      [bottom.value, left.value, "bl"],
      [bottom.value, right.value - contentWidth.value, "br"],
      //左
      [
        top.value + (triggerHeight.value - contentHeight.value) / 2,
        left.value - contentWidth.value,
        "left"
      ],
      [top.value, left.value - contentWidth.value, "lt"],
      [
        bottom.value - contentHeight.value,
        left.value - contentWidth.value,
        "lb"
      ],
      //右
      [
        top.value + (triggerHeight.value - contentHeight.value) / 2,
        right.value,
        "right"
      ],
      [top.value, right.value, "rt"],
      [bottom.value - contentHeight.value, right.value, "rb"]
    ];
    for (const [finalTop, finalLeft, dir] of dirArray) {
      if (Math.abs(finalTop - offsetTop) < epsilon && Math.abs(finalLeft - offsetLeft) < epsilon) {
        return dir;
      }
    }
    return position.value;
  }
  return {
    wrapperPosition,
    arrowPostion
  };
};
export {
  useTriggerPosition as default
};
