<template>
  <div class="home">
    <div class="home-logo" src="../assets/miner.png"></div>
    <div class="home-view">
      <a-row>
        <a-col :span="8">
          <HeadInfo title="我的余额" content="56" :center="false" :bordered="true" />
        </a-col>
        <a-col :span="8">
          <HeadInfo title="出块收益" content="8/24" :center="false" :bordered="true" />
        </a-col>
        <a-col :span="8">
          <HeadInfo title="最后出块高度" content="2,223" :center="false" />
        </a-col>
      </a-row>
    </div>
    <div class="home-control">
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
    <div class="home-monitor">
      <a-row>
        <a-col :span="12" v-for="(item, index) in teams" :key="index">
          <a>
            <a-avatar size="small" :src="item.avatar" />
            <span class="member">{{ item.name }}</span>
          </a>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import HeadInfo from "../components/HeadInfo";

import { control } from "../interfaces";

export default {
  name: "home",
  components: { HeadInfo },
  data() {
    return {
      teams: []
    };
  },
  computed: {
    isInstallAll() {
      if (this.$store.state.depand.etmInfo.status != "installed") {
        return false;
      }
      if (this.$store.state.depand.nodeInfo.status != "installed") {
        return false;
      }
      if (this.$store.state.depand.pm2Info.status != "installed") {
        return false;
      }

      this.getStatus();
      this.isboot();

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
.home {
  width: 100%;
  height: 100%;

  .home-logo {
    height: 100px;
  }

  .home-view {
    padding: 24px;
  }

  .home-control {
    width: 100%;
    padding: 24px;

    .control-btns {
      width: 100%;
      // display: flex;
      // justify-content: center;
      // align-items: center;

      .btn {
        width: 25%;
        height: 100px;
        font-size: 20px;
      }
    }
  }
}
</style>
