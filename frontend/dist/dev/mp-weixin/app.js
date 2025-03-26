"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/answer/index.js";
  "./pages/daily/index.js";
}
const _sfc_main = {
  __name: "App",
  setup(__props) {
    common_vendor.onLaunch(() => {
      console.log("App Launch");
      initTheme();
    });
    common_vendor.onShow(() => {
      console.log("App Show");
    });
    common_vendor.onHide(() => {
      console.log("App Hide");
    });
    const initTheme = () => {
      const savedTheme = common_vendor.index.getStorageSync("theme") || "default";
      common_vendor.index.setNavigationBarColor({
        frontColor: savedTheme === "dark" ? "#ffffff" : "#000000",
        backgroundColor: savedTheme === "dark" ? "#121212" : "#f8f9fa"
      });
      common_vendor.index.getSystemInfo({
        success: (res) => {
          const theme = res.theme || savedTheme;
          common_vendor.index.setStorageSync("theme", theme);
        }
      });
    };
    return () => {
    };
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  const pinia = common_vendor.createPinia();
  app.use(pinia);
  return { app };
}
createApp().app.mount("#app");
exports.createApp = createApp;
