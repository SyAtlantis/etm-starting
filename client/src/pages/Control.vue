<template>
  <div class="control">
    <div class="control-top">
      <div class="top-logo" v-if="isInstallAll">
        <img src="../assets/miner.png" />
      </div>
      <div class="top-depend" v-else>
        <div class="top-tip">项目运行所依赖的环境尚未配置完全，点击进入配置！</div>
        <a-button class="top-btn" type="primary" @click="toDepend">配置环境</a-button>
      </div>
    </div>
    <div class="control-view">
      <a-row>
        <a-col :span="8">
          <HeadInfo title="我的余额" :content="minerInfo.banlance" :center="false" :bordered="true" />
        </a-col>
        <a-col :span="8">
          <HeadInfo title="出块收益" :content="minerInfo.reward" :center="false" :bordered="true" />
        </a-col>
        <a-col :span="8">
          <HeadInfo title="最后出块高度" :content="minerInfo.height" :center="false" />
        </a-col>
      </a-row>
    </div>
    <div class="control-operate">
      <a-button-group class="control-btns">
        <a-button
          class="btn"
          icon="play-circle"
          type="primary"
          :disabled="!canStart"
          @click="start"
        >启动</a-button>
        <a-button
          class="btn"
          icon="pause-circle"
          type="primary"
          :disabled="!canPause"
          @click="pause"
        >暂停</a-button>
        <a-button class="btn" icon="stop" type="primary" :disabled="!canStop" @click="stop">停止</a-button>
        <a-button class="btn" icon="redo" type="primary" :disabled="!canRedo" @click="redo">重启</a-button>
      </a-button-group>
    </div>
    <div class="control-monitor">
      <a-row>
        <a-col class="monitor-col" :span="12" v-for="(item, index) in monitorItems" :key="index">
          <StatusIcon :type="item.status" />
          <a class="monitor-col-text">{{ item.title }}</a>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import HeadInfo from "../components/HeadInfo";
import StatusIcon from "../components/StatusIcon";

import { control } from "../modules";

export default {
  name: "control",
  components: { HeadInfo, StatusIcon },
  data() {
    return {};
  },
  computed: {
    minerInfo() {
      return this.$store.state.control.minerInfo;
    },
    monitorItems() {
      return [
        {
          title: "网络连接",
          name: "netInfo",
          status: this.$store.state.monitor.netInfo.status
        },
        {
          title: "显卡状态",
          name: "gpuInfo",
          status: this.$store.state.monitor.gpuInfo.status
        },
        {
          title: "进程状态",
          name: "procInfo",
          status: this.$store.state.monitor.procInfo.status
        },
        {
          title: "同步情况",
          name: "syncInfo",
          status: this.$store.state.monitor.syncInfo.status
        },
        {
          title: "出块情况",
          name: "blockInfo",
          status: this.$store.state.monitor.blockInfo.status
        }
      ];
    },
    isInstallAll() {
      if (this.$store.state.depend.etmInfo.status != "installed") {
        return false;
      }
      if (this.$store.state.depend.nodeInfo.status != "installed") {
        return false;
      }
      if (this.$store.state.depend.pm2Info.status != "installed") {
        return false;
      }

      // this.getStatus();
      // this.isboot();

      return true;
    },
    canStart() {
      if (!this.isInstallAll) {
        return false;
      }
      if (this.$store.state.control.start && !this.$store.state.control.pause) {
        return false;
      }
      return true;
    },
    canPause() {
      return (
        this.$store.state.control.start && !this.$store.state.control.pause
      );
    },
    canStop() {
      return this.$store.state.control.start;
    },
    canRedo() {
      return this.$store.state.control.start;
    }
  },
  methods: {
    toDepend() {
      this.$store.state.page = 1;
    },
    start() {
      control
        .start()
        .then(res => {
          let { data } = res;
          if (!data || res.status !== 200) {
            throw new Error("Result data or status error!");
          }

          if (data.success) {
            console.log(`start success=>${data.results}`);
            this.$store.state.control.start = true;
            this.$store.state.control.pause = false;
          } else {
            console.log(`start failure=>${data.message}`);
          }
        })
        .catch(err => {
          // this.$message.error(`start error=>${err}`);
          console.log(`start error=>${err}`);
        });
    },
    pause() {
      control
        .pause()
        .then(res => {
          let { data } = res;
          if (!data || res.status !== 200) {
            throw new Error("Result data or status error!");
          }

          if (data.success) {
            console.log(`pause success=>${data.results}`);
            this.$store.state.control.pause = true;
          } else {
            console.log(`pause failure=>${data.message}`);
          }
        })
        .catch(err => {
          // this.$message.error(`pause error=>${err}`);
          console.log(`pause error=>${err}`);
        });
    },
    stop() {
      control
        .stop()
        .then(res => {
          let { data } = res;
          if (!data || res.status !== 200) {
            throw new Error("Result data or status error!");
          }

          if (data.success) {
            console.log(`stop success=>${data.results}`);
            this.$store.state.control.start = false;
            this.$store.state.control.pause = false;
          } else {
            // this.$message.warning(
            //   `stop failure=>${data.message}`
            // );
            console.log(`stop failure=>${data.message}`);
          }
        })
        .catch(err => {
          // this.$message.error(`stop error=>${err}`);
          console.log(`stop error=>${err}`);
        });
    },
    redo() {
      control
        .redo()
        .then(res => {
          let { data } = res;
          if (!data || res.status !== 200) {
            throw new Error("Result data or status error!");
          }

          if (data.success) {
            console.log(`redo success=>${data.results}`);
            this.$store.state.control.start = true;
            this.$store.state.control.pause = false;
          } else {
            // this.$message.warning(
            //   `redo failure=>${data.message}`
            // );
            console.log(`redo failure=>${data.message}`);
          }
        })
        .catch(err => {
          // this.$message.error(`redo error=>${err}`);
          console.log(`redo error=>${err}`);
        });
    }
  }
};
</script>

<style lang="less">
.control {
  width: 100%;
  height: 100%;
  padding: 0 40px;

  .control-top {
    width: 100%;
    height: 150px;
    display: flex;
    justify-content: center;

    img {
      width: 150px;
      height: 130px;
    }

    .top-depend {
      display: flex;
      flex-direction: column;
      align-items: center;

      .top-tip {
        padding: 10px;
        font-size: 18px;
        color: red;
      }
      .top-btn {
        width: 150px;
        height: 60px;
      }
    }
  }

  .control-view {
    padding: 12px 0px;
  }

  .control-operate {
    width: 100%;
    padding: 12px 12px;

    .control-btns {
      width: 100%;
      display: flex;
      justify-content: center;

      .btn {
        width: 25%;
        height: 100px;
        font-size: 20px;
      }
    }
  }

  .control-monitor {
    padding: 12px 0px;

    .monitor-col {
      padding: 12px 24px;
      display: flex;
      justify-content: flex-start;
      align-items: center;

      .monitor-col-text {
        padding-left: 10px;
      }
    }
  }
}
</style>
