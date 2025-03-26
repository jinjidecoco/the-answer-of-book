"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  __name: "ThemeSwitcher",
  setup(__props) {
    const themes = [
      { name: "default", label: "默认", primaryColor: "#1a2a6c" },
      { name: "dark", label: "暗黑", primaryColor: "#121212" }
    ];
    const isPanelVisible = common_vendor.ref(false);
    const currentTheme = common_vendor.ref("default");
    const toggleThemePanel = () => {
      isPanelVisible.value = !isPanelVisible.value;
    };
    const selectTheme = (themeName) => {
      currentTheme.value = themeName;
      applyTheme(themeName);
      isPanelVisible.value = false;
      common_vendor.index.setStorageSync("theme", themeName);
    };
    const applyTheme = (themeName) => {
      const theme = themes.find((t) => t.name === themeName);
      if (!theme)
        return;
      common_vendor.index.setNavigationBarColor({
        frontColor: themeName === "dark" ? "#ffffff" : "#000000",
        backgroundColor: themeName === "dark" ? "#121212" : theme.primaryColor
      });
      common_vendor.index.getSystemInfo({
        success: (res) => {
          const systemTheme = res.theme || themeName;
          common_vendor.index.setStorageSync("theme", systemTheme);
        }
      });
    };
    common_vendor.onMounted(() => {
      const savedTheme = common_vendor.index.getStorageSync("theme");
      if (savedTheme) {
        currentTheme.value = savedTheme;
        applyTheme(savedTheme);
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.n(currentTheme.value),
        b: common_vendor.o(toggleThemePanel),
        c: isPanelVisible.value
      }, isPanelVisible.value ? {
        d: common_vendor.f(themes, (theme, k0, i0) => {
          return {
            a: theme.primaryColor,
            b: common_vendor.t(theme.label),
            c: theme.name,
            d: currentTheme.value === theme.name ? 1 : "",
            e: common_vendor.o(($event) => selectTheme(theme.name), theme.name)
          };
        })
      } : {});
    };
  }
};
wx.createComponent(_sfc_main);
