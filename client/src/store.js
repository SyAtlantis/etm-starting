import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    page: 0,
    depend: {
      etmInfo: {
        status: "uninstalled",
        version: "",
      },
      nodeInfo: {
        status: "uninstalled",
        version: "",
      },
      pm2Info: {
        status: "uninstalled",
        version: "",
      },
    },
    control: {
      status: "stopped",
      start: false,
      pause: false,
      boot: false,
      minerInfo: {
        banlance: 0,
        reward: 0,
        productivity: 0
      }
    },
    setting: {
      publicIp: "",
      port: "4096",
      secret: "",
      peers: "",
      magic: ""
    },
    monitor: {
      netInfo: {
        status: "error",
        message: "无法获取到网络链接状态！刷新重试！",
        data: {}
      },
      gpuInfo: {
        status: "error",
        message: "无法获取到显卡状态！刷新重试！",
        data: []
      },
      procInfo: {
        status: "error",
        message: "无法获取到进程状态！刷新重试！",
        data: {}
      },
      syncInfo: {
        status: "loading",
        message: "无法获取到同步状态！刷新重试！",
        data: {}
      },
      blockInfo: {
        status: "normal",
        message: "无法获取到出块状态！刷新重试！",
        data: {}
      }
    },
  },
  mutations: {},
  actions: {}
});
