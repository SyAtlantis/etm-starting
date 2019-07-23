<template>
  <div class="depend">
    <a-spin :spinning="spinning" tip="Loading...">
      <a-form>
        <a-form-item
          label="Root密码"
          :labelCol="{span: 5}"
          :wrapperCol="{span: 16}"
          :required="true"
          v-if="!isWin"
        >
          <span class="depend-item">
            <a-input class="input-pwd" placeholder="请输入root密码，并保存" v-model="password" />
            <a-button class="button-pwd" type="primary" @click="savePassword">保存</a-button>
          </span>
        </a-form-item>
        <a-form-item label="Nodejs" :labelCol="{span: 5}" :wrapperCol="{span: 16}" :required="true">
          <QueryInfo :func1="getNodeInfo" :func2="installNode" name="nodeInfo"></QueryInfo>
        </a-form-item>
        <a-form-item label="PM2" :labelCol="{span: 5}" :wrapperCol="{span: 16}" :required="true">
          <QueryInfo :func1="getPm2Info" :func2="installPm2" name="pm2Info"></QueryInfo>
        </a-form-item>
        <a-form-item
          label="EnTanMo"
          :labelCol="{span: 5}"
          :wrapperCol="{span: 16}"
          :required="true"
        >
          <QueryInfo :func1="getEtmInfo" :func2="installEtm" name="etmInfo"></QueryInfo>
        </a-form-item>
        <a-form-item label="参数设置" :labelCol="{span: 5}" :wrapperCol="{span: 16}">
          <div v-if="isSetted">
            <Tag3 type="setted" />
            <a-button class="btn" type="primary" @click="toSetting">修改设置</a-button>
          </div>
          <div v-else>
            <Tag3 type="unsetted" />
            <a-button class="btn" type="primary" @click="toSetting">进入设置</a-button>
          </div>
        </a-form-item>
        <a-form-item label="开机启动" :labelCol="{span: 5}" :wrapperCol="{span: 16}">
          <a-switch class="depend-item" :checked="isBoot" @change="boot" :disabled="!isInstallAll" />
        </a-form-item>
      </a-form>
    </a-spin>
  </div>
</template>

<script>
import QueryInfo from "../components/QueryInfo";
import Tag3 from "../components/Tag3";

import { depend, control, setting } from "../modules";

export default {
  name: "depend",
  components: { QueryInfo, Tag3 },
  data() {
    return {
      spinning: false,
      password: "",
      getNodeInfo: depend.getNodeInfo,
      installNode: depend.installNode,
      getPm2Info: depend.getPm2Info,
      installPm2: depend.installPm2,
      getEtmInfo: depend.getEtmInfo,
      installEtm: depend.installEtm
    };
  },
  mounted() {
    this.checkBoot();
    this.getPlatform();
  },
  computed: {
    isSetted() {
      return this.$store.state.setting.port;
    },
    isBoot() {
      return this.$store.state.control.boot;
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

      return true;
    },
    isWin() {
      return this.$store.state.depend.platform === "win32";
    }
  },
  methods: {
    toSetting() {
      this.$store.state.page = 2;
    },
    getPlatform() {
      depend
        .getPlatform()
        .then(res => {
          let { data, status } = res;
          if (!data || status !== 200) {
            throw new Error("Result data or status error!");
          }

          if (data.success) {
            console.log(
              `getPlatform success===>${JSON.stringify(data.results)}`
            );
            this.$store.state.depend.platform = data.results;
          } else {
            // this.$message.warning(
            //   `set unboot failure===>${JSON.stringify(data.message)}`
            // );
            console.log(
              `getPlatform failure===>${JSON.stringify(data.message)}`
            );
          }
        })
        .catch(err => {
          // this.$message.error(`set unboot error===>${JSON.stringify(err)}`);
          console.log(`getPlatform error===>${JSON.stringify(err)}`);
        });
    },
    checkBoot() {
      control
        .isboot()
        .then(res => {
          let { data, status } = res;
          if (!data || status !== 200) {
            throw new Error("Result data or status error!");
          }

          if (data.success) {
            console.log(
              `get isboot success===>${JSON.stringify(data.results)}`
            );
            this.$store.state.control.boot = data.results;
          } else {
            // this.$message.warning(
            //   `get isboot failure===>${JSON.stringify(data.message)}`
            // );
            console.log(
              `get isboot failure===>${JSON.stringify(data.message)}`
            );
          }
        })
        .catch(err => {
          // this.$message.error(`get isboot error===>${JSON.stringify(err)}`);
          console.log(`get isboot error===>${JSON.stringify(err)}`);
        });
    },
    boot(checked) {
      console.log(checked);
      if (checked) {
        control
          .boot()
          .then(res => {
            let { data, status } = res;
            if (!data || status !== 200) {
              throw new Error("Result data or status error!");
            }

            if (data.success) {
              console.log(
                `set boot success===>${JSON.stringify(data.results)}`
              );
              this.$store.state.control.boot = true;
            } else {
              // this.$message.warning(
              //   `set boot failure===>${JSON.stringify(data.message)}`
              // );
              console.log(
                `set boot failure===>${JSON.stringify(data.message)}`
              );
            }
          })
          .catch(err => {
            // this.$message.error(`set boot error===>${JSON.stringify(err)}`);
            console.log(`set boot error===>${JSON.stringify(err)}`);
          });
      } else {
        control
          .unboot()
          .then(res => {
            let { data, status } = res;
            if (!data || status !== 200) {
              throw new Error("Result data or status error!");
            }

            if (data.success) {
              console.log(
                `set unboot success===>${JSON.stringify(data.results)}`
              );
              this.$store.state.control.boot = false;
            } else {
              // this.$message.warning(
              //   `set unboot failure===>${JSON.stringify(data.message)}`
              // );
              console.log(
                `set unboot failure===>${JSON.stringify(data.message)}`
              );
            }
          })
          .catch(err => {
            // this.$message.error(`set unboot error===>${JSON.stringify(err)}`);
            console.log(`set unboot error===>${JSON.stringify(err)}`);
          });
      }
    },
    savePassword() {
      this.spinning = true;

      setting
        .setPassword({ password: this.password })
        .then(res => {
          let { data, status } = res;
          if (!data || status !== 200) {
            throw new Error("Result data or status error!");
          }

          if (data.success) {
            this.$store.state.setting.password = data.password;
          } else {
            console.log(
              `set unboot failure===>${JSON.stringify(data.message)}`
            );
          }
          this.spinning = false;
        })
        .catch(err => {
          console.log(`set unboot error===>${JSON.stringify(err)}`);
          this.spinning = false;
        });
    }
  }
};
</script>

<style lang="less">
.depend {
  width: 100%;
  height: 100%;
  padding: 24px 40px;

  .depend-item {
    margin: 0 10px;

    .input-pwd {
      width: calc(100% - 100px);
    }
    .button-pwd {
      width: 80px;
    }
  }
}
</style>
