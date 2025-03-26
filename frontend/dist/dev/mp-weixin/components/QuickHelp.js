"use strict";
const common_vendor = require("../common/vendor.js");
const common_assets = require("../common/assets.js");
const _sfc_main = {
  __name: "QuickHelp",
  setup(__props) {
    const steps = common_vendor.ref([
      "在心中默想一个问题",
      '点击"寻找答案"按钮',
      "长按图腾3秒钟",
      "系统将随机生成一个答案",
      '点击"再试一次"重新获取',
      '点击"分享"可以发送给好友'
    ]);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(steps.value, (step, index, i0) => {
          return {
            a: common_vendor.t(index + 1),
            b: common_vendor.t(step),
            c: index
          };
        }),
        b: common_assets._imports_0
      };
    };
  }
};
wx.createComponent(_sfc_main);
