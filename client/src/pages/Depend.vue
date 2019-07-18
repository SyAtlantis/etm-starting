<template>
  <div class="depend">
    <a-form v-for="item in formList" :key="item.name">
      <a-form-item
        class="env-item"
        :key="item.name"
        :label="item.label"
        :labelCol="{span: 5}"
        :wrapperCol="{span: 16}"
        :required="item.required"
      >
        <div v-if="item.name ==='setting'">
          <div v-if="isSetted">
            <Tag3 type="setted" />
            <a-button class="btn" type="primary" @click="toSetting">修改设置</a-button>
          </div>
          <div v-else>
            <Tag3 type="unsetted" />
            <a-button class="btn" type="primary" @click="toSetting">进入设置</a-button>
          </div>
        </div>
        <div v-else-if="item.name ==='boot'" class="env-item-boot">
          <a-switch :checked="isBoot" @change="boot" />
        </div>
        <div v-else>
          <QueryInfo :func1="item.func1" :func2="item.func2" :name="item.name"></QueryInfo>
        </div>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import QueryInfo from "../components/QueryInfo";
import Tag3 from "../components/Tag3";

import { depend, control } from "../modules";

export default {
  name: "depend",
  components: { QueryInfo, Tag3 },
  data() {
    return {
      formList: [
        {
          name: "nodeInfo",
          label: "Nodejs",
          required: true,
          func1: depend.getNodeInfo,
          func2: depend.installNode
        },
        {
          name: "pm2Info",
          label: "PM2",
          required: true,
          func1: depend.getPm2Info,
          func2: depend.installPm2
        },
        {
          name: "etmInfo",
          label: "EnTanMo",
          required: true,
          func1: depend.getEtmInfo,
          func2: depend.installEtm
        },
        {
          name: "setting",
          label: "参数设置",
          required: false
        },
        {
          name: "boot",
          label: "开机启动",
          required: false
        }
      ]
    };
  },
  mounted() {
    this.checkBoot();
  },
  computed: {
    isSetted() {
      return this.$store.state.setting.port;
    },
    isBoot() {
      return this.$store.state.control.boot;
    }
  },
  methods: {
    toSetting() {
      this.$store.state.page = 2;
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
            console.log(`get isboot success=>${data.results}`);
            this.$store.state.control.boot = data.results;
          } else {
            // this.$message.warning(
            //   `get isboot failure=>${data.message}`
            // );
            console.log(`get isboot failure=>${data.message}`);
          }
        })
        .catch(err => {
          // this.$message.error(`get isboot error=>${err}`);
          console.log(`get isboot error=>${err}`);
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
              console.log(`set boot success=>${data.results}`);
              this.$store.state.control.boot = true;
            } else {
              // this.$message.warning(
              //   `set boot failure=>${data.message}`
              // );
              console.log(`set boot failure=>${data.message}`);
            }
          })
          .catch(err => {
            // this.$message.error(`set boot error=>${err}`);
            console.log(`set boot error=>${err}`);
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
              console.log(`set unboot success=>${data.results}`);
              this.$store.state.control.boot = false;
            } else {
              // this.$message.warning(
              //   `set unboot failure=>${data.message}`
              // );
              console.log(`set unboot failure=>${data.message}`);
            }
          })
          .catch(err => {
            // this.$message.error(`set unboot error=>${err}`);
            console.log(`set unboot error=>${err}`);
          });
      }
    }
  }
};
</script>

<style lang="less">
.depend {
  width: 100%;
  height: 100%;
  padding: 24px 40px;

  .env-item-boot {
    margin: 0 10px;
  }
}
</style>
