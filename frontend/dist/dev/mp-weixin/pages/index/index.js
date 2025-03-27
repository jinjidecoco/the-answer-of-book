"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Math) {
  (ThemeSwitcher + QuickHelp + FloatingWindow)();
}
const ThemeSwitcher = () => "../../components/ThemeSwitcher.js";
const FloatingWindow = () => "../../components/FloatingWindow.js";
const QuickHelp = () => "../../components/QuickHelp.js";
const pressTime = 3e3;
const _sfc_main = {
  __name: "index",
  setup(__props, { expose: __expose }) {
    const isBookOpen = common_vendor.ref(false);
    const isTotemVisible = common_vendor.ref(false);
    const isTotemActive = common_vendor.ref(false);
    const isHelpVisible = common_vendor.ref(false);
    const pageHint = common_vendor.ref('点击"寻找答案"开始');
    const dailyQuote = common_vendor.ref({
      content: "加载中...",
      author: ""
    });
    const isCountingDown = common_vendor.ref(false);
    const countdownValue = common_vendor.ref(3);
    const countdownProgress = common_vendor.ref(0);
    let pressTimer = null;
    let countdownTimer = null;
    const openBook = () => {
      isBookOpen.value = true;
    };
    const showTotem = () => {
      isTotemVisible.value = true;
      pageHint.value = "长按图腾3秒钟寻找答案";
    };
    const startTotemPress = () => {
      isCountingDown.value = true;
      countdownValue.value = 3;
      countdownProgress.value = 0;
      let startTime = Date.now();
      let elapsed = 0;
      countdownTimer = setInterval(() => {
        elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / pressTime, 1);
        countdownProgress.value = progress;
        const timeLeft = Math.ceil(3 - 3 * progress);
        if (timeLeft !== countdownValue.value) {
          countdownValue.value = timeLeft;
        }
        if (progress >= 1) {
          clearInterval(countdownTimer);
          activateTotem();
        }
      }, 50);
    };
    const endTotemPress = () => {
      if (countdownTimer) {
        clearInterval(countdownTimer);
        countdownTimer = null;
      }
      isCountingDown.value = false;
      countdownProgress.value = 0;
    };
    const activateTotem = () => {
      isTotemActive.value = true;
      isCountingDown.value = false;
      pageHint.value = "正在寻找你的答案...";
      setTimeout(() => {
        common_vendor.index.navigateTo({
          url: "/pages/answer/index"
        });
        setTimeout(() => {
          isTotemActive.value = false;
          isTotemVisible.value = false;
          pageHint.value = '点击"寻找答案"开始';
        }, 500);
      }, 500);
    };
    const handleTouchStart = () => {
      if (!isBookOpen.value) {
        pressTimer = setTimeout(() => {
          openBook();
        }, 500);
      }
    };
    const handleTouchEnd = () => {
      if (pressTimer) {
        clearTimeout(pressTimer);
        pressTimer = null;
      }
    };
    const navigateToDaily = () => {
      common_vendor.index.navigateTo({
        url: "/pages/daily/index"
      });
    };
    const showHelp = () => {
      isHelpVisible.value = true;
    };
    const fetchDailyQuote = () => {
      const quotes = [
        { content: "生活中最重要的不是你所处的位置，而是你所朝的方向。", author: "奥利弗·温德尔·霍姆斯" },
        { content: "不要等待机会，而要创造机会。", author: "林肯" },
        { content: "人生就像骑自行车，为了保持平衡，你必须保持运动。", author: "爱因斯坦" },
        { content: "世上只有一种英雄主义，就是在认清生活真相之后依然热爱生活。", author: "罗曼·罗兰" },
        { content: "如果你不给自己烦恼，别人也永远不可能给你烦恼。", author: "佚名" },
        { content: "不要为明天忧虑，因为明天自有明天的忧虑。", author: "马太福音" },
        { content: "生命就像一盒巧克力，你永远不知道下一块是什么。", author: "阿甘·艾克森" },
        { content: "生命中最宝贵的不是时间，而是生命本身。", author: "亚里士多德" },
        { content: "生命的意义在于体验，而不是等待结果。", author: "约翰·冯·诺依曼" },
        { content: "生命就像一把刀，用它来切割一切。", author: "Anonymous" },
        { content: "生命的意义在于享受，而不是等待。", author: "Anonymous" }
      ];
      const randomIndex = Math.floor(Math.random() * quotes.length);
      dailyQuote.value = quotes[randomIndex];
    };
    common_vendor.onMounted(() => {
      setTimeout(() => {
        openBook();
      }, 1e3);
      fetchDailyQuote();
    });
    common_vendor.onShow(() => {
      isTotemActive.value = false;
      isTotemVisible.value = false;
      pageHint.value = '点击"寻找答案"开始';
    });
    const onShareAppMessage = () => {
      return {
        title: "答案之书 - 揭示你的命运",
        path: "/pages/index/index"
      };
    };
    __expose({
      onShareAppMessage
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(pageHint.value),
        b: !isTotemVisible.value
      }, !isTotemVisible.value ? {
        c: common_vendor.o(showTotem)
      } : {}, {
        d: isTotemVisible.value
      }, isTotemVisible.value ? common_vendor.e({
        e: common_assets._imports_0,
        f: isCountingDown.value
      }, isCountingDown.value ? {
        g: common_vendor.t(countdownValue.value),
        h: `scale(${countdownProgress.value})`
      } : {}, {
        i: isTotemActive.value ? 1 : "",
        j: common_vendor.o(startTotemPress),
        k: common_vendor.o(endTotemPress),
        l: common_vendor.o(endTotemPress)
      }) : {}, {
        m: isBookOpen.value ? 1 : "",
        n: common_vendor.o(handleTouchStart),
        o: common_vendor.o(handleTouchEnd),
        p: common_vendor.t(dailyQuote.value.content),
        q: dailyQuote.value.author
      }, dailyQuote.value.author ? {
        r: common_vendor.t(dailyQuote.value.author)
      } : {}, {
        s: common_vendor.o(navigateToDaily),
        t: common_vendor.o(showHelp),
        v: common_vendor.o(($event) => isHelpVisible.value = $event),
        w: common_vendor.o(($event) => isHelpVisible.value = false),
        x: common_vendor.p({
          title: "使用帮助",
          visible: isHelpVisible.value
        })
      });
    };
  }
};
_sfc_main.__runtimeHooks = 2;
wx.createPage(_sfc_main);
