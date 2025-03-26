"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  __name: "FloatingWindow",
  props: {
    title: {
      type: String,
      default: "提示"
    },
    visible: {
      type: Boolean,
      default: false
    },
    position: {
      type: Object,
      default: () => ({ top: "50%", left: "50%" })
    }
  },
  emits: ["update:visible", "close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const isVisible = common_vendor.computed({
      get: () => props.visible,
      set: (val) => emit("update:visible", val)
    });
    const positionStyle = common_vendor.computed(() => {
      return {
        top: props.position.top || "50%",
        left: props.position.left || "50%",
        transform: "translate(-50%, -50%)"
      };
    });
    const close = () => {
      isVisible.value = false;
      emit("close");
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(__props.title),
        b: common_vendor.o(close),
        c: isVisible.value ? 1 : "",
        d: common_vendor.s(positionStyle.value)
      };
    };
  }
};
wx.createComponent(_sfc_main);
